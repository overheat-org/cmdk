export type GenericError = { type: string, value: string }

export function Ok<T>(result: T) {
    return [result, undefined] as const;
}
export function NotOk(errors: GenericError[]) {
    return [undefined, errors] as const;
}

export type ReturnController<T extends {}> = ReturnType<
    | typeof Ok<T>
    | typeof NotOk
>;
