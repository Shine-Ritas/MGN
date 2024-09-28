import { useMemo } from 'react';

type QueryParams = {
    [key: string]: string | number | boolean | string[] | number[] | boolean[] | undefined | null;
    };

const useQueryParams = (params : QueryParams) => {
  return useMemo(() => {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach(key => {
      const value = params[key];
      
      if (Array.isArray(value)) {
        // Join array values with commas
        searchParams.set(key, value.join(','));
      } else if (value !== undefined && value !== null) {
        searchParams.set(key, value.toString());
      }
    });

    return searchParams.toString();
  }, [params]);
};

export default useQueryParams;
