export declare abstract class CustomError extends Error {
    message: string;
    abstract statusCode: number;
    constructor(message: string);
    abstract serializeError(): {
        message: string;
        field?: string;
    }[];
}
