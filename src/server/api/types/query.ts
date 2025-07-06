export type QueryManyFields<T> = Record<keyof T, unknown>;

export type QueryManyReturnType<T> = {
  data: T[];
  count: number;
};
