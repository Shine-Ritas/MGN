import React, { createContext, useState, useContext, useCallback } from 'react';


type itemToDelete = {
    name: string;
    key: string;
}

interface DeleteAlertContextType {
  isOpen: boolean;
  itemToDelete: itemToDelete | null;
  openDeleteAlert: (item: itemToDelete) => void;
  closeDeleteAlert: () => void;
  confirmDelete: () => void;
  onDelete: ((item: itemToDelete) => void) | null;
  setOnDelete: (callback: (item: itemToDelete) => void) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const DeleteAlertContext = createContext<DeleteAlertContextType | undefined>(undefined);

export const useDeleteAlert = () => {
  const context = useContext(DeleteAlertContext);
  if (!context) {
    throw new Error('useDeleteAlert must be used within a DeleteAlertProvider');
  }
  return context;
};


export const DeleteAlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<itemToDelete | null>(null);
  const [onDelete, setOnDelete] = useState<((item: itemToDelete) => void) | null>(null);

  const openDeleteAlert = useCallback((item: itemToDelete) => {
    setItemToDelete(item);
    setIsOpen(true);
  }, []);

  const closeDeleteAlert = useCallback(() => {
    setIsOpen(false);
    setItemToDelete(null);
  }, []);

  const confirmDelete = useCallback(async () => {

    if (itemToDelete && onDelete) {
      setIsLoading(true);
      await onDelete(itemToDelete);
      setIsLoading(false);
      closeDeleteAlert();
    }
  }, [itemToDelete, onDelete, closeDeleteAlert]);

  const value = {
    isOpen,
    itemToDelete,
    openDeleteAlert,
    closeDeleteAlert,
    confirmDelete,
    onDelete,
    setOnDelete,
    isLoading,
    setIsLoading
  };

  return <DeleteAlertContext.Provider value={value}>{children}</DeleteAlertContext.Provider>;
};

