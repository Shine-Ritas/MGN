import { useCallback, useRef, useState } from "react";

type UseMagnifierOptions = {
  lensDiameter?: number;
  lensZoom?: number;
  longPressDelayMs?: number;
  offsetY?: number; // pixels to lift lens above finger
  stickToInitialImage?: boolean; // do not retarget image during drag
};

type Handlers = {
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: (e: React.PointerEvent<HTMLDivElement>) => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchCancel: (e: React.TouchEvent<HTMLDivElement>) => void;
  // Image-level starters
  onPointerDownImage: (e: React.PointerEvent<HTMLImageElement>) => void;
  onTouchStartImage: (e: React.TouchEvent<HTMLImageElement>) => void;
};

export function useMagnifier({
  lensDiameter: initialLensDiameter = 140,
  lensZoom: initialLensZoom = 2.2,
  longPressDelayMs = 220,
  offsetY = 32,
  stickToInitialImage = true,
}: UseMagnifierOptions = {}) {
  const lensDiameter = initialLensDiameter;
  const lensZoom = initialLensZoom;
  const lensOffsetY = offsetY;

  const [lensVisible, setLensVisible] = useState(false);
  const [lensBackground, setLensBackground] = useState<{
    image: string;
    size: { w: number; h: number };
    position: { x: number; y: number };
  } | null>(null);
  const [lensPosition, setLensPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const longPressTimerRef = useRef<number | null>(null);
  const rafPendingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lensElRef = useRef<HTMLDivElement | null>(null);
  const isActiveRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const targetImgRef = useRef<HTMLImageElement | null>(null);
  const targetRectRef = useRef<DOMRect | null>(null);
  const pressOriginRef = useRef<{ x: number; y: number } | null>(null);
  const activeTouchIdRef = useRef<number | null>(null);
  const touchMoveBlockerAttachedRef = useRef(false);
  const docTouchHandlersAttachedRef = useRef(false);
  const docPointerHandlersAttachedRef = useRef(false);

  const touchMoveBlocker = useCallback((ev: TouchEvent) => {
    if (isActiveRef.current) {
      ev.preventDefault();
    }
  }, []);

  const attachGlobalTouchMoveBlocker = useCallback(() => {
    if (touchMoveBlockerAttachedRef.current) return;
    window.addEventListener("touchmove", touchMoveBlocker, { passive: false });
    touchMoveBlockerAttachedRef.current = true;
  }, [touchMoveBlocker]);

  const detachGlobalTouchMoveBlocker = useCallback(() => {
    if (!touchMoveBlockerAttachedRef.current) return;
    window.removeEventListener("touchmove", touchMoveBlocker as EventListener);
    touchMoveBlockerAttachedRef.current = false;
  }, [touchMoveBlocker]);

  // Document-level handlers to ensure we keep receiving events during long drags

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  // endMagnifier is declared later after document handler attach/detach are defined

  const updateLensForPoint = useCallback((clientX: number, clientY: number) => {
    lastPointRef.current = { x: clientX, y: clientY };
    if (rafPendingRef.current) return;
    rafPendingRef.current = true;

    window.requestAnimationFrame(() => {
      rafPendingRef.current = false;
      const pt = lastPointRef.current;
      if (!pt) return;
      let targetImg = targetImgRef.current;
      let rect = targetRectRef.current;

      // If we have a target image, refresh its rect to ensure it's up to date
      if (targetImg && stickToInitialImage) {
        const freshRect = targetImg.getBoundingClientRect();
        if (freshRect.width && freshRect.height) {
          rect = freshRect;
          targetRectRef.current = freshRect;
        }
      }

      // If we don't have a target, try to find one under the point
      const isInsideCurrentRect = rect
        ? pt.x >= rect.left && pt.x <= rect.right && pt.y >= rect.top && pt.y <= rect.bottom
        : false;
      if (!targetImg || !rect || (!isInsideCurrentRect && !stickToInitialImage)) {
        const elementAtPoint = document.elementFromPoint(pt.x, pt.y) as HTMLElement | null;
        const foundImg = elementAtPoint?.closest("img.content-image") as HTMLImageElement | null;
        if (foundImg) {
          const foundRect = foundImg.getBoundingClientRect();
          if (foundRect.width !== 0 && foundRect.height !== 0) {
            targetImgRef.current = foundImg;
            targetRectRef.current = foundRect;
            targetImg = foundImg;
            rect = foundRect;
            const natWInit = foundImg.naturalWidth || foundRect.width;
            const natHInit = foundImg.naturalHeight || foundRect.height;
            const bgSizeWInit = natWInit * lensZoom;
            const bgSizeHInit = natHInit * lensZoom;
            setLensBackground(prev => {
              const imgSrc = foundImg.currentSrc || foundImg.src;
              if (!prev || prev.image !== imgSrc || prev.size.w !== bgSizeWInit || prev.size.h !== bgSizeHInit) {
                return { image: imgSrc, size: { w: bgSizeWInit, h: bgSizeHInit }, position: { x: 0, y: 0 } };
              }
              return prev;
            });
          }
        }
      }

      // If still no rect, nothing to draw yet
      if (!rect) return;

      // Use previous rect if off-image; clamp to edges to keep background stable
      const clampedX = Math.max(0, Math.min(rect.width, pt.x - rect.left));
      const clampedY = Math.max(0, Math.min(rect.height, pt.y - rect.top));

      // Map in CSS pixel space for exact alignment with finger position
      const bgSizeW = rect.width * lensZoom;
      const bgSizeH = rect.height * lensZoom;
      const bgPosX = -clampedX * lensZoom + lensDiameter / 2;
      const bgPosY = -clampedY * lensZoom + lensDiameter / 2;

      // Avoid state updates per frame; update DOM styles directly

      const lensEl = lensElRef.current;
      if (lensEl) {
        lensEl.style.transform = `translate3d(${pt.x - lensDiameter / 2}px, ${pt.y - lensDiameter / 2 - lensOffsetY}px, 0)`;
        lensEl.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
        lensEl.style.backgroundSize = `${bgSizeW}px ${bgSizeH}px`;
      } else {
        setLensPosition({ x: pt.x - lensDiameter / 2, y: pt.y - lensDiameter / 2 - lensOffsetY });
      }
    });
  }, [lensDiameter, lensZoom]);

  // Now that updateLensForPoint is defined, define document handlers
  const handleDocumentTouchMove = useCallback((ev: TouchEvent) => {
    if (!isActiveRef.current || activeTouchIdRef.current === null) return;
    for (let i = 0; i < ev.changedTouches.length; i++) {
      const t = ev.changedTouches[i];
      if (t.identifier === activeTouchIdRef.current) {
        updateLensForPoint(t.clientX, t.clientY);
        break;
      }
    }
  }, [updateLensForPoint]);

  const handleDocumentTouchEnd = useCallback((ev: TouchEvent) => {
    if (activeTouchIdRef.current === null) return;
    for (let i = 0; i < ev.changedTouches.length; i++) {
      const t = ev.changedTouches[i];
      if (t.identifier === activeTouchIdRef.current) {
        endMagnifier();
        break;
      }
    }
  }, [endMagnifier]);

  const attachDocumentTouchHandlers = useCallback(() => {
    if (docTouchHandlersAttachedRef.current) return;
    document.addEventListener("touchmove", handleDocumentTouchMove, { passive: false, capture: true });
    document.addEventListener("touchend", handleDocumentTouchEnd, { capture: true });
    document.addEventListener("touchcancel", handleDocumentTouchEnd, { capture: true });
    docTouchHandlersAttachedRef.current = true;
  }, [handleDocumentTouchMove, handleDocumentTouchEnd]);

  const detachDocumentTouchHandlers = useCallback(() => {
    if (!docTouchHandlersAttachedRef.current) return;
    document.removeEventListener("touchmove", handleDocumentTouchMove as EventListener, { capture: true } as any);
    document.removeEventListener("touchend", handleDocumentTouchEnd as EventListener, { capture: true } as any);
    document.removeEventListener("touchcancel", handleDocumentTouchEnd as EventListener, { capture: true } as any);
    docTouchHandlersAttachedRef.current = false;
  }, [handleDocumentTouchMove, handleDocumentTouchEnd]);

  const handleDocumentPointerMove = useCallback((ev: PointerEvent) => {
    if (!isActiveRef.current || activePointerIdRef.current === null) return;
    if (ev.pointerId !== activePointerIdRef.current) return;
    updateLensForPoint(ev.clientX, ev.clientY);
  }, [updateLensForPoint]);

  const handleDocumentPointerUp = useCallback((ev: PointerEvent) => {
    if (activePointerIdRef.current === null) return;
    if (ev.pointerId !== activePointerIdRef.current) return;
    endMagnifier();
  }, [endMagnifier]);

  const attachDocumentPointerHandlers = useCallback(() => {
    if (docPointerHandlersAttachedRef.current) return;
    document.addEventListener("pointermove", handleDocumentPointerMove, { capture: true });
    document.addEventListener("pointerup", handleDocumentPointerUp, { capture: true });
    document.addEventListener("pointercancel", handleDocumentPointerUp, { capture: true });
    docPointerHandlersAttachedRef.current = true;
  }, [handleDocumentPointerMove, handleDocumentPointerUp]);

  const detachDocumentPointerHandlers = useCallback(() => {
    if (!docPointerHandlersAttachedRef.current) return;
    document.removeEventListener("pointermove", handleDocumentPointerMove as EventListener, { capture: true } as any);
    document.removeEventListener("pointerup", handleDocumentPointerUp as EventListener, { capture: true } as any);
    document.removeEventListener("pointercancel", handleDocumentPointerUp as EventListener, { capture: true } as any);
    docPointerHandlersAttachedRef.current = false;
  }, [handleDocumentPointerMove, handleDocumentPointerUp]);

  function endMagnifier() {
    setLensVisible(false);
    setLensBackground(null);
    setLensPosition({ x: 0, y: 0 });
    isActiveRef.current = false;
    activePointerIdRef.current = null;
    activeTouchIdRef.current = null;
    targetImgRef.current = null;
    targetRectRef.current = null;
    detachGlobalTouchMoveBlocker();
    detachDocumentTouchHandlers();
    detachDocumentPointerHandlers();
    clearLongPressTimer();
  }

  const onPointerDown: Handlers["onPointerDown"] = (e) => {
    if (activeTouchIdRef.current !== null) return; // ignore pointer if touch already active
    // Only single-finger/touch or primary pointer
    if (activePointerIdRef.current !== null) return;
    if (e.pointerType !== "touch" && e.pointerType !== "pen" && e.pointerType !== "mouse") return;
    activePointerIdRef.current = e.pointerId;
    isActiveRef.current = false;
    clearLongPressTimer();
    const { clientX, clientY } = e;
    pressOriginRef.current = { x: clientX, y: clientY };
    // Capture pointer early so we reliably receive move events during potential activation
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    longPressTimerRef.current = window.setTimeout(() => {
      isActiveRef.current = true;
      setLensVisible(true);
      updateLensForPoint(clientX, clientY);
      attachGlobalTouchMoveBlocker();
      attachDocumentPointerHandlers();
    }, longPressDelayMs);
  };

  // Image-level pointer start ensures targetImg is set immediately
  const onPointerDownImage: Handlers["onPointerDownImage"] = (e) => {
    if (activeTouchIdRef.current !== null) return;
    if (activePointerIdRef.current !== null) return;
    if (e.pointerType !== "touch" && e.pointerType !== "pen" && e.pointerType !== "mouse") return;
    const img = e.currentTarget as HTMLImageElement;
    const rect = img.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    targetImgRef.current = img;
    targetRectRef.current = rect;
    activePointerIdRef.current = e.pointerId;
    isActiveRef.current = false;
    clearLongPressTimer();
    const { clientX, clientY } = e;
    pressOriginRef.current = { x: clientX, y: clientY };
    
    // Set lens background immediately when starting on image
    const natWInit = img.naturalWidth || rect.width;
    const natHInit = img.naturalHeight || rect.height;
    const bgSizeWInit = natWInit * lensZoom;
    const bgSizeHInit = natHInit * lensZoom;
    const imgSrc = img.currentSrc || img.src;
    setLensBackground(prev => {
      if (!prev || prev.image !== imgSrc || prev.size.w !== bgSizeWInit || prev.size.h !== bgSizeHInit) {
        return { image: imgSrc, size: { w: bgSizeWInit, h: bgSizeHInit }, position: { x: 0, y: 0 } };
      }
      return prev;
    });
    
    try { (img as any).setPointerCapture?.(e.pointerId); } catch {}
    longPressTimerRef.current = window.setTimeout(() => {
      // Refresh rect when activating (in case image moved/scaled)
      const freshRect = img.getBoundingClientRect();
      if (freshRect.width && freshRect.height) {
        targetRectRef.current = freshRect;
      }
      isActiveRef.current = true;
      setLensVisible(true);
      updateLensForPoint(clientX, clientY);
      attachGlobalTouchMoveBlocker();
      attachDocumentPointerHandlers();
    }, longPressDelayMs);
  };

  const onPointerMove: Handlers["onPointerMove"] = (e) => {
    if (activeTouchIdRef.current !== null) return; // touch mode owns the gesture
    if (activePointerIdRef.current !== e.pointerId) return;
    if (!isActiveRef.current) {
      // Cancel long press if user is obviously scrolling/moving before activation
      const origin = pressOriginRef.current;
      if (origin) {
        const dx = e.clientX - origin.x;
        const dy = e.clientY - origin.y;
        if (dx * dx + dy * dy > 12 * 12) {
          clearLongPressTimer();
          pressOriginRef.current = { x: e.clientX, y: e.clientY };
        }
      }
      return;
    }
    updateLensForPoint(e.clientX, e.clientY);
  };

  const onPointerUp: Handlers["onPointerUp"] = (e) => {
    if (activeTouchIdRef.current !== null) return;
    if (activePointerIdRef.current !== e.pointerId) return;
    try { if (activePointerIdRef.current !== null) e.currentTarget.releasePointerCapture(activePointerIdRef.current); } catch {}
    endMagnifier();
  };

  const onPointerCancel: Handlers["onPointerCancel"] = (e) => {
    if (activeTouchIdRef.current !== null) return;
    if (activePointerIdRef.current !== null) {
      try { e.currentTarget.releasePointerCapture(activePointerIdRef.current); } catch {}
    }
    try { if (activePointerIdRef.current !== null) e.currentTarget.releasePointerCapture(activePointerIdRef.current); } catch {}
    endMagnifier();
  };

  const onPointerLeave: Handlers["onPointerLeave"] = () => {
    // Do not end on leave; pointer capture or fast moves can trigger leave even while dragging
  };

  // Touch fallback for iOS Safari and partial Pointer Events support
  const onTouchStart: Handlers["onTouchStart"] = (e) => {
    if (activePointerIdRef.current !== null) return; // ignore if pointer already active
    if (activeTouchIdRef.current !== null) return;
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    activeTouchIdRef.current = t.identifier;
    isActiveRef.current = false;
    clearLongPressTimer();
    pressOriginRef.current = { x: t.clientX, y: t.clientY };
    longPressTimerRef.current = window.setTimeout(() => {
      isActiveRef.current = true;
      setLensVisible(true);
      updateLensForPoint(t.clientX, t.clientY);
      attachGlobalTouchMoveBlocker();
      attachDocumentTouchHandlers();
    }, longPressDelayMs);
  };

  const onTouchStartImage: Handlers["onTouchStartImage"] = (e) => {
    if (activePointerIdRef.current !== null) return;
    if (activeTouchIdRef.current !== null) return;
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    const img = e.currentTarget as HTMLImageElement;
    const rect = img.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    targetImgRef.current = img;
    targetRectRef.current = rect;
    activeTouchIdRef.current = t.identifier;
    isActiveRef.current = false;
    clearLongPressTimer();
    pressOriginRef.current = { x: t.clientX, y: t.clientY };
    longPressTimerRef.current = window.setTimeout(() => {
      isActiveRef.current = true;
      setLensVisible(true);
      updateLensForPoint(t.clientX, t.clientY);
      attachGlobalTouchMoveBlocker();
    }, longPressDelayMs);
  };

  const onTouchMove: Handlers["onTouchMove"] = (e) => {
    if (activeTouchIdRef.current === null) return;
    const touches = e.changedTouches;
    let tt: any = null;
    for (let i = 0; i < touches.length; i++) {
      if (touches[i].identifier === activeTouchIdRef.current) { tt = touches[i]; break; }
    }
    if (!tt) return;
    if (!isActiveRef.current) {
      const origin = pressOriginRef.current;
      if (origin) {
        const dx = tt.clientX - origin.x;
        const dy = tt.clientY - origin.y;
        if (dx * dx + dy * dy > 12 * 12) {
          clearLongPressTimer();
          pressOriginRef.current = { x: tt.clientX, y: tt.clientY };
        }
      }
      return;
    }
    // Update lens (scroll blocking handled by global non-passive listener)
    updateLensForPoint(tt.clientX, tt.clientY);
  };

  const endTouch = () => {
    activeTouchIdRef.current = null;
    endMagnifier();
  };

  const onTouchEnd: Handlers["onTouchEnd"] = (e) => {
    if (activeTouchIdRef.current === null) return;
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      if (touches[i].identifier === activeTouchIdRef.current) { endTouch(); break; }
    }
  };

  const onTouchCancel: Handlers["onTouchCancel"] = () => {
    if (activeTouchIdRef.current !== null) endTouch();
  };

  return {
    lensVisible,
    lensBackground,
    lensPosition,
    lensDiameter,
    lensZoom,
    lensElRef,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onPointerLeave, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel, onPointerDownImage, onTouchStartImage },
  } as const;
}

export type UseMagnifierReturn = ReturnType<typeof useMagnifier>;


