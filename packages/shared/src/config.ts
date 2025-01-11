import * as dotenv from "dotenv";

dotenv.config();

// Overloaded function signatures
export function config(envVarName: string): string;
export function config<T>(envVarName: string, parse: (value: string) => T): T;

// Implementation
export function config<T>(
    envVarName: string,
    parse?: (value: string) => T,
): T | string {
    const envVar = process.env[envVarName];
    if (envVar === undefined) {
        throw new Error(`Environment variable ${envVarName} is required`);
    }

    return parse ? parse(envVar) : envVar;
}
