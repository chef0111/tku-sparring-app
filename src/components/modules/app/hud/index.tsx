import { useShallow } from 'zustand/react/shallow';
import { Healthbar } from './healthbar';
import { Manabar } from './manabar';
import { PlayerAvatar } from './player-avatar';
import { usePlayerStore } from '@/lib/stores/player-store';
import { useDeclareWinner } from '@/hooks/use-declare-winner';

const AppHUD = () => {
  return (
    <section className="flex h-[14vh] w-full max-w-screen items-center justify-between">
      <RedPlayerHUD />
      <BluePlayerHUD />
    </section>
  );
};

export const RedPlayerHUD = () => {
  const { health, mana } = usePlayerStore(
    useShallow((s) => ({
      health: s.red.health,
      mana: s.red.mana,
    }))
  );
  const maxHealth = usePlayerStore((s) => s.maxHealth);

  const handleDeclareWinner = useDeclareWinner('red');

  return (
    <div className="flex h-full w-[50%] items-center justify-start">
      <PlayerAvatar
        name="Red Player"
        image="assets/CapybaraTKU1.webp"
        className="bg-red-player relative h-[14vh] w-[13vw] rounded-xl!"
        fallback={
          <img
            src="assets/CapybaraTKU1.webp"
            alt="Red Player"
            className="relative size-full rounded-sm object-contain"
          />
        }
        onDoubleClick={handleDeclareWinner}
      />
      <div className="flex h-full w-full flex-col items-start">
        <Healthbar
          health={health}
          maxHealth={maxHealth}
          className="healthbar-primitive"
        />
        <Manabar mana={mana} className="manabar-primitive" />
      </div>
    </div>
  );
};

export const BluePlayerHUD = () => {
  const { health, mana } = usePlayerStore(
    useShallow((s) => ({
      health: s.blue.health,
      mana: s.blue.mana,
    }))
  );
  const maxHealth = usePlayerStore((s) => s.maxHealth);

  const handleDeclareWinner = useDeclareWinner('blue');

  return (
    <div className="flex h-full w-[50%] items-center justify-end">
      <div className="flex h-full w-full flex-col items-end">
        <Healthbar
          health={health}
          maxHealth={maxHealth}
          className="healthbar-primitive"
          reversed
        />
        <Manabar mana={mana} className="manabar-primitive" reversed />
      </div>
      <PlayerAvatar
        name="Blue Player"
        image="assets/CapybaraTKU2.webp"
        className="bg-blue-player relative h-[14vh] w-[13vw] rounded-xl!"
        fallback={
          <img
            src="assets/CapybaraTKU2.webp"
            alt="Blue Player"
            className="relative size-full rounded-sm object-contain"
          />
        }
        onDoubleClick={handleDeclareWinner}
      />
    </div>
  );
};

export { AppHUD };
