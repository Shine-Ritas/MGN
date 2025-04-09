import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Crown, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { selectUserGlobal, setSubscriptionModalOpen } from "@/redux/slices/user-global";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ToSubscribe() {
    const [open, setOpen] = useState(false);

    const userGlobal = useUserAppSelector(selectUserGlobal);
    const dispatch = useUserAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (userGlobal?.subscriptionModalOpen !== open) {
            setOpen(userGlobal?.subscriptionModalOpen);
        }
    }, [open, userGlobal?.subscriptionModalOpen]);

    const handleToggle = useCallback((open: boolean) => {
        setOpen(open);
        dispatch(setSubscriptionModalOpen(open));
    }, [dispatch]);

    const handleSubscribe = useCallback(() => {
        navigate("/login");
        handleToggle(false);
    }, [navigate, handleToggle]);

    const title = useMemo(() => userGlobal?.subscriptionModalData?.title || "Chapter 1: The Awakening", [userGlobal]);
    const description = useMemo(() => {
        const desc = userGlobal?.subscriptionModalData?.description || "";
        return desc.length > 200 ? desc.slice(0, 200) + "..." : desc;
    }, [userGlobal]);

    return (
        <Dialog open={open} onOpenChange={handleToggle}>
            <DialogContent className="sm:max-w-md overflow-hidden border-0 shadow-2xl">
                {/* Background blur and gradient layers */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-70">
                    <div className="absolute inset-0 backdrop-blur-[2px]" />
                </div>
                <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-purple-500/20 blur-xl" />
                <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-indigo-500/20 blur-lg" />

                <motion.div
                    className="absolute top-0 right-0 h-full w-1/2 opacity-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                    <div className="h-full w-full bg-gradient-to-b from-purple-500/30 via-transparent to-transparent" />
                </motion.div>

                {/* Header with lock icon */}
                <DialogHeader className="relative">
                    <motion.div
                        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 shadow-lg"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                    >
                        <Lock className="h-6 w-6 text-white" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <DialogTitle className="text-center text-xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
                            Premium Content
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            This chapter is available exclusively for our subscription members.
                        </DialogDescription>
                    </motion.div>
                </DialogHeader>

                {/* Subscription information */}
                <motion.div
                    className="relative mt-4 overflow-hidden rounded-lg border p-6 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                >
                    <div className="absolute -right-4 -top-4">
                            <Sparkles className="h-8 w-8 text-amber-400 drop-shadow-md" />
                    </div>

                    <h3 className="mb-2 font-semibold text-gray-400">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>

                    <div className="mt-4 flex items-center gap-2 rounded-md bg-gradient-to-r p-3 border border-slate-800 shadow-sm">
                        
                            <Crown className="h-5 w-5 text-amber-500 drop-shadow-sm" />
                   
                        <p className="text-sm font-medium text-gray-300">
                            Unlock this chapter and all premium content with a subscription.
                        </p>
                    </div>
                </motion.div>

                {/* Footer actions */}
                <DialogFooter className="relative flex-col gap-2 sm:flex-col mt-2">
                    <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            onClick={handleSubscribe}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
                            size="lg"
                        >
                            Subscribe Now
                            <Sparkles className="h-4 w-4 ml-2" />
                        </Button>
                    </motion.div>
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                    >
                        <Button
                            variant="ghost"
                            className="w-full text-gray-400 hover:text-gray-500 hover:bg-transparent"
                            onClick={() => handleToggle(false)}
                        >
                            Maybe Later
                        </Button>
                    </motion.div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
