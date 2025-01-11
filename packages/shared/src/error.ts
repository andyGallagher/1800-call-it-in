export function unreachableCaseError(value: never): Error;
export function unreachableCaseError(value: never, error: string): Error;
export function unreachableCaseError<E extends Error>(
    value: never,
    error: E
): E;
export function unreachableCaseError(
    value: never,
    error?: string | Error
): Error {
    if (!error) {
        return new Error(`Unreachable case: ${value}`);
    } else if (typeof error === "string") {
        return new Error(error);
    } else {
        return error;
    }
}
