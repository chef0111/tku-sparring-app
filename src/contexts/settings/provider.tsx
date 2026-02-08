import { useCallback, useMemo, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useShallow } from 'zustand/react/shallow';
import { SettingsContext, defaultFormData } from './context';
import type { ReactNode } from 'react';
import type {
  AdvanceFormData,
  FormData,
  FormState,
  StandardFormData,
} from './context';
import { usePlayerStore } from '@/stores/player-store';
import { useTimerStore } from '@/stores/timer-store';
import { useMatchStore } from '@/stores/match-store';

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [formState, setFormStateInternal] = useState<FormState>({
    isDirty: false,
    isValid: true,
  });

  const setMaxHealth = usePlayerStore((s) => s.setMaxHealth);
  const resetAll = usePlayerStore((s) => s.resetAll);
  const setPlayerName = usePlayerStore((s) => s.setPlayerName);
  const setPlayerAvatar = usePlayerStore((s) => s.setPlayerAvatar);

  const { setRoundDuration, setBreakDuration, resetRoundStats } = useTimerStore(
    useShallow((s) => ({
      setRoundDuration: s.setRoundDuration,
      setBreakDuration: s.setBreakDuration,
      resetRoundStats: s.resetRoundStats,
    }))
  );
  const resetMatch = useMatchStore((s) => s.resetMatch);

  const toggleSettings = useCallback(() => setIsOpen((prev) => !prev), []);

  const updateStandardForm = useCallback((data: Partial<StandardFormData>) => {
    setFormData((prev) => ({
      ...prev,
      standard: { ...prev.standard, ...data },
    }));
  }, []);

  const updateAdvanceForm = useCallback((data: Partial<AdvanceFormData>) => {
    setFormData((prev) => ({
      ...prev,
      advanced: { ...prev.advanced, ...data },
    }));
  }, []);

  const setFormState = useCallback((state: Partial<FormState>) => {
    setFormStateInternal((prev) => ({ ...prev, ...state }));
  }, []);

  const applySettings = useCallback(() => {
    const { standard } = formData;

    if (standard.maxHealth > 0) {
      setMaxHealth(standard.maxHealth);
    }
    if (standard.roundDuration > 0) {
      setRoundDuration(standard.roundDuration * 1000);
    }
    if (standard.breakDuration > 0) {
      setBreakDuration(standard.breakDuration * 1000);
    }

    // Apply player names
    if (standard.redPlayerName) {
      setPlayerName('red', standard.redPlayerName);
    }
    if (standard.bluePlayerName) {
      setPlayerName('blue', standard.bluePlayerName);
    }

    // Apply player avatars
    if (standard.redPlayerAvatar) {
      setPlayerAvatar('red', standard.redPlayerAvatar);
    }
    if (standard.bluePlayerAvatar) {
      setPlayerAvatar('blue', standard.bluePlayerAvatar);
    }

    resetMatch();
    resetAll();
    resetRoundStats(standard.roundDuration * 1000);
    setIsOpen(false);
  }, [
    formData,
    setMaxHealth,
    setRoundDuration,
    setBreakDuration,
    setPlayerName,
    setPlayerAvatar,
    resetMatch,
    resetAll,
    resetRoundStats,
  ]);

  useHotkeys(
    'mod+comma',
    (e) => {
      e.preventDefault();
      toggleSettings();
    },
    [toggleSettings]
  );

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      toggleSettings,
      formData,
      formState,
      updateStandardForm,
      updateAdvanceForm,
      setFormState,
      applySettings,
    }),
    [
      isOpen,
      toggleSettings,
      formData,
      formState,
      updateStandardForm,
      updateAdvanceForm,
      setFormState,
      applySettings,
    ]
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
