export type Nullable<T> = T | null;
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface Environment {
  production: boolean;
  backendDomain: string;
}
