import { FilterParams } from "models";
import queryString from "query-string";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cleanObject, flattenObj } from "utils/helper";

export const useQueryParams = <T>() => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = useMemo(() => {
    const urlQuery = queryString.parse(location.search) as unknown as FilterParams<unknown>;
    const { q, page, limit, order, ...extendParams } = urlQuery;
    return {
      q,
      page,
      limit,
      order,
      queryParams: { ...extendParams },
    } as unknown as T;
  }, [location.search]);

  const updateParams = (filter: T) => {
    const cleanedFilter = cleanObject(flattenObj(filter));
    navigate({
      search: queryString.stringify(cleanedFilter),
    });
  };

  return { query, updateParams };
};
