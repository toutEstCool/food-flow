/**
 * API Configuration
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const apiConfig = {
    baseUrl: API_BASE_URL,
    timeout: 30000,
    endpoints: {
        auth: {
            login: "/auth/login",
            logout: "/auth/logout",
            refresh: "/auth/refresh",
            me: "/auth/me",
        },
        // Add more endpoints here as needed
    },
} as const;
