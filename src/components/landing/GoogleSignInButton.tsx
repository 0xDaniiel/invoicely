// src/components/landing/GoogleSignInButton.tsx
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import { GoogleMark } from "./GoogleMark";

export function GoogleSignInButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <Button type="submit" variant="hero" size="lg" className={className}>
        <GoogleMark /> {label} <ArrowRight />
      </Button>
    </form>
  );
}
