import { useContext } from "react";
import { ThemeContext } from "@/app/providers/theme/context";

/**
 * Hook to access and control theme
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const { theme, setTheme, actualTheme } = useTheme();
 *   
 *   return (
 *     <button onClick={() => setTheme("dark")}>
 *       Current: {actualTheme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}
