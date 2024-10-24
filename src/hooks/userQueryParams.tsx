import { useMemo, useEffect } from 'react';

type QueryParams = {
  [key: string]: string | number | boolean | string[] | number[] | boolean[] | undefined | null;
};
const excludeFromUrlParams = ["limit"]; // Params to exclude from the URL but not the query string

const useQueryParams = (params: QueryParams) => {

  const queryString = useMemo(() => {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      const value = params[key];

      if (Array.isArray(value) && value.length > 0) {
        searchParams.set(key, value.join(','));
      } else if (value !== undefined && value !== null && value !== '') {
        searchParams.set(key, value.toString());
      }
    });

    return searchParams.toString();
  }, [params]);

  const filteredQueryString = useMemo(() => {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      const value = params[key];

      if (excludeFromUrlParams.includes(key)) {
        return;
      }

      if (Array.isArray(value) && value.length > 0) {
        searchParams.set(key, value.join(','));
      } else if (value !== undefined && value !== null && value !== '') {
        searchParams.set(key, value.toString());
      }
    });

    return searchParams.toString();
  }, [params]);

  useEffect(() => {
    const newUrl = filteredQueryString ? `${window.location.pathname}?${filteredQueryString}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [filteredQueryString]);

  return queryString; 
};

export default useQueryParams;
