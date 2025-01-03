import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useDeleteAlert } from '@/contexts/DeleteAlertContext';


export const DeleteBot: React.FC = () => {

    const { isOpen, itemToDelete, closeDeleteAlert, confirmDelete,isLoading } =  useDeleteAlert();

  return (
    <AlertDialog open={isOpen} onOpenChange={closeDeleteAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are You sure to remove your bot {' '}
            <span className="font-medium text-destructive">{itemToDelete?.name} </span> ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            disabled={isLoading}
          onClick={confirmDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};



