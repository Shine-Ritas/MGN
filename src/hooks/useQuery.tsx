/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useRef } from "react";
import { useGetDataQuery } from "@/redux/api/queryApi";
import { toast } from "@/components/ui/use-toast";
import useLogout from "./useLogout";

interface QueryErrorInterface {
    status: number;
    data: any;
}

const useQuery = (
    url?: string,
    callback?: (value: any, meta: any) => void,
    refetchOnUrlChange: boolean = true
) => {
    if(!url)
    {
        return {};
    }
    const { data, isLoading, refetch, error, isFetching, } = useGetDataQuery(url || "");
    const logout = useLogout();
    const memoizedCallback = useCallback(callback, [callback]);
    const lastErrorRef = useRef<string | null>(null);

    useEffect(() => {
        if (refetchOnUrlChange) {
            refetch();
        }
    }, [url, refetch, refetchOnUrlChange]);

    useEffect(() => {
        if (data && !isFetching && memoizedCallback) {
            memoizedCallback(data, { isLoading, isFetching });
        }
    }, [data, isFetching, isLoading, memoizedCallback]);

    useEffect(() => {
        if (error) {
            const { status, data: errorData } = error as QueryErrorInterface;

            // Prevent showing the same error multiple times
            const errorMessage = errorData?.message || '';

            if (status === 401) {
                logout(false); // Trigger logout on unauthorized access
            }

            if (errorData && lastErrorRef.current !== errorMessage) {
                // Show the error only if it's not the same as the previous error
                toast({
                    title: "❗️Error",
                    description: errorMessage,
                    variant: "destructive",
                });

                // Update the last error ref
                lastErrorRef.current = errorMessage;
            }
        }
    }, [error, logout]);

    return {
        data,
        isLoading,
        refetch,
        error,
        isFetching,
    }
};

export default useQuery;
