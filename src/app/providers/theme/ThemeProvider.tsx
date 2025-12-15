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
    // Track system preference
    const [isSystemDark, setIsSystemDark] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e: MediaQueryListEvent) => {
            setIsSystemDark(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // Determine actual theme (resolve "system" to "light" or "dark")
    const actualTheme =
        theme === "system" ? (isSystemDark ? "dark" : "light") : theme;

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
