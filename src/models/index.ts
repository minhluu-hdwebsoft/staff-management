export interface FilterParams<T> {
  q?: string;
  page: number;
  limit: number;
  queryParams?: T;
  order?: string;
}

export enum FormType {
  EDIT,
  CREATE,
  VIEW,
}
