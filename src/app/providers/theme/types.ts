export type Theme = "dark" | "light" | "system" | "telegram";

export interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    actualTheme: Exclude<Theme, "system">;
}
