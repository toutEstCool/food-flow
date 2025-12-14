import { useTheme } from '@/shared/hooks';

function App() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-8">
        <div className="fade-in">
          <h1 className="text-4xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            FoodFlow
          </h1>
          <p className="text-muted-foreground mb-6">
            Проект настроен по архитектуре Feature Sliced Design
          </p>

          <div className="card p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Theme System</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`px-4 py-2 rounded-lg transition-colors ${theme === 'light'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-4 py-2 rounded-lg transition-colors ${theme === 'dark'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`px-4 py-2 rounded-lg transition-colors ${theme === 'system'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
              >
                System
              </button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Current theme: <span className="font-semibold">{actualTheme}</span>
            </p>
          </div>

          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Следующие шаги:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>Изучите <code className="text-foreground">FSD_GUIDE.md</code> для понимания архитектуры</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>Установите UI компоненты через shadcn/ui CLI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>Начните создавать компоненты в соответствующих слоях</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>Используйте CSS переменные и утилиты из <code className="text-foreground">app/styles/</code></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
