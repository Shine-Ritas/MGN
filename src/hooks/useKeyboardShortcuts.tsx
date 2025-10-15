import { useEffect } from "react";

const useKeyboardShortcuts = (shortcutMap: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      // Ignore shortcuts when user is typing in input fields, textareas, or contenteditable elements
      const target = event.target as HTMLElement;
      const isTyping = 
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) {
        return; // Don't trigger shortcuts when typing
      }

      const action = shortcutMap[event.key.toLowerCase()]; // Normalize keys to lowercase
      if (action) {
        event.preventDefault(); // Prevent default browser behavior for certain keys
        action();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [shortcutMap]);
};

export default useKeyboardShortcuts;
