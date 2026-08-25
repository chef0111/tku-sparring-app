import { useLayoutEffect, useSyncExternalStore } from 'react';
import { ScriptOnce } from '@tanstack/react-router';
import {
  getTheme,
  getThemeScript,
  initThemeStore,
  setTheme,
  subscribeTheme,
  syncTheme,
} from './theme-store';
import { ThemeProviderContext } from './context';
import type { Theme } from './context';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  forcedTheme?: Theme;
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  forcedTheme,
}: ThemeProviderProps) {
  useLayoutEffect(() => {
    initThemeStore(storageKey, defaultTheme, forcedTheme);
  }, [defaultTheme, storageKey, forcedTheme]);

  const theme = useSyncExternalStore(
    subscribeTheme,
    getTheme,
    () => defaultTheme
  );

  useLayoutEffect(() => {
    if ((forcedTheme ?? theme) !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (forcedTheme) syncTheme();
      else setTheme('system');
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [theme, forcedTheme]);

  return (
    <ThemeProviderContext value={{ theme, forcedTheme, setTheme }}>
      <ScriptOnce>
        {getThemeScript(storageKey, defaultTheme, forcedTheme)}
      </ScriptOnce>
      {children}
    </ThemeProviderContext>
  );
}
