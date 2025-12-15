/**
 * Features Layer Public API
 *
 * Экспорт всех фич приложения
 *
 * Пример структуры:
 *
 * features/
 * ├── auth/
 * │   ├── login/
 * │   │   ├── ui/
 * │   │   ├── model/
 * │   │   ├── api/
 * │   │   └── index.ts
 * │   └── register/
 * ├── cart/
 * │   ├── add-to-cart/
 * │   └── remove-from-cart/
 * └── index.ts (этот файл)
 */

// Пример:
// export * from './auth/login';
// export * from './auth/register';
// export * from './cart/add-to-cart';

export { SearchOverlay } from './search';