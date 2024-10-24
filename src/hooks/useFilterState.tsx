import { useEffect, useState, useCallback } from "react";

const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const getParamsFromUrl = (initialState: Record<string, any>) => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsFromUrl: Record<string, any> = {};

    Object.keys(initialState).forEach((key) => {
        const paramValue = searchParams.get(key);

        if (paramValue) {
            if (Array.isArray(initialState[key])) {
                paramsFromUrl[key] = paramValue.split(",");
            } 
            else if (typeof initialState[key] === "number") {
                paramsFromUrl[key] = Number(paramValue);
            } 
            else {
                paramsFromUrl[key] = paramValue;
            }
        }
    });

    return { ...initialState, ...paramsFromUrl };
};

const useFilterState = (initialState: Record<string, any>, changeOnReset: string[] = [], debounceDelay = 300) => {
    // Set initial state from URL or fallback to default initialState
    const [filterParams, setFilterParams] = useState(getParamsFromUrl(initialState));
    const [bunUrl, setBunUrl] = useState<string>("");

    const debouncedFilterParams = useDebounce(filterParams, debounceDelay);

    const handleChange = useCallback((key: string, value: any) => {
     
        if (Object.prototype.hasOwnProperty.call(filterParams, key)) {
            setFilterParams((prevParams) => ({
                ...prevParams,
                [key]: value,
            }));
        }

        changeOnReset.length > 0 && changeOnReset.map((changeKey) => {
            if (Object.prototype.hasOwnProperty.call(filterParams, changeKey) && key !== changeKey
            ){
                setFilterParams((prevParams) => ({
                    ...prevParams,
                    [changeKey]: initialState[changeKey],
                }));
            }
        }
        );

    }, [changeOnReset, filterParams, initialState]);

    const resetFilters = useCallback(() => {
        setFilterParams(initialState);
    }, [initialState]);

    const getByKey = useCallback((key: string) => {
        return filterParams[key] ?? null;
    }, [filterParams]);

    useEffect(() => {
        const searchParams = new URLSearchParams();
        Object.keys(debouncedFilterParams).forEach((key) => {
            const value = debouncedFilterParams[key];
            if (Array.isArray(value)) {
                if (value.length > 0) {
                    searchParams.set(key, value.join(','));
                }
            } else if (value !== undefined && value !== null && value !== '') {
                searchParams.set(key, value.toString());
            }
        });
        setBunUrl(searchParams.toString());

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState(null, "", newUrl);
    }, [debouncedFilterParams]);

    return { bunUrl, handleChange, resetFilters, getByKey, filterParams };
};

export default useFilterState;
