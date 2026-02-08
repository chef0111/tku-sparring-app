import { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Healthbar } from './healthbar';
import { Manabar } from './manabar';
import { PlayerAvatar } from './player-avatar';
import { usePlayerStore } from '@/stores/player-store';
import { useDeclareWinner } from '@/hooks/use-winner';
import { isCriticalHit } from '@/lib/scoreboard/hit-types';

export const AppHUD = () => {
  return (
    <section className="flex h-[14vh] w-full max-w-screen items-center justify-between">
      <RedPlayerHUD />
      <BluePlayerHUD />
    </section>
  );
};

export const RedPlayerHUD = () => {
  const { health, mana, name, avatar } = usePlayerStore(
    useShallow((s) => ({
      health: s.red.health,
      mana: s.red.mana,
      name: s.red.name,
      avatar: s.red.avatar,
    }))
  );
  const maxHealth = usePlayerStore((s) => s.maxHealth);

  const lastBlueHit = usePlayerStore((s) => s.lastBlueHit);
  const prevHitTimestamp = useRef<number | null>(null);
  const [showCriticalAnimation, setShowCriticalAnimation] = useState(false);

  useEffect(() => {
    if (
      lastBlueHit &&
      lastBlueHit.timestamp !== prevHitTimestamp.current &&
      isCriticalHit(lastBlueHit.hitType)
    ) {
      setShowCriticalAnimation(true);
      const timer = setTimeout(() => setShowCriticalAnimation(false), 500);
      prevHitTimestamp.current = lastBlueHit.timestamp;
      return () => clearTimeout(timer);
    }
    if (lastBlueHit) {
      prevHitTimestamp.current = lastBlueHit.timestamp;
    }
  }, [lastBlueHit]);

  const { forceWinner } = useDeclareWinner();
  const handleForceWin = useCallback(() => forceWinner('red'), [forceWinner]);

  return (
    <div className="flex h-full w-[50%] items-center justify-start">
      <PlayerAvatar
        name={name}
        image={avatar ?? 'assets/CapybaraTKU1.webp'}
        className="bg-red-player relative h-[14vh] w-[13vw] rounded-xl!"
        fallback={
          <img
            src={avatar ?? 'assets/CapybaraTKU1.webp'}
            alt={name}
            className="relative size-full rounded-sm object-contain"
          />
        }
        onDoubleClick={handleForceWin}
        isCriticalHit={showCriticalAnimation}
      />
      <div className="flex h-full w-full flex-col items-start">
        <Healthbar
          health={health}
          maxHealth={maxHealth}
          className="healthbar-primitive"
          side="red"
        />
        <Manabar mana={mana} className="manabar-primitive" side="red" />
      </div>
    </div>
  );
};

export const BluePlayerHUD = () => {
  const { health, mana, name, avatar } = usePlayerStore(
    useShallow((s) => ({
      health: s.blue.health,
      mana: s.blue.mana,
      name: s.blue.name,
      avatar: s.blue.avatar,
    }))
  );
  const maxHealth = usePlayerStore((s) => s.maxHealth);

  const lastRedHit = usePlayerStore((s) => s.lastRedHit);
  const prevHitTimestamp = useRef<number | null>(null);
  const [showCriticalAnimation, setShowCriticalAnimation] = useState(false);

  useEffect(() => {
    if (
      lastRedHit &&
      lastRedHit.timestamp !== prevHitTimestamp.current &&
      isCriticalHit(lastRedHit.hitType)
    ) {
      setShowCriticalAnimation(true);
      const timer = setTimeout(() => setShowCriticalAnimation(false), 500);
      prevHitTimestamp.current = lastRedHit.timestamp;
      return () => clearTimeout(timer);
    }
    if (lastRedHit) {
      prevHitTimestamp.current = lastRedHit.timestamp;
    }
  }, [lastRedHit]);

  const { forceWinner } = useDeclareWinner();
  const handleForceWin = useCallback(() => forceWinner('blue'), [forceWinner]);

  return (
    <div className="flex h-full w-[50%] items-center justify-end">
      <div className="flex h-full w-full flex-col items-end">
        <Healthbar
          health={health}
          maxHealth={maxHealth}
          className="healthbar-primitive"
          side="blue"
        />
        <Manabar mana={mana} className="manabar-primitive" side="blue" />
      </div>
      <PlayerAvatar
        name={name}
        image={avatar ?? 'assets/CapybaraTKU2.webp'}
        className="bg-blue-player relative h-[14vh] w-[13vw] rounded-xl!"
        fallback={
          <img
            src={avatar ?? 'assets/CapybaraTKU2.webp'}
            alt={name}
            className="relative size-full rounded-sm object-contain"
          />
        }
        onDoubleClick={handleForceWin}
        isCriticalHit={showCriticalAnimation}
      />
    </div>
  );
};
