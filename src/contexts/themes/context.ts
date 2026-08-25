import { createContext } from 'react';

export type Theme = 'dark' | 'light' | 'system';

type ThemeProviderState = {
  theme: Theme;
  forcedTheme?: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeProviderContext = createContext<ThemeProviderState | null>(
  null
);
