# Feature Sliced Design (FSD) Architecture

Этот проект использует архитектуру **Feature Sliced Design** для обеспечения масштабируемости и поддерживаемости кода.

## 📁 Структура проекта

```
src/
├── app/                    # Инициализация приложения
│   ├── providers/          # Провайдеры (Theme, Auth, Query и т.д.)
│   └── styles/            # Глобальные стили
│
├── pages/                  # Страницы приложения (композиция виджетов)
│   └── [page-name]/
│       ├── ui/            # UI компоненты страницы
│       └── index.ts       # Public API
│
├── widgets/               # Независимые блоки (Header, Sidebar и т.д.)
│   └── [widget-name]/
│       ├── ui/            # UI компоненты виджета
│       ├── model/         # Бизнес-логика виджета
│       └── index.ts       # Public API
│
├── features/              # Фичи (взаимодействия пользователя)
│   └── [feature-name]/
│       ├── ui/            # UI компоненты фичи
│       ├── model/         # Бизнес-логика фичи
│       ├── api/           # API запросы фичи
│       └── index.ts       # Public API
│
├── entities/              # Бизнес-сущности (User, Product и т.д.)
│   └── [entity-name]/
│       ├── ui/            # UI компоненты сущности
│       ├── model/         # Модели и типы
│       ├── api/           # API запросы
│       └── index.ts       # Public API
│
└── shared/                # Переиспользуемый код
    ├── ui/                # UI компоненты (Button, Input и т.д.)
    ├── lib/               # Утилиты
    ├── hooks/             # Общие хуки
    ├── config/            # Конфигурация
    ├── types/             # TypeScript типы
    └── assets/            # Статические файлы
```

## 🎯 Слои FSD

### App Layer (слой приложения)
- Инициализация провайдеров
- Глобальные стили
- Роутинг приложения

**Пример:** `src/app/providers/theme/ThemeProvider.tsx`

### Pages Layer (слой страниц)
- Композиция виджетов
- Специфичная логика страницы
- Роуты

**Пример структуры:**
```typescript
// src/pages/home/index.ts
export { HomePage } from './ui/HomePage';
```

### Widgets Layer (слой виджетов)
- Самостоятельные UI блоки
- Header, Footer, Sidebar
- Могут использовать features и entities

**Пример структуры:**
```typescript
// src/widgets/header/index.ts
export { Header } from './ui/Header';
```

### Features Layer (слой фич)
- Функциональность с пользовательским взаимодействием
- Формы, кнопки действий
- Могут использовать entities

**Пример структуры:**
```typescript
// src/features/auth/login/
├── ui/
│   └── LoginForm.tsx
├── model/
│   └── useLogin.ts
├── api/
│   └── loginApi.ts
└── index.ts
```

### Entities Layer (слой сущностей)
- Бизнес-сущности приложения
- User, Product, Order и т.д.
- Модели данных и API

**Пример структуры:**
```typescript
// src/entities/user/
├── ui/
│   └── UserCard.tsx
├── model/
│   └── types.ts
├── api/
│   └── userApi.ts
└── index.ts
```

### Shared Layer (слой shared)
- Переиспользуемый код
- UI Kit, утилиты, хуки
- Не зависит от бизнес-логики

**Пример использования:**
```typescript
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib';
import { useTheme } from '@/shared/hooks';
```

## 🔗 Правила импортов

### Public API (index.ts)
Каждый слайс должен экспортировать свой Public API:

```typescript
// ❌ Плохо
import { LoginForm } from '@/features/auth/login/ui/LoginForm';

// ✅ Хорошо
import { LoginForm } from '@/features/auth/login';
```

### Правило зависимостей
Слои могут импортировать только из нижележащих слоев:

```
app → pages → widgets → features → entities → shared
```

```typescript
// ✅ Разрешено
// features может использовать entities
import { UserCard } from '@/entities/user';

// ❌ Запрещено
// entities не может использовать features
import { LoginForm } from '@/features/auth/login';
```

## 🎨 Система темизации

### Использование хука useTheme

```typescript
import { useTheme } from '@/shared/hooks';

function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {actualTheme}
    </button>
  );
}
```

### CSS переменные

Все CSS переменные доступны через Tailwind:

```typescript
// Цвета
<div className="bg-background text-foreground" />
<div className="bg-primary text-primary-foreground" />

// Spacing
<div className="p-4 m-2" /> // используйте стандартные Tailwind классы

// Radius
<div className="rounded-lg" /> // var(--radius-lg)
```

### Кастомные CSS переменные

```css
/* Прямое использование */
.my-component {
  color: rgb(var(--color-brand-500));
  padding: var(--space-4);
  border-radius: var(--radius-lg);
}
```

## 📦 Примеры использования

### Создание новой страницы

```bash
mkdir -p src/pages/home/ui
```

```typescript
// src/pages/home/ui/HomePage.tsx
import { Header } from '@/widgets/header';
import { ProductList } from '@/widgets/product-list';

export function HomePage() {
  return (
    <div>
      <Header />
      <main className="container">
        <ProductList />
      </main>
    </div>
  );
}
```

```typescript
// src/pages/home/index.ts
export { HomePage } from './ui/HomePage';
```

### Создание новой фичи

```bash
mkdir -p src/features/add-to-cart/{ui,model,api}
```

```typescript
// src/features/add-to-cart/ui/AddToCartButton.tsx
import { Button } from '@/shared/ui';
import { useAddToCart } from '../model/useAddToCart';

interface AddToCartButtonProps {
  productId: string;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart, isLoading } = useAddToCart();

  return (
    <Button 
      onClick={() => addToCart(productId)}
      disabled={isLoading}
    >
      Add to Cart
    </Button>
  );
}
```

### Создание UI компонента

```bash
mkdir -p src/shared/ui/button
```

```typescript
// src/shared/ui/button/Button.tsx
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/lib';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-lg font-medium transition-colors focus-ring',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'border border-border hover:bg-accent': variant === 'outline',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
```

## 🚀 Начало работы

1. **Определите, что создаете:**
   - Страница? → `pages/`
   - Виджет? → `widgets/`
   - Фича? → `features/`
   - Сущность? → `entities/`
   - UI компонент? → `shared/ui/`

2. **Создайте структуру папок**

3. **Создайте компоненты**

4. **Экспортируйте через index.ts**

5. **Используйте в других слоях**

## 📚 Дополнительные ресурсы

- [FSD Documentation](https://feature-sliced.design/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
