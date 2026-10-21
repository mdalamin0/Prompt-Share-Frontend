"use client";

import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { FetchError } from "ofetch";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema } from "../auth.schema";
import type { ApiResponse, User } from "../auth.types";
import { useLogin } from "../hooks/auth.hooks";
import GoogleLoginButton from "./GoogleLogin";

const demoAccount = {
  email: "nasima7485@gmail.com",
  password: "Alamin@12",
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate: login, isPending: loginPending } = useLogin();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.error(
              res.message || "Authentication failed. Please try again.",
            );
            return;
          }

          queryClient.setQueryData<ApiResponse<User>>(["user"], {
            success: true,
            message: res.message,
            data: res.data?.user,
          });
          toast.success(res.message || "Logged in successfully!");
          router.replace("/dashboard/user");
        },
        onError: (error: FetchError) => {
          const errorMessage =
            error?.data?.message || error?.message || "Authorization failure";
          toast.error(errorMessage);
        },
      });
    },
  });

  const handleDemoLogin = () => {
    form.setFieldValue("email", demoAccount.email);
    form.setFieldValue("password", demoAccount.password);
  };

    useEffect(() => {
      const error = searchParams.get("error");

      if (error === "google-login-failed") {
        toast.error("Google login is only available for User.", {
          description: "Please login with email and password.",
          id: "google-login-error",
        });

        window.history.replaceState(null, "", "/login");
      }
    }, [searchParams]);

  return (
    <div className="w-full rounded-2xl max-w-md bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-900 p-5 md:p-8  shadow-sm dark:shadow-xl">
      <div className="mb-7 flex flex-col items-center justify-center">
        <div className="mb-4">
          <Logo />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Welcome back
        </h1>

        <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
          Sign in to continue to your promptshare workspace.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-purple-100 dark:border-purple-900/30 bg-purple-50/30 dark:bg-purple-950/10 p-4 flex flex-col items-center justify-center text-center">
        <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1">
          <Sparkles size={14} className="animate-pulse" /> Fast Pass Access
        </p>
        <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
          Autofill with our verified user demo account
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleDemoLogin}
          className="mt-3 h-8 px-4 rounded-xl text-xs border-purple-200 dark:border-purple-900/50 hover:bg-purple-50 dark:hover:bg-purple-950/20 text-purple-600 dark:text-purple-400 font-semibold"
        >
          User
        </Button>
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
                      className="h-11 pl-10.5 "
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
                  <div className="flex items-center justify-between gap-3">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <a
                      href="/forgot-password"
                      className="text-xs font-semibold text-purple-600 dark:text-purple-400 underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="group relative">
                    <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-purple-600" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className="h-11 pl-10.5 pr-11 "
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
                        Enter your valid password.
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
              disabled={loginPending}
              className="h-11 w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {loginPending ? (
                <div className="flex items-center gap-2">
                  <Spinner /> Signing in...
                </div>
              ) : (
                "Sign In"
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
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="font-semibold text-purple-600 dark:text-purple-400 underline-offset-4 hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
