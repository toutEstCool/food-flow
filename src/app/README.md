# App Layer

Слой инициализации приложения.

## 📁 Структура

- `providers/` - React провайдеры (Theme, Auth, Query, Router и т.д.)
- `styles/` - Глобальные стили приложения

## 🎯 Назначение

- Инициализация провайдеров
- Глобальные стили и темы
- Настройка роутинга
- Конфигурация приложения

## 📦 Примеры

### Провайдеры

```typescript
// app/providers/index.tsx
import { ThemeProvider } from './theme';
import { QueryProvider } from './query';

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
}
```

### Использование в main.tsx

```typescript
import { Providers } from '@/app/providers';
import '@/app/styles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <App />
  </Providers>
);
```
