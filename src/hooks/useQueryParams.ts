import queryString from "query-string";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cleanObject } from "utils/helper";

export const useQueryParams = <T>() => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useMemo(() => queryString.parse(location.search) as unknown as T, [location.search]);

  const updateParams = (filter: T) => {
    const cleanedFilter = cleanObject<T>(filter);
    navigate({
      search: queryString.stringify(cleanedFilter),
    });
  };

  return { query, updateParams };
};
