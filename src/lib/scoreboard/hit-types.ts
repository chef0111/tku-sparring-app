export type HitType =
  | 'headCrit' // 5 points - 25 damage
  | 'trunkCrit' // 4 points - 20 damage
  | 'head' // 3 points - 15 damage
  | 'trunk' // 2 points - 10 damage
  | 'punch'; // 1 point - 5 damage

export type Player = 'red' | 'blue';

// Hit points to damage mapping
export const HIT_DAMAGE_MAP: Record<HitType, number> = {
  headCrit: 25,
  trunkCrit: 20,
  head: 15,
  trunk: 10,
  punch: 5,
};

// Hit type to point value (for display)
export const HIT_POINTS_MAP: Record<HitType, number> = {
  headCrit: 5,
  trunkCrit: 4,
  head: 3,
  trunk: 2,
  punch: 1,
};

// Cooldown between hits for the same player (ms)
export const HIT_COOLDOWN = 300;

// Icon paths for each hit type and player
export const getHitIconPath = (player: Player, hitType: HitType): string => {
  const iconMap: Record<HitType, string> = {
    headCrit: `${player}HeadCrit`,
    trunkCrit: `${player}TrunkCrit`,
    head: `${player}Head`,
    trunk: `${player}Trunk`,
    punch: `${player}Punch`,
  };

  return `/assets/${iconMap[hitType]}.webp`;
};

// Button icon paths (different from hit display icons)
export const getButtonIconPath = (player: Player, hitType: HitType): string => {
  const iconMap: Record<HitType, string> = {
    headCrit: `${player}HeadCritButton`,
    trunkCrit: `${player}TrunkCritButton`,
    head: `${player}HeadButton`,
    trunk: `${player}TrunkButton`,
    punch: `${player}PunchButton`,
  };

  return `/assets/${iconMap[hitType]}.webp`;
};

// Keyboard mappings for each player
export const KEYBOARD_MAPPINGS: Record<Player, Record<string, HitType>> = {
  red: {
    e: 'headCrit',
    q: 'trunkCrit',
    d: 'head',
    a: 'trunk',
    s: 'punch',
  },
  blue: {
    u: 'headCrit',
    o: 'trunkCrit',
    j: 'head',
    l: 'trunk',
    k: 'punch',
  },
};

// Check if hit is critical (for animations)
export const isCriticalHit = (hitType: HitType): boolean => {
  return hitType === 'headCrit' || hitType === 'trunkCrit';
};

// Check if hit is super critical (head crit only)
export const isSuperCriticalHit = (hitType: HitType): boolean => {
  return hitType === 'headCrit';
};

// Hit type display order for buttons
export const CRITICAL_HITS: Array<HitType> = ['headCrit', 'trunkCrit'];
export const NORMAL_HITS: Array<HitType> = ['head', 'punch', 'trunk'];
