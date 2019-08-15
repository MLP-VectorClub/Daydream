export type Nullable<T> = T | null;
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface ObjectOf<T> {
  [key: string]: T;
}

export interface Environment {
  production: boolean;
  backendDomain: string;
}

export interface PaginationItem {
  label: string;
  queryParams?: ObjectOf<string>;
  pageNumber: Nullable<number>;
}
