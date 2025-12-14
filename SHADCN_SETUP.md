# Установка и использование shadcn/ui компонентов

## 🎨 Использование shadcn/ui CLI

shadcn/ui уже настроен в вашем проекте! Все компоненты будут автоматически устанавливаться в `src/shared/ui/`.

### Установка компонентов

```bash
# Установить Button
npx shadcn@latest add button

# Установить Input
npx shadcn@latest add input

# Установить Card
npx shadcn@latest add card

# Установить Dialog (Modal)
npx shadcn@latest add dialog

# Установить Form
npx shadcn@latest add form

# Установить несколько компонентов сразу
npx shadcn@latest add button input card dialog
```

### Список полезных компонентов для начала

```bash
# Основные UI компоненты
npx shadcn@latest add button input textarea label select checkbox radio-group switch

# Формы и валидация
npx shadcn@latest add form

# Модальные окна и диалоги
npx shadcn@latest add dialog alert-dialog sheet

# Навигация
npx shadcn@latest add dropdown-menu navigation-menu tabs

# Отображение данных
npx shadcn@latest add card table badge avatar

# Feedback компоненты
npx shadcn@latest add toast alert skeleton progress

# Layout
npx shadcn@latest add separator scroll-area
```

## 📦 Использование установленных компонентов

После установки компоненты автоматически добавятся в `src/shared/ui/` и будут доступны для импорта:

```typescript
// Импорт отдельных компонентов
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';

// Или через barrel export (после добавления в src/shared/ui/index.ts)
import { Button, Input, Card } from '@/shared/ui';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## 🎨 Кастомизация компонентов

Все компоненты используют CSS переменные из вашей темы:

```typescript
// Варианты кнопок
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Размеры
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

## 🔧 Настройка экспорта

После установки компонентов, добавьте их в `src/shared/ui/index.ts`:

```typescript
// src/shared/ui/index.ts
export { Button } from './button';
export { Input } from './input';
export { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from './card';
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './dialog';
// ... и так далее
```

Это позволит использовать более короткие импорты:

```typescript
// Вместо
import { Button } from '@/shared/ui/button';

// Можно
import { Button } from '@/shared/ui';
```

## 📚 Полезные ссылки

- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [shadcn/ui CLI](https://ui.shadcn.com/docs/cli)
- [Tailwind CSS](https://tailwindcss.com/docs)
