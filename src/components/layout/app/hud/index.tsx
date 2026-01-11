import { Healthbar } from "./healthbar";
import { Manabar } from "./manabar";
import { PlayerAvatar } from "./player-avatar";

const AppHUD = () => {
  return (
    <section className="flex h-[14vh] w-full max-w-screen items-center justify-between">
      <RedPlayerHUD />
      <BluePlayerHUD />
    </section>
  );
};

const RedPlayerHUD = () => {
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
            className="relative z-1 rounded-sm object-contain"
          />
        }
      />
      <div className="flex h-full w-full flex-col items-start">
        <Healthbar className="h-[65%] w-full" />
        <Manabar manaPoints={5} className="h-[35%] w-[73%]" />
      </div>
    </div>
  );
};

const BluePlayerHUD = () => {
  return (
    <div className="flex h-full w-[50%] items-center justify-end">
      <div className="flex h-full w-full flex-col items-end">
        <Healthbar className="h-[65%] w-full" reversed />
        <Manabar manaPoints={5} className="h-[35%] w-[73%]" reversed />
      </div>
      <PlayerAvatar
        name="Blue Player"
        image="assets/CapybaraTKU2.webp"
        className="bg-blue-player relative h-[14vh] w-[13vw] rounded-xl!"
        fallback={
          <img
            src="assets/CapybaraTKU2.webp"
            alt="Blue Player"
            className="relative z-1 rounded-sm object-contain"
          />
        }
      />
    </div>
  );
};

export { AppHUD };
