import {ProxyResult} from "aws-lambda";

export function stringify(value: unknown): string {
    switch (typeof value) {
        case 'string':
        case 'object':
            return JSON.stringify(value);
        default:
            return String(value);
    }
}

export function respondJson(statusCode: number, body: unknown): ProxyResult {
    return {
        statusCode,
        body: stringify(body)
    }
}
