export type Shape<T> = { [P in keyof T]: T[P] }
