"use client";

import { useForm } from "@tanstack/react-form";
import { CheckCircle2, Eye, EyeOff, KeyRound, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FetchError } from "ofetch";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { resetPasswordSchema } from "../auth.schema";
import Logo from "@/components/shared/Logo";
import { useResetPassword } from "../hooks/auth.hooks";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: resetPassword, isPending: resetPasswordPending } =
    useResetPassword();

  const form = useForm({
    defaultValues: {
      otp: "",
      newPassword: "",
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: ({ value }) => {
      resetPassword(
        {
          email,
          newPassword: value.newPassword,
          otp: value.otp,
        },
        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.error(res.message || "Unable to reset your password.");
              return;
            }
            toast.success(res.message || "Password reset successfully.");
            router.push("/login");
          },
          onError: (error: FetchError) => {
            const errorMessage =
              error?.data?.message ||
              error?.message ||
              "Unable to reset your password. Please try again.";
            toast.error(errorMessage);
          },
        },
      );
    },
  });

  return (
    <div className="w-full max-w-md bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-900 p-8 shadow-sm dark:shadow-xl rounded-2xl">
      <div className="mb-7  flex flex-col items-center justify-center">
        <div className="mb-4">
          <Logo />
        </div>
        <div className="mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30">
          <KeyRound className="size-6" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Reset your password
        </h1>
        <p className="mx-auto text-center mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          We sent a verification code to
        </p>
        <p className="mt-1 break-all text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {email}
        </p>
      </div>

      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          <form.Field name="otp">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Verification code
                  </FieldLabel>
                  <div className="relative">
                    <CheckCircle2 className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-purple-600" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value.replace(/\D/g, ""))
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className="h-11 pl-10.5 text-center text-base tracking-[0.35em]"
                    />
                  </div>
                  <div className="min-h-5">
                    {isInvalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Enter the 6-digit code from your email.
                      </span>
                    )}
                  </div>
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="newPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>New password</FieldLabel>
                  <div className="group relative">
                    <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-purple-600" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className="h-11 pl-10.5 pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  <div className="min-h-5">
                    {isInvalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Use a strong password for your account.
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
              disabled={resetPasswordPending}
              className="h-11 w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {resetPasswordPending ? (
                <div className="flex items-center gap-2">
                  <Spinner /> Resetting...
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remembered your credentials?{" "}
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

export default ResetPasswordForm;
