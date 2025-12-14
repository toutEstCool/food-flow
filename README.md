# 🍕 FoodFlow - Feature Sliced Design Architecture

Проект **FoodFlow** настроен по современной архитектуре **Feature Sliced Design (FSD)** с полной интеграцией **Tailwind CSS 4**, **shadcn/ui** и системой темизации.

## 🎯 Что уже настроено

### ✅ Архитектура FSD
- ✨ Полная структура слоев (app, pages, widgets, features, entities, shared)
- ✨ Path aliases для всех слоев (@/app, @/pages, @/widgets и т.д.)
- ✨ Public API для каждого слоя
- ✨ README документация для каждого слоя

### ✅ Система стилей
- 🎨 Tailwind CSS 4 с полной настройкой
- 🎨 CSS переменные для цветов, отступов, размеров
- 🎨 Темы: Light, Dark, System, Telegram Mini App
- 🎨 Система анимаций и transitions
- 🎨 Утилитарные классы (glassmorphism, gradients и т.д.)

### ✅ Провайдеры
- 🔧 ThemeProvider с localStorage
- 🔧 Автоматическое определение системной темы
- 🔧 Поддержка Telegram Mini App

### ✅ Хуки и утилиты
- ⚡ useTheme() - управление темой
- ⚡ cn() - утилита для объединения классов

### ✅ Конфигурация
- 📝 TypeScript настроен с path aliases
- 📝 Vite настроен с FSD путями
- 📝 shadcn/ui готов к использованию
- 📝 ESLint настроен

### ✅ Типизация
- 📘 Базовые TypeScript типы
- 📘 Environment variables типы
- 📘 Utility types

## 📁 Структура проекта

```
src/
├── app/                      # 🚀 Слой приложения
│   ├── providers/
│   │   ├── theme/           # Theme Provider
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── context.tsx
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── styles/              # Глобальные стили
│       ├── index.css        # Entry point
│       ├── variables.css    # CSS переменные
│       ├── themes.css       # Темы (light/dark/telegram)
│       ├── base.css         # Базовые стили
│       ├── utils.css        # Утилиты
│       └── animations.css   # Анимации
│
├── pages/                   # 📄 Страницы
│   └── index.ts
│
├── widgets/                 # 🧩 Виджеты
│   └── index.ts
│
├── features/                # ⚡ Фичи
│   └── index.ts
│
├── entities/                # 📦 Сущности
│   └── index.ts
│
├── shared/                  # 🎨 Общий код
│   ├── ui/                  # UI компоненты (shadcn/ui)
│   │   └── index.ts
│   ├── lib/                 # Утилиты
│   │   └── utils/
│   │       ├── cn.ts
│   │       └── index.ts
│   ├── hooks/               # React хуки
│   │   ├── useTheme.ts
│   │   └── index.ts
│   ├── config/              # Конфигурация
│   │   ├── app.ts
│   │   ├── api.ts
│   │   └── index.ts
│   ├── types/               # TypeScript типы
│   │   ├── common.ts
│   │   └── index.ts
│   └── assets/              # Статические файлы
│       ├── fonts/
│       ├── images/
│       └── icons/
│
├── App.tsx                  # Main App компонент
├── main.tsx                 # Entry point
└── vite-env.d.ts           # Vite types
```

## 🚀 Быстрый старт

### 1. Запуск проекта

```bash
# Development сервер
pnpm dev

# Build
pnpm build

# Preview production build
pnpm preview
```

### 2. Установка UI компонентов

```bash
# Основные компоненты
npx shadcn@latest add button input card dialog

# Все компоненты устанавливаются в src/shared/ui/
```

Подробнее: **[SHADCN_SETUP.md](./SHADCN_SETUP.md)**

### 3. Создание нового компонента

#### Пример: Создание страницы

```bash
mkdir -p src/pages/home/ui
```

```typescript
// src/pages/home/ui/HomePage.tsx
export function HomePage() {
  return (
    <div className="container">
      <h1>Home Page</h1>
    </div>
  );
}

// src/pages/home/index.ts
export { HomePage } from './ui/HomePage';
```

#### Пример: Создание фичи

```bash
mkdir -p src/features/auth/login/{ui,model,api}
```

```typescript
// src/features/auth/login/ui/LoginForm.tsx
import { Button, Input } from '@/shared/ui';

export function LoginForm() {
  return (
    <form className="space-y-4">
      <Input placeholder="Phone number" />
      <Button>Login</Button>
    </form>
  );
}

// src/features/auth/login/index.ts
export { LoginForm } from './ui/LoginForm';
```

## 🎨 Использование темизации

```typescript
import { useTheme } from '@/shared/hooks';

function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <button onClick={() => setTheme('dark')}>
      Switch to Dark (Current: {actualTheme})
    </button>
  );
}
```

## 💅 Использование стилей

### CSS переменные

```typescript
// Tailwind классы с темой
<div className="bg-background text-foreground" />
<div className="bg-primary text-primary-foreground" />
<div className="bg-card border border-border" />

// Утилитарные классы
<div className="glass p-4 rounded-lg" />           // Glassmorphism
<div className="gradient-primary" />                // Gradient
<div className="flex-center" />                     // Flex center
<div className="card-hover" />                      // Card with hover
```

### Кастомные CSS переменные

```css
.my-component {
  /* Цвета */
  color: rgb(var(--color-brand-500));
  
  /* Отступы */
  padding: var(--space-4);
  margin: var(--space-2);
  
  /* Радиусы */
  border-radius: var(--radius-lg);
  
  /* Тени */
  box-shadow: var(--shadow-md);
  
  /* Переходы */
  transition: var(--transition-all);
}
```

### Анимации

```typescript
<div className="fade-in">Появится с fade эффектом</div>
<div className="slide-up">Выедет снизу</div>
<div className="scale-in">Увеличится</div>
```

## 📚 Документация

- **[FSD_GUIDE.md](./FSD_GUIDE.md)** - Полное руководство по FSD архитектуре
- **[SHADCN_SETUP.md](./SHADCN_SETUP.md)** - Установка и использование shadcn/ui
- **[src/app/README.md](./src/app/README.md)** - App layer
- **[src/shared/README.md](./src/shared/README.md)** - Shared layer

## 🎯 Основные принципы

### 1. Public API
Каждый модуль экспортирует только необходимое через `index.ts`:

```typescript
// ✅ Хорошо
import { LoginForm } from '@/features/auth/login';

// ❌ Плохо
import { LoginForm } from '@/features/auth/login/ui/LoginForm';
```

### 2. Зависимости между слоями
```
app → pages → widgets → features → entities → shared
```

### 3. Изоляция
- Каждый модуль независим
- Минимум зависимостей
- Четкие границы ответственности

## 🛠 Environment Variables

```bash
# Создайте .env.local на основе .env.example
cp .env.example .env.local

# Отредактируйте переменные
VITE_API_BASE_URL=your-api-url
```

## 📦 Технологии

- **React 19** - UI библиотека
- **TypeScript 5.9** - Типизация
- **Vite (Rolldown)** - Сборщик
- **Tailwind CSS 4** - Стили
- **shadcn/ui** - UI компоненты
- **Feature Sliced Design** - Архитектура

## 🎉 Готово к работе!

Проект полностью настроен и готов к разработке. Начните с:

1. ✨ Изучения **FSD_GUIDE.md**
2. 🎨 Установки нужных UI компонентов из shadcn/ui
3. 🚀 Создания первой страницы или фичи
4. 💅 Использования системы стилей и тем

**Удачи в разработке! 🚀**
