import { ZodSchema } from "zod";

const BASE_API_URL: string = import.meta.env.VITE_API_URL;

const joinUrls = (baseUrl: string, relativeUrl: string): string => {
    if (!baseUrl.endsWith("/")) {
        baseUrl += "/";
    }
    if (relativeUrl.startsWith("/")) {
        relativeUrl = relativeUrl.substring(1);
    }
    if (relativeUrl.endsWith("/")) {
        relativeUrl = relativeUrl.slice(0, -1);
    }
    return baseUrl + relativeUrl;
};

const fetchWrapper = async <T, B>(
    relativeUrl: string,
    method: string,
    schemas: {
        input?: ZodSchema<B>;
        output: ZodSchema<T>;
    },
    body?: B,
): Promise<T> => {
    if (schemas.input) {
        if (!body) {
            throw new Error("fetch: body is required");
        }

        const input = schemas.input.safeParse(body);
        if (!input.success) {
            throw new Error("fetch: input validation failed");
        }
    }

    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    };

    const url = joinUrls(BASE_API_URL, relativeUrl);
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`fetch: HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const parsed = schemas.output.safeParse(data);

    if (!parsed.success) {
        throw new Error("fetch: output validation failed");
    }

    return parsed.data;
};

export { fetchWrapper as fetch };
