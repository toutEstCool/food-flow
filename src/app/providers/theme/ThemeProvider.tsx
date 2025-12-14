import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "./context";
import type { Theme } from "./types";

const STORAGE_KEY = "foodflow-theme";

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window === "undefined") return defaultTheme;

        try {
            const stored = localStorage.getItem(storageKey);
            return (stored as Theme) || defaultTheme;
        } catch {
            return defaultTheme;
        }
    });

    // Determine actual theme (resolve "system" to "light" or "dark")
    const [actualTheme, setActualTheme] = useState<Exclude<Theme, "system">>(
        () => {
            if (theme === "telegram") return "telegram";
            if (theme === "system") {
                return window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light";
            }
            return theme;
        }
    );

    // Listen to system theme changes
    useEffect(() => {
        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e: MediaQueryListEvent) => {
            setActualTheme(e.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    // Update actual theme when theme changes
    useEffect(() => {
        if (theme === "telegram") {
            setActualTheme("telegram");
        } else if (theme === "system") {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setActualTheme(isDark ? "dark" : "light");
        } else {
            setActualTheme(theme);
        }
    }, [theme]);

    // Apply theme to DOM
    useEffect(() => {
        const root = window.document.documentElement;

        // Remove all theme attributes
        root.removeAttribute("data-theme");
        root.classList.remove("light", "dark");

        // Apply new theme
        if (actualTheme === "telegram") {
            root.setAttribute("data-theme", "telegram");
        } else {
            root.setAttribute("data-theme", actualTheme);
            root.classList.add(actualTheme);
        }
    }, [actualTheme]);

    // Update theme and persist to storage
    const setTheme = (newTheme: Theme) => {
        try {
            localStorage.setItem(storageKey, newTheme);
        } catch (error) {
            console.error("Failed to save theme to localStorage:", error);
        }
        setThemeState(newTheme);
    };

    const value = {
        theme,
        setTheme,
        actualTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
