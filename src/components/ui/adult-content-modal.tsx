import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShieldAlert } from "lucide-react";

interface AdultContentModalProps {
    isOpen: boolean;
    onAccept: () => void;
    onDecline: () => void;
}

const AdultContentModal = ({ isOpen, onAccept, onDecline }: AdultContentModalProps) => {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent className="max-w-sm p-6 gap-6">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-destructive/10 p-3">
                        <ShieldAlert className="h-10 w-10 text-destructive" />
                    </div>
                    
                    <div className="space-y-2">
                        <AlertDialogTitle className="text-xl font-semibold">
                            Adult Content Warning
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm leading-relaxed">
                            This content is intended for mature audiences only. 
                            By continuing, you confirm that you are of legal age.
                        </AlertDialogDescription>
                    </div>
                </div>

                <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-3">
                    <AlertDialogCancel 
                        onClick={onDecline}
                        className="w-full sm:flex-1"
                    >
                        Go Back
                    </AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={onAccept}
                        className="w-full sm:flex-1 bg-primary hover:bg-primary/90"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AdultContentModal;

