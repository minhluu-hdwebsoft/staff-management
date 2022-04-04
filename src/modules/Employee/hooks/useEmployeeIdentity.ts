import api from "api";
import { useRef, useState } from "react";

export const useEmployeeIdentity = (defaultCode: string) => {
  const [genarating, setGenarating] = useState(false);
  const code = useRef<string>(defaultCode);

  const getCode = async () => {
    setGenarating(true);
    code.current = await api.hr.employee.identity();
    setGenarating(false);
  };

  return {
    genarating,
    code: code.current,
    getCode,
  };
};
