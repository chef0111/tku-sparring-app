import { createContext } from 'react';

export type StandardFormData = {
  redPlayerAvatar: string | null;
  bluePlayerAvatar: string | null;
  redPlayerAvatarName: string | null;
  bluePlayerAvatarName: string | null;
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

export type FormState = {
  isDirty: boolean;
  isValid: boolean;
};

export const defaultStandardFormData: StandardFormData = {
  redPlayerAvatar: null,
  bluePlayerAvatar: null,
  redPlayerAvatarName: null,
  bluePlayerAvatarName: null,
  redPlayerName: 'PLAYER A',
  bluePlayerName: 'PLAYER B',
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
  formState: FormState;
  updateStandardForm: (data: Partial<StandardFormData>) => void;
  updateAdvancedForm: (data: Partial<AdvancedFormData>) => void;
  setFormState: (state: Partial<FormState>) => void;

  applySettings: () => void;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);
