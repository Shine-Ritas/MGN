import { useEffect } from "react";

const useKeyboardShortcuts = (shortcutMap: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
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
