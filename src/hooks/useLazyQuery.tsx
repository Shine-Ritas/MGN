/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useRef } from "react";
import { useLazyGetDataQuery } from "@/redux/api/queryApi";
import { toast } from "@/components/ui/use-toast";
import useLogout from "./useLogout";
import { useUserAppDispatch } from "@/redux/hooks";
import { setMaintenance } from "@/redux/slices/user-global";

interface QueryErrorInterface {
    status: number;
    data: any;
}

interface UseLazyQueryOptions {
    callback?: (value: any, meta: any) => void;
    showErrorToast?: boolean;
}

const useLazyQuery = (options: UseLazyQueryOptions = {}) => {
    const { callback, showErrorToast = true } = options;

    const [trigger, { data, isLoading, error, isFetching }] = useLazyGetDataQuery();

    const logout = useLogout();
    const memoizedCallback = useCallback((data: any, meta: any) => {
        if (callback) {
            callback(data, meta);
        }
    }, [callback]);

    const lastErrorRef = useRef<string | null>(null);
    const dispatch = useUserAppDispatch();

    useEffect(() => {
        if (data && !isFetching) {
            memoizedCallback(data, { isLoading, isFetching });
        }
    }, [data, isFetching, isLoading, memoizedCallback]);

    useEffect(() => {
        if (error) {
            const { status, data: errorData } = error as QueryErrorInterface;
            const errorMessage = errorData?.message || '';

            if (status == 401) {
                logout(true); // Trigger logout on unauthorized access
            }

            if (status === 503) {
                dispatch(setMaintenance(true));
            }

            if (errorMessage && lastErrorRef.current !== errorMessage && status !== 503 && showErrorToast) {
                toast({
                    title: "❗️Error",
                    description: errorMessage,
                    variant: "destructive",
                });
                lastErrorRef.current = errorMessage;
            }

            setTimeout(() => {
                lastErrorRef.current = null;
            }, 7000);
        }
    }, [error, dispatch, logout, showErrorToast]);

    const executeQuery = useCallback(
        (url: string) => {
            return trigger(url);
        },
        [trigger]
    );

    return {
        executeQuery,
        data,
        isLoading,
        error,
        isFetching,
    };
};

export default useLazyQuery;

