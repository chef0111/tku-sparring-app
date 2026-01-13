import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/components/ui/logo";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { LoginForm } from "@/components/modules/auth/login-form";
import { Highlighter } from "@/components/ui/highlighter";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-center p-4">
      <div
        aria-hidden
        className="absolute inset-0 isolate -z-10 opacity-60 contain-strict"
      >
        <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.04)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 right-0 h-320 w-140 -translate-y-87.5 rounded-full" />
        <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 right-0 h-320 w-60 [translate:5%_-50%] rounded-full" />
        <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 right-0 h-320 w-60 -translate-y-87.5 rounded-full" />
      </div>
      <Button
        className="absolute top-7 left-5"
        variant="ghost"
        render={
          <Link to="/">
            <ChevronLeftIcon />
            Home
          </Link>
        }
      />
      <div className="mx-auto space-y-4 sm:w-sm">
        <div className="flex size-fit items-center justify-center gap-1 lg:hidden">
          <LogoIcon className="mr-auto h-5" />
          <span className="font-esbuild text-2xl font-bold">tku.ss</span>
        </div>
        <FieldSet className="flex flex-col space-y-4 text-center">
          <FieldLegend className="text-2xl! font-bold tracking-wide">
            Sign In to{" "}
            <Highlighter
              action="underline"
              color="#1685f5"
              className="font-esbuild!"
              strokeWidth={2}
              padding={0}
            >
              tku.ss
            </Highlighter>
          </FieldLegend>
          <FieldDescription className="text-muted-foreground w-full text-center text-base!">
            Enter your username and password to get access
          </FieldDescription>
          <FieldGroup>
            <LoginForm />
          </FieldGroup>
        </FieldSet>

        <p className="text-muted-foreground mt-8 text-center text-sm">
          Taekwondo sparring system from{" "}
          <a
            className="hover:text-primary underline underline-offset-4"
            href="https://www.facebook.com/uittaekwondo"
            target="_blank"
          >
            Taekwondo UIT
          </a>
        </p>
      </div>
    </div>
  );
}
