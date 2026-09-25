---
name: mgn-reader-changes
description: Change MGN's chapter reader safely. Use for reading modes, page navigation, settings, shortcuts, image loading, caching, magnification, progress, or premium chapter access.
---

# MGN Reader Changes

The reader coordinates server data, persisted Redux settings, URL navigation, pointer/keyboard input, image performance, and access control. Preserve those relationships rather than treating the screen as an isolated component.

## Read the relevant path

- Orchestration and access: `src/pages/users/Detail/detail.tsx`
- Image rendering and magnifier: `src/pages/users/Detail/image-container.tsx` and `src/hooks/useMagnifier.ts`
- Drawer/settings UI: `src/pages/users/Detail/detail-drawer.tsx` and `setting-modals/`
- State, defaults, validation, and shortcuts: `src/redux/slices/userReadSetting/`
- Navigation math: `src/utilities/read-action.ts` and `src/utilities/read-helper.ts`
- Progress/history: `src/hooks/useReadChapter.tsx` and `user-read-slice.ts`

Open only the files involved in the requested behavior plus their direct callers.

## Reader invariants

- `currentPage` is one-based; image arrays and indexes are zero-based. Convert deliberately at the boundary.
- Support all established modes: long-strip and paged reading, left-to-right/right-to-left direction, mobile touch, desktop click regions, keyboard shortcuts, and the settings drawer.
- Keep hooks unconditional. Derive data before rendering access, loading, or empty-state branches.
- Persist only validated reader settings. When adding a setting, update its type, initial value, validation, selector/action path, UI control, and device filtering as applicable.
- Reset chapter-scoped state when `currentId` changes, while retaining user preferences that are intentionally global.
- Build previous/next URLs from route data and preserve the fallback to the title detail page.
- Keep premium chapter checks and reading-history updates intact. Do not reveal protected image content before the access decision.

## Input and performance safety

- Do not add duplicate global listeners or recursive timers without cleanup. Keep callbacks stable when they are dependencies of effects or input hooks.
- Preserve normal scrolling and browser gestures until magnification is active; pointer and touch cancellation must restore the idle state.
- Avoid eager loading an entire chapter in paged modes. Reuse the nearby sequential/adjacent prefetch behavior and deduplicate prefetched pages.
- Give every image a stable server-derived key and useful alternative text when the API provides enough context.

## Verification matrix

Check the affected behavior in at least these relevant combinations:

- Desktop paged mode with mouse and keyboard navigation.
- Mobile long-strip mode with scroll, tap/double-tap, and drawer interaction.
- First page, last page, previous/next chapter, and `last_page=true` entry.
- Manga and manhwa default styles.
- Free chapter, allowed premium chapter, and blocked premium chapter.
- Slow or failed image loading without corrupting page progress.

Run the validation commands from the root `AGENTS.md` after the focused behavior checks.
