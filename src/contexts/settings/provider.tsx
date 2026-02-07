import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { SettingsContext } from './context';
import type { ReactNode } from 'react';

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSettings = () => setIsOpen((prev) => !prev);

  useHotkeys(
    'mod+comma',
    (e) => {
      e.preventDefault();
      toggleSettings();
    },
    [toggleSettings]
  );

  return (
    <SettingsContext.Provider value={{ isOpen, setIsOpen, toggleSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
