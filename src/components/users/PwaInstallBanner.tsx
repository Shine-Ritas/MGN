import { Download, X } from "lucide-react";

import usePwaInstall from "@/hooks/usePwaInstall";
import { Button } from "@/components/ui/button";

const PwaInstallBanner = () => {
  const { canInstall, dismiss, install, isInstalling } = usePwaInstall();

  if (!canInstall) {
    return null;
  }

  return (
    <aside
      aria-label="Install MGN"
      className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[100] mx-auto flex max-w-xl items-center gap-3 rounded-xl border border-border bg-card/95 p-3 text-card-foreground shadow-2xl backdrop-blur sm:p-4"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Download aria-hidden="true" className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-semibold">Install MGN</p>
        <p className="text-sm text-muted-foreground">
          Add MGN to your device for a faster, app-like experience.
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        disabled={isInstalling}
        onClick={() => void install()}
      >
        {isInstalling ? "Installing..." : "Install"}
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Dismiss install prompt"
        disabled={isInstalling}
        onClick={dismiss}
        className="shrink-0"
      >
        <X aria-hidden="true" className="h-4 w-4" />
      </Button>
    </aside>
  );
};

export default PwaInstallBanner;
