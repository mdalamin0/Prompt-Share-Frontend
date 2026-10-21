import { ShieldCheck } from "lucide-react";

interface AuthLoadingProps {
  label?: string;
}

export default function AuthLoading({
  label = "Verifying account",
}: AuthLoadingProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex size-14 items-center justify-center">
          {/* Spinning ring */}
          <div className="absolute inset-0 animate-spin rounded-2xl border-2 border-primary/10 border-t-primary" />

          {/* Icon container */}
          <div className="relative flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-5" strokeWidth={1.8} />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <p className="text-xl font-medium text-foreground">{label}</p>

          <span className="flex gap-1 mt-0.5">
            <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
            <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
            <span className="size-2 animate-bounce rounded-full bg-primary" />
          </span>
        </div>

        <p className="mt-1.5 text-xs text-muted-foreground">
          Securing your PromptShare workspace
        </p>
      </div>
    </div>
  );
}
