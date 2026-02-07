import { createContext } from 'react';

type SettingsContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleSettings: () => void;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);
