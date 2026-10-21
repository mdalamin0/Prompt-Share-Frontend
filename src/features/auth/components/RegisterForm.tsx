"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema } from "../auth.schema";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FetchError } from "ofetch";
import { Spinner } from "@/components/ui/spinner";
import Logo from "@/components/shared/Logo";
import { useRegister } from "../hooks/auth.hooks";
import { UserRole } from "../auth.types";
import GoogleLoginButton from "./GoogleLogin";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate: register, isPending: registerPending } = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: ({ value }) => {
      const registerData = {
        name: value.name,
        email: value.email,
        password: value.password,
        role: UserRole.USER
      };

      register(registerData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.error(
              res.message || "Registration failed. Please try again.",
            );
            return;
          }
          toast.success(res.message || "Verification OTP sent to your email.");
          const params = new URLSearchParams({ email: registerData.email });
          router.push(`/register/verify-account?${params.toString()}`);
        },
        onError: (error: FetchError) => {
          const errorMessage =
            error?.data?.message || error?.message || "Registration failure";
          toast.error(errorMessage);
        },
      });
    },
  });

  return (
    <div className="w-full max-w-md bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-900 p-8 rounded-2xl shadow-sm dark:shadow-xl">
      <div className="mb-7  flex flex-col items-center justify-center">
        <div className="mb-4">
          <Logo />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-center leading-6 text-muted-foreground">
          Sign up to build, clone, and test dynamic prompt templates.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <div className="group relative">
                    <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-purple-600" />
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Enter your name"
                      autoComplete="off"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className="h-11 pl-10.5 rounded-xl"
                    />
                  </div>
                  <div className="min-h-5">
                    {isInvalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Enter your full name.
                      </span>
                    )}
                  </div>
                </Field>
              );
            }}
          </form.Field>

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
                      className="h-11 pl-10.5 rounded-xl"
                    />
                  </div>
                  <div className="min-h-5">
                    {isInvalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Enter your valid email address.
                      </span>
                    )}
                  </div>
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="group relative">
                    <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-purple-600" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className="h-11 pl-10.5 pr-11 rounded-xl"
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
                        Must contain at least 8 characters with numbers &
                        symbols.
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
              disabled={registerPending}
              className="h-11 w-full bg-purple-600 hover:bg-purple-700 text-white  shadow-lg shadow-purple-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {registerPending ? (
                <div className="flex items-center gap-2">
                  <Spinner /> Creating Account...
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </Field>
          <FieldSeparator>Or continue with</FieldSeparator>

          <Field>
            <GoogleLoginButton />
          </Field>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-purple-600 dark:text-purple-400 underline-offset-4 hover:underline"
        >
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
