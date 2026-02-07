export const avatarGroup = [
  {
    label: 'PLAYER 1 AVATAR',
    name: 'redPlayerAvatar' as const,
    playerName: 'Red Player',
    className: 'bg-red-player  relative size-25 rounded-xl!',
    fallback: 'assets/CapybaraTKU1.webp',
  },
  {
    label: 'PLAYER 2 AVATAR',
    name: 'bluePlayerAvatar' as const,
    playerName: 'Blue Player',
    className: 'bg-blue-player  relative size-25 rounded-xl!',
    fallback: 'assets/CapybaraTKU2.webp',
  },
];

export const playerGroup = [
  {
    name: 'redPlayerName' as const,
    label: 'RED PLAYER NAME',
    placeholder: 'Enter Red Player Name',
  },
  {
    name: 'bluePlayerName' as const,
    label: 'BLUE PLAYER NAME',
    placeholder: 'Enter Blue Player Name',
  },
];

export const durationGroup = [
  {
    name: 'roundDuration' as const,
    label: 'ROUND DURATION',
  },
  {
    name: 'breakDuration' as const,
    label: 'BREAK DURATION',
  },
];
