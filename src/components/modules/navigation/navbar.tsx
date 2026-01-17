import { LogInIcon, MenuIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { UserDropdown } from "../user/user-dropdown";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  return (
    <nav className="bg-backround flex h-20 w-full items-center justify-between">
      <div className="flex w-[13vw] shrink-0 items-center justify-center gap-4">
        <img
          src="assets/uit.webp"
          loading="eager"
          alt="UIT Logo"
          className="h-12"
        />
        <img
          src="assets/tku.webp"
          loading="eager"
          alt="TKU Logo"
          className="h-14"
        />
      </div>
      <div className="flex w-full grow items-center justify-center">
        <h1 className="text-4xl font-bold">TKU Sparring System</h1>
      </div>
      <div className="flex w-[13vw] shrink-0 items-center justify-end px-2">
        {isPending ? null : user ? (
          <UserDropdown user={user} />
        ) : (
          <Link to="/login">
            <Button variant="outline" size="lg" className="mx-1 text-lg">
              <LogInIcon className="size-5" /> Login
            </Button>
          </Link>
        )}
        <Button
          variant="ghost"
          className="cursor-pointer hover:bg-transparent! [&_svg:not([class*='size-'])]:size-10!"
        >
          <MenuIcon className="size-12" />
        </Button>
      </div>
    </nav>
  );
};

export { Navbar };
