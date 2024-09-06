import { useState } from 'react';

export const  useDialog = <T,>()=>{
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null); // T is the generic type for data

  const onOpen = (modalData?: T) => {
    setData(modalData || null); // Accepts data of type T or null
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setData(null); // Reset data when closing
  };

  return {
    isOpen,
    onOpen,
    onClose,
    data,
  };
}

export type DialogHookType<T = any> = {
  isOpen: boolean;
  onOpen: (modalData?: T) => void;
  onClose: () => void;
  data: T | null;
};

export type PartialDialogHookType<T = any> =  Omit<DialogHookType<T>, 'onOpen'>; // Omit onOpen from DialogHookType