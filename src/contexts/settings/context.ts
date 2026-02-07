import { createContext } from 'react';

export type StandardFormData = {
  redPlayerAvatar: string | null;
  bluePlayerAvatar: string | null;
  redPlayerName: string;
  bluePlayerName: string;
  roundDuration: number;
  breakDuration: number;
  maxHealth: number;
};

export type AdvancedFormData = {
  roundDuration: number;
  breakDuration: number;
  maxHealth: number;
};

export type FormData = {
  standard: StandardFormData;
  advanced: AdvancedFormData;
};

export const defaultStandardFormData: StandardFormData = {
  redPlayerAvatar: null,
  bluePlayerAvatar: null,
  redPlayerName: '',
  bluePlayerName: '',
  roundDuration: 60,
  breakDuration: 30,
  maxHealth: 120,
};

export const defaultAdvancedFormData: AdvancedFormData = {
  roundDuration: 60,
  breakDuration: 30,
  maxHealth: 120,
};

export const defaultFormData: FormData = {
  standard: defaultStandardFormData,
  advanced: defaultAdvancedFormData,
};

type SettingsContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleSettings: () => void;

  formData: FormData;
  updateStandardForm: (data: Partial<StandardFormData>) => void;
  updateAdvancedForm: (data: Partial<AdvancedFormData>) => void;

  applySettings: () => void;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);
