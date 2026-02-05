import { motion } from 'motion/react';
import type { HitType, Player } from '@/lib/scoreboard/hit-types';
import { cn } from '@/lib/utils';
import {
  CRITICAL_HITS,
  KEYBOARD_MAPPINGS,
  NORMAL_HITS,
  getButtonIconPath,
} from '@/lib/scoreboard/hit-types';

interface ButtonColumnProps {
  player: Player;
  onHit: (hitType: HitType) => void;
  disabled?: boolean;
  activeHitType?: HitType | null;
  className?: string;
}

export const CriticalButtonsColumn = ({
  player,
  onHit,
  disabled,
  activeHitType,
  className,
}: ButtonColumnProps) => {
  const keyMap = KEYBOARD_MAPPINGS[player];

  return (
    <div
      className={cn(
        'flex h-[24vh] flex-col items-center justify-between',
        className
      )}
    >
      {CRITICAL_HITS.map((hitType) => {
        const key = Object.entries(keyMap).find(
          ([, type]) => type === hitType
        )?.[0];
        return (
          <ScoreButton
            key={hitType}
            player={player}
            hitType={hitType}
            keyLabel={key?.toUpperCase()}
            onClick={() => onHit(hitType)}
            disabled={disabled}
            isActive={activeHitType === hitType}
          />
        );
      })}
    </div>
  );
};

export const NormalButtonsColumn = ({
  player,
  onHit,
  disabled,
  activeHitType,
  className,
}: ButtonColumnProps) => {
  const keyMap = KEYBOARD_MAPPINGS[player];

  return (
    <div
      className={cn(
        'flex h-[36vh] flex-col items-center justify-between',
        className
      )}
    >
      {NORMAL_HITS.map((hitType) => {
        const key = Object.entries(keyMap).find(
          ([, type]) => type === hitType
        )?.[0];
        return (
          <ScoreButton
            key={hitType}
            player={player}
            hitType={hitType}
            keyLabel={key?.toUpperCase()}
            onClick={() => onHit(hitType)}
            disabled={disabled}
            isActive={activeHitType === hitType}
          />
        );
      })}
    </div>
  );
};

interface ScoreButtonProps {
  player: Player;
  hitType: HitType;
  keyLabel?: string;
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
}

export const ScoreButton = ({
  player,
  hitType,
  keyLabel,
  onClick,
  disabled,
  isActive,
  className,
}: ScoreButtonProps) => {
  const iconPath = getButtonIconPath(player, hitType);
  const glowColor =
    player === 'red' ? 'rgba(255, 255, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)';
  const hoverBgColor =
    player === 'red' ? 'rgba(255, 255, 0, 0.2)' : 'rgba(153, 255, 102, 0.2)';

  const activeAnimation =
    isActive && !disabled
      ? {
          scale: 0.95,
          boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
          backgroundColor: hoverBgColor,
        }
      : {};

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-none bg-transparent',
        'transition-all duration-200',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      animate={activeAnimation}
      whileHover={
        disabled
          ? {}
          : {
              boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
              backgroundColor: hoverBgColor,
            }
      }
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      <img
        src={iconPath}
        alt={`${player} ${hitType}`}
        className="pointer-events-none flex h-20 w-20 items-center justify-center rounded-full object-cover"
      />
      {keyLabel && (
        <span
          className={cn(
            'absolute -bottom-7.5 flex h-3.75 w-3.75 -translate-y-8.25 items-center justify-center rounded-full text-center text-[18px] leading-none font-bold text-[#a6a6a6]',
            player === 'red'
              ? 'bg-[#ff0000] text-shadow-[1px_1px_0_#ff0000,-1px_-1px_0_#ff0000]'
              : 'bg-[#0070c0] text-shadow-[1px_1px_0_#0070c0,-1px_-1px_0_#0070c0]'
          )}
        >
          {keyLabel}
        </span>
      )}
    </motion.button>
  );
};
