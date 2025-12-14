/// <reference types="vite/client" />

// CSS Module Type Declarations
declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}

declare module '@/app/styles' {
    const content: void;
    export default content;
}

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // Добавьте здесь другие переменные окружения
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
