import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useSearchParamsState<T extends string | number | undefined>(
  searchParamName: string,
  defaultValue?: T,
): readonly [
  searchParamsState: T,
  setSearchParamsState: (newState: T) => void
] {
  const [searchParams, setSearchParams] = useSearchParams();

  const acquiredSearchParam = searchParams.get(searchParamName);
  
  const searchParamsState = (acquiredSearchParam !== null
    ? (typeof defaultValue === "number"
        ? Number(acquiredSearchParam)
        : acquiredSearchParam)
    : defaultValue) as T;

  const setSearchParamsState = useCallback((newState: T) => {
    const next = Object.assign(
      {},
      [...searchParams.entries()].reduce(
        (o, [key, value]) => ({ ...o, [key]: value }),
        {}
      ),
      { [searchParamName]: String(newState) } 
    );
    setSearchParams(next);
  }, [searchParams, searchParamName, setSearchParams]);


  return useMemo(() => [searchParamsState, setSearchParamsState], [
    searchParamsState,
    setSearchParamsState
  ]);
}
