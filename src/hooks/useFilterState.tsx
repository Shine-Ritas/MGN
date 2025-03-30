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

/**
 * Custom hook to manage filter state with URL synchronization and debouncing.
 *
 * @param {Record<string, any>} initialState - The initial state of the filters.
 * @param {string[]} [changeOnReset=[]] - Keys that should reset to their initial state when any other key changes.
 * @param {number} [debounceDelay=300] - Delay in milliseconds for debouncing filter changes.
 * 
 * @returns {Object} - An object containing:
 *   - `bunUrl` {string} - The URL query string representing the current filter state.
 *   - `handleChange` {(key: string, value: any) => void} - Function to update a filter parameter.
 *   - `resetFilters` {() => void} - Function to reset all filters to their initial state.
 *   - `getByKey` {(key: string) => any} - Function to get the value of a filter parameter by key.
 *   - `filterParams` {Record<string, any>} - The current filter parameters.
 */
const useFilterState = (initialState: Record<string, any>, changeOnReset: string[] = [], debounceDelay = 300) => {
    // Set initial state from URL or fallback to default initialState
    const [filterParams, setFilterParams] = useState(getParamsFromUrl(initialState));
    const [bunUrl, setBunUrl] = useState<string>("");

    const debouncedFilterParams = useDebounce(filterParams, debounceDelay);
    console.log('time')

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

    const submitUrl = useCallback(() => {
        const searchParams = new URLSearchParams();
        Object.keys(filterParams).forEach((key) => {
            const value = filterParams[key];
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
    }
    , [filterParams]);

    useEffect(() => {
        submitUrl();
    }, [debouncedFilterParams, submitUrl]);

    return { bunUrl, handleChange, resetFilters, getByKey, filterParams,submitUrl };
};

export default useFilterState;
