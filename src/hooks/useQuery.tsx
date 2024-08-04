import { useEffect } from "react";
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
    const { data, isLoading, refetch, error, isFetching } = useGetDataQuery(url);
    const logout = useLogout();

    useEffect(() => {
        if (refetchOnUrlChange) {
            refetch();
        }
    }, [url, refetch, refetchOnUrlChange]);

    useEffect(() => {
        if (data && !isFetching) {
            if (callback) {
                callback(data, { isLoading, isFetching });
            }
        }
    }, [data, isFetching, callback, isLoading]);

    useEffect(() => {
        if (error) {
            const { status, data: errorData } = error as QueryErrorInterface;

            if (status === 401) {
                logout(false);
            }

            if (errorData) {
                toast({
                    title: "❗️Error",
                    description: errorData.message,
                    variant: "destructive",
                });
            }
        }
    }, [error, logout]);

    return { data, isLoading, isFetching, error, refetch };
};

export default useQuery;
