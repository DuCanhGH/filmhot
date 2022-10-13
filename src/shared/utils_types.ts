export type RequireFields<T, U extends keyof T> = T & Required<Pick<T, U>>;
