"use client";

import { useForm } from "@tanstack/react-form";
import { Mail } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { FetchError } from "ofetch";
import Logo from "@/components/shared/Logo";
import { forgotPasswordSchema } from "../auth.schema";
import { useForgotPassword } from "../hooks/auth.hooks";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { mutate: forgotPassword, isPending: forgotPasswordPending } =
    useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: ({ value }) => {
     

      forgotPassword(value.email, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.error(
              res.message || "Failed to process request. Please try again.",
            );
            return;
          }
          toast.success(
            res.message || "Password reset OTP sent to your email.",
          );
          router.push(
            `/reset-password?email=${encodeURIComponent(value.email)}`,
          );
        },
        onError: (error: FetchError) => {
          const errorMessage =
            error?.data?.message || error?.message || "Something went wrong";
          toast.error(errorMessage);
        },
      });
    },
  });

  return (
    <div className="w-full rounded-2xl max-w-md bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-900 p-5 md:p-8 shadow-sm dark:shadow-xl">
      <div className="mb-7  flex flex-col items-center justify-center">
        <div className="mb-4">
          <Logo />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Reset password
        </h1>

        <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
          Enter your email address and we will send you a OTP.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                  <div className="group relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-purple-600" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className="h-11 pl-10.5"
                    />
                  </div>
                  <div className="min-h-5">
                    {isInvalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Enter your email address.
                      </span>
                    )}
                  </div>
                </Field>
              );
            }}
          </form.Field>

          <Field className="pt-1">
            <Button
              type="submit"
              size="lg"
              disabled={forgotPasswordPending}
              className="h-11 w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {forgotPasswordPending ? (
                <div className="flex items-center gap-2">
                  <Spinner /> Requesting...
                </div>
              ) : (
                "Send Reset OTP"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remembered your security pass?{" "}
        <a
          href="/login"
          className="font-semibold text-purple-600 dark:text-purple-400 underline-offset-4 hover:underline"
        >
          Back to Login
        </a>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
