export const notImplemented: any = () => {
    throw new Error("Not implemented 🫠");
};

export const notInitialized: any = () => {
    throw new Error("Not initialized 🫠");
};

export const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export function assert(value: boolean, message: string = ""): asserts value {
    if (!value) {
        throw new Error(`assertion failed${message ? `: ${message}` : ""}`);
    }
}
