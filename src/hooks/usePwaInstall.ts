import { useCallback, useEffect, useState } from "react";

const INSTALL_DISMISSED_KEY = "mgn:pwa-install-dismissed";

type InstallOutcome = "accepted" | "dismissed" | "unavailable";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

const isStandalone = () => {
  const navigatorWithStandalone = navigator as Navigator & {
    standalone?: boolean;
  };

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    navigatorWithStandalone.standalone === true
  );
};

const wasDismissedThisSession = () => {
  try {
    return sessionStorage.getItem(INSTALL_DISMISSED_KEY) === "true";
  } catch {
    return false;
  }
};

const rememberDismissal = () => {
  try {
    sessionStorage.setItem(INSTALL_DISMISSED_KEY, "true");
  } catch {
    // The banner can still be hidden in memory when storage is unavailable.
  }
};

const usePwaInstall = () => {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isDismissed, setIsDismissed] = useState(wasDismissedThisSession);
  const [isInstalled, setIsInstalled] = useState(isStandalone);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      if (isStandalone() || wasDismissedThisSession()) {
        return;
      }

      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsInstalled(true);
      setIsInstalling(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const dismiss = useCallback(() => {
    rememberDismissal();
    setIsDismissed(true);
    setInstallPrompt(null);
  }, []);

  const install = useCallback(async (): Promise<InstallOutcome> => {
    if (!installPrompt || isInstalling) {
      return "unavailable";
    }

    setIsInstalling(true);

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;

      setInstallPrompt(null);
      if (outcome === "dismissed") {
        rememberDismissal();
        setIsDismissed(true);
      }

      return outcome;
    } catch {
      setInstallPrompt(null);
      return "unavailable";
    } finally {
      setIsInstalling(false);
    }
  }, [installPrompt, isInstalling]);

  return {
    canInstall: Boolean(installPrompt) && !isDismissed && !isInstalled,
    isInstalling,
    install,
    dismiss,
  };
};

export type { InstallOutcome };
export default usePwaInstall;
