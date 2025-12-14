/**
 * Common TypeScript types and interfaces
 */

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// ID Types
export type ID = string | number;
export type UUID = string;

// Function Types
export type VoidFunction = () => void;
export type AsyncVoidFunction = () => Promise<void>;
export type Callback<T = void> = (value: T) => void;
export type AsyncCallback<T = void> = (value: T) => Promise<void>;

// Component Types
export type PropsWithClassName<P = unknown> = P & {
    className?: string;
};

export type PropsWithChildren<P = unknown> = P & {
    children?: React.ReactNode;
};

// API Response Types
export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
    success: boolean;
}

export interface ApiError {
    message: string;
    code?: string;
    details?: unknown;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}

// Form Types
export type FormErrors<T> = {
    [K in keyof T]?: string;
};

export interface FormState<T> {
    values: T;
    errors: FormErrors<T>;
    isSubmitting: boolean;
    isValid: boolean;
}

// Loading States
export type LoadingStatus = "idle" | "loading" | "success" | "error";

export interface AsyncState<T, E = ApiError> {
    data: Nullable<T>;
    error: Nullable<E>;
    status: LoadingStatus;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}
