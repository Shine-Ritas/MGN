/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useRef } from "react";
import { useGetDataQuery } from "@/redux/api/queryApi";
import { toast } from "@/components/ui/use-toast";
import useLogout from "./useLogout";
import { useUserAppDispatch } from "@/redux/hooks";
import { setMaintenance } from "@/redux/slices/user-global";

interface QueryErrorInterface {
    status: number;
    data: any;
}

const useQuery = (
    url?: string,
    callback?: (value: any, meta: any) => void,
    refetchOnUrlChange: boolean = true,
    disableAutoFetch: boolean = false
) => {
    if (!url) {
        return {};
    }

    const { data, isLoading, refetch, error, isFetching } = useGetDataQuery(url || "", {
        skip: disableAutoFetch,
    });

    const logout = useLogout();
    const memoizedCallback = useCallback((data: any, meta: any) => {
        if (callback) {
            callback(data, meta);
        }
    }, [callback]);

    const lastErrorRef = useRef<string | null>(null);
    const dispatch = useUserAppDispatch();

    useEffect(() => {
        if (refetchOnUrlChange && !disableAutoFetch) {
            refetch();
        }
    }, [url, refetch, refetchOnUrlChange, disableAutoFetch]);

    useEffect(() => {
        if (data && !isFetching) {
            memoizedCallback(data, { isLoading, isFetching });
        }
    }, [data, isFetching, isLoading, memoizedCallback]);

    useEffect(() => {
        if (error) {
            const { status, data: errorData } = error as QueryErrorInterface;
            const errorMessage = errorData?.message || '';

            if (status === 401) {
                logout(false); // Trigger logout on unauthorized access
            }

            if (status === 503) {
                dispatch(setMaintenance(true));
            }

            if (errorMessage && lastErrorRef.current !== errorMessage && status !== 503) {
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
    }, [error, dispatch, logout]);

    return {
        data,
        isLoading,
        refetch,
        error,
        isFetching,
    };
};

export default useQuery;