import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { cleanObject } from "utils/helper";

export const useQueryParams = <T>() => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = queryString.parse(location.search) as unknown as T;

  const updateParams = (filter: T) => {
    const cleanedFilter = cleanObject<T>(filter);
    console.log("🚀 Minh =====>  ~ file: useQueryParams.ts ~ line 12 ~ cleanedFilter", cleanedFilter);
    navigate({
      search: queryString.stringify(cleanedFilter),
    });
  };

  return { query, updateParams };
};
