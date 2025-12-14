# 🎓 Примеры кода FSD

Практические примеры использования Feature Sliced Design архитектуры.

## 📄 Пример 1: Создание страницы профиля

### Структура
```
src/pages/profile/
├── ui/
│   ├── ProfilePage.tsx
│   └── ProfileSkeleton.tsx
└── index.ts
```

### Код

```typescript
// src/pages/profile/ui/ProfilePage.tsx
import { UserProfile } from '@/widgets/user-profile';
import { UserSettings } from '@/widgets/user-settings';

export function ProfilePage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Профиль</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserProfile />
        </div>
        <div>
          <UserSettings />
        </div>
      </div>
    </div>
  );
}
```

```typescript
// src/pages/profile/index.ts
export { ProfilePage } from './ui/ProfilePage';
```

## 🧩 Пример 2: Создание виджета

### Структура
```
src/widgets/user-profile/
├── ui/
│   └── UserProfile.tsx
├── model/
│   └── useUserProfile.ts
└── index.ts
```

### Код

```typescript
// src/widgets/user-profile/model/useUserProfile.ts
import { useState, useEffect } from 'react';
import type { User } from '@/entities/user';

export function useUserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      // API call here
      const data = await fetch('/api/user').then(r => r.json());
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { user, isLoading };
}
```

```typescript
// src/widgets/user-profile/ui/UserProfile.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { UserAvatar } from '@/entities/user';
import { useUserProfile } from '../model/useUserProfile';

export function UserProfile() {
  const { user, isLoading } = useUserProfile();

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о пользователе</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <UserAvatar user={user} size="lg" />
          <div>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

```typescript
// src/widgets/user-profile/index.ts
export { UserProfile } from './ui/UserProfile';
```

## ⚡ Пример 3: Создание фичи авторизации

### Структура
```
src/features/auth/login/
├── ui/
│   ├── LoginForm.tsx
│   └── LoginButton.tsx
├── model/
│   ├── useLogin.ts
│   └── types.ts
├── api/
│   └── loginApi.ts
└── index.ts
```

### Код

```typescript
// src/features/auth/login/model/types.ts
export interface LoginCredentials {
  phone: string;
  code: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    phone: string;
  };
}
```

```typescript
// src/features/auth/login/api/loginApi.ts
import { apiConfig } from '@/shared/config';
import type { LoginCredentials, LoginResponse } from '../model/types';

export const loginApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.auth.login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },
};
```

```typescript
// src/features/auth/login/model/useLogin.ts
import { useState } from 'react';
import { loginApi } from '../api/loginApi';
import type { LoginCredentials } from './types';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await loginApi.login(credentials);
      
      // Save token
      localStorage.setItem('token', response.token);
      
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
```

```typescript
// src/features/auth/login/ui/LoginForm.tsx
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { useLogin } from '../model/useLogin';

export function LoginForm() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login({ phone, code });
      // Redirect or update state
    } catch (err) {
      // Error handled in useLogin
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Вход в аккаунт</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="tel"
              placeholder="+7 (999) 123-45-67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div>
            <Input
              type="text"
              placeholder="Код из SMS"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-sm text-destructive">{error}</div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

```typescript
// src/features/auth/login/index.ts
export { LoginForm } from './ui/LoginForm';
export { useLogin } from './model/useLogin';
export type { LoginCredentials } from './model/types';
```

## 📦 Пример 4: Создание сущности (Entity)

### Структура
```
src/entities/user/
├── ui/
│   ├── UserCard.tsx
│   └── UserAvatar.tsx
├── model/
│   └── types.ts
├── api/
│   └── userApi.ts
└── index.ts
```

### Код

```typescript
// src/entities/user/model/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: string;
}
```

```typescript
// src/entities/user/api/userApi.ts
import { apiConfig } from '@/shared/config';
import type { User } from '../model/types';

export const userApi = {
  getById: async (id: string): Promise<User> => {
    const response = await fetch(`${apiConfig.baseUrl}/users/${id}`);
    return response.json();
  },

  getMe: async (): Promise<User> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.auth.me}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
```

```typescript
// src/entities/user/ui/UserAvatar.tsx
import { cn } from '@/shared/lib';
import type { User } from '../model/types';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function UserAvatar({ user, size = 'md', className }: UserAvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={cn(
        'rounded-full bg-primary text-primary-foreground flex-center font-semibold',
        sizes[size],
        className
      )}
    >
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} className="rounded-full" />
      ) : (
        initials
      )}
    </div>
  );
}
```

```typescript
// src/entities/user/ui/UserCard.tsx
import { Card, CardContent } from '@/shared/ui/card';
import { UserAvatar } from './UserAvatar';
import type { User } from '../model/types';

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <Card 
      className={cn('card-hover', onClick && 'cursor-pointer')}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <UserAvatar user={user} />
        <div className="flex-1">
          <h4 className="font-semibold">{user.name}</h4>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
```

```typescript
// src/entities/user/index.ts
export { UserCard } from './ui/UserCard';
export { UserAvatar } from './ui/UserAvatar';
export { userApi } from './api/userApi';
export type { User } from './model/types';
```

## 🎨 Пример 5: Создание UI компонента

### Структура
```
src/shared/ui/loading-spinner/
├── LoadingSpinner.tsx
└── index.ts
```

### Код

```typescript
// src/shared/ui/loading-spinner/LoadingSpinner.tsx
import { cn } from '@/shared/lib';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-primary border-t-transparent',
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
```

```typescript
// src/shared/ui/loading-spinner/index.ts
export { LoadingSpinner } from './LoadingSpinner';
```

## 🔌 Пример 6: Создание хука

### Код

```typescript
// src/shared/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

```typescript
// src/shared/hooks/index.ts
export { useTheme } from './useTheme';
export { useLocalStorage } from './useLocalStorage';
```

## 🚀 Использование

```typescript
// В вашем компоненте
import { ProfilePage } from '@/pages/profile';
import { LoginForm } from '@/features/auth/login';
import { UserCard } from '@/entities/user';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import { useLocalStorage } from '@/shared/hooks';

function App() {
  const [token] = useLocalStorage('token', null);

  return token ? <ProfilePage /> : <LoginForm />;
}
```
