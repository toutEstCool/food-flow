# Shared Layer

Переиспользуемый код, не зависящий от бизнес-логики.

## 📁 Структура

- `ui/` - UI компоненты (Button, Input, Card и т.д.)
- `lib/` - Утилиты и вспомогательные функции
- `hooks/` - React хуки
- `config/` - Конфигурационные файлы
- `types/` - TypeScript типы
- `assets/` - Статические файлы (иконки, изображения, шрифты)

## 🎯 Назначение

- Базовые UI компоненты
- Утилиты и хелперы
- Общие хуки
- Типы TypeScript
- Константы и конфигурация

## 📦 Примеры использования

### UI Components (с shadcn/ui)

```bash
# Установка компонента через shadcn/ui CLI
npx shadcn@latest add button
```

Компонент автоматически установится в `src/shared/ui/`

```typescript
import { Button } from '@/shared/ui';

function MyComponent() {
  return <Button>Click me</Button>;
}
```

### Hooks

```typescript
import { useTheme } from '@/shared/hooks';

function Component() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme('dark')}>Toggle</button>;
}
```

### Utils

```typescript
import { cn } from '@/shared/lib';

const className = cn('base-class', condition && 'conditional-class');
```

### Config

```typescript
import { appConfig, apiConfig } from '@/shared/config';

console.log(appConfig.name); // "FoodFlow"
console.log(apiConfig.baseUrl); // API URL
```
