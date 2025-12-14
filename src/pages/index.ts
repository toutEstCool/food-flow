/**
 * Pages Layer Public API
 *
 * Экспорт всех страниц приложения
 *
 * Пример структуры:
 *
 * pages/
 * ├── home/
 * │   ├── ui/
 * │   │   └── HomePage.tsx
 * │   └── index.ts
 * ├── product/
 * │   ├── ui/
 * │   │   └── ProductPage.tsx
 * │   └── index.ts
 * └── index.ts (этот файл)
 */

// Пример:
// export { HomePage } from './home';
// export { ProductPage } from './product';
// export { CartPage } from './cart';


export { HomePage } from './home'
export { FavoritesPage } from './favorites'
export { ProfilePage } from './profile'