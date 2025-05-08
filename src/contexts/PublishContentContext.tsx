import { PublishDataType } from "@/pages/admin/Comics/ComicTable";
import { createContext, useContext, useState } from "react";

interface PublishContentContextType extends PublishDataType {
  setPublishData: React.Dispatch<React.SetStateAction<PublishDataType>>;
}

const PublishContentContext = createContext<PublishContentContextType | null>(null);

export const usePublishContent = () => {
  const context = useContext(PublishContentContext);
  if (!context) {
    throw new Error("usePublishContent must be used within a PublishContentProvider");
  }
  return context;
}

export const PublishContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [publishData, setPublishData] = useState<PublishDataType>({
    open: false,
    setOpen: (open: boolean) => setPublishData((prev) => ({ ...prev, open })),
    mogou_slug: null,
    sub_mogou_slug: null,
  });

  const data = {
    ...publishData,
    setPublishData,
  }

  return (
    <PublishContentContext.Provider value={data} >
      {children}
    </PublishContentContext.Provider>
  );
};

