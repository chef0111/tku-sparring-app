import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-backround flex h-20 w-full items-center justify-between">
      <div className="mx-4 box-border flex w-[13vw] items-center justify-center gap-4">
        <img
          src="assets/uit.webp"
          loading="eager"
          alt="UIT Logo"
          className="h-14"
        />
        <img
          src="assets/tku.webp"
          loading="eager"
          alt="TKU Logo"
          className="h-14"
        />
      </div>
      <div className="flex w-full items-center justify-center">
        <h1 className="text-4xl font-bold">TKU Sparring System</h1>
      </div>
      <div className="mx-4 box-border flex w-[13vw] items-center justify-end">
        <Button
          variant="ghost"
          className="size-20 cursor-pointer hover:bg-transparent! [&_svg:not([class*='size-'])]:size-10!"
          render={<MenuIcon />}
        />
      </div>
    </nav>
  );
};

export { Navbar };
