export const cleanObject = <T>(obj: T) => {
  const resultObj = {} as T;

  for (const key in obj) {
    // check Truthy value
    if (obj[key]) {
      resultObj[key] = obj[key];
    }
  }

  return resultObj;
};
