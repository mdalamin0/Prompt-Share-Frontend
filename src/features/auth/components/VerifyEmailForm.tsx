"use client";

import React, { useEffect, useState, use } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { FetchError } from "ofetch";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { useResendVerificationCode, useVerifyEmail } from "../hooks/auth.hooks";

interface VerifyEmailFormProps {
  searchParams: Promise<{ email?: string }>;
}

const VerifyEmailForm = ({ searchParams }: VerifyEmailFormProps) => {
  const resolvedParams = use(searchParams);
  const email = resolvedParams.email || "";

  if (!email) {
    redirect("/");
  }

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [countdown, setCountdown] = useState(59);
  const { mutate: verify, isPending: verifyPending } = useVerifyEmail();
  const { mutate: resendOTP, isPending: resendOTPPending } =
    useResendVerificationCode();
  const router = useRouter();

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.error("Verification failed. Please try again.");
          return;
        }
        toast.success("Account verified successfully.");
        router.push("/");
      },
      onError: (error: FetchError) => {
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Verification failure. Please try again.";
        toast.error(errorMessage);
      },
    });
  };

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendCode = () => {
    if (countdown > 0 || resendOTPPending) return;

    resendOTP(
      { email },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.error("Failed to send OTP.");
            return;
          }
          toast.success(res.message || "Verification OTP sent successfully.");
          setCountdown(59);
        },
        onError: (error: FetchError) => {
          const errorMessage =
            error?.data?.message || error?.message || "Failed to resend OTP.";
          toast.error(errorMessage);
        },
      },
    );
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-900 p-8 rounded-2xl shadow-sm dark:shadow-xl ">
      <div className="text-center">
        <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30">
          <MailCheck className="size-6" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Verify your email
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          We&apos;ve sent a 6-digit verification code to
        </p>

        <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {email}
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <FieldGroup>
          <form
            id="otp-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOTP();
            }}
            className="w-full flex flex-col items-center"
          >
            <Field className="items-center" data-invalid={isInvalid}>
              <FieldLabel htmlFor="verification-code" className="sr-only">
                Verification code
              </FieldLabel>

              <InputOTP
                onChange={(value) => {
                  setOtp(value);
                  if (isInvalid) {
                    setIsInvalid(false);
                  }
                }}
                value={otp}
                autoComplete="off"
                id="verification-code"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                autoFocus
              >
                <InputOTPGroup className="gap-2 sm:gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="size-11 rounded-xl border bg-zinc-50 dark:bg-zinc-950 text-lg font-semibold shadow-sm transition-all duration-200 first:rounded-xl last:rounded-xl sm:size-12 focus-visible:ring-purple-500 data-[focus]:border-purple-600"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <div className="min-h-5 mt-2">
                {isInvalid ? (
                  <FieldError errors={[{ message: "Invalid OTP" }]} />
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Enter valid 6-digit verification code.
                  </span>
                )}
              </div>
            </Field>
          </form>
        </FieldGroup>
      </div>

      <Button
        form="otp-form"
        type="submit"
        size="lg"
        disabled={verifyPending}
        className="mt-5 h-11 w-full bg-purple-600 hover:bg-purple-700 text-white  shadow-lg shadow-purple-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
      >
        {verifyPending ? (
          <div className="flex items-center gap-2">
            <Spinner /> Verifying...
          </div>
        ) : (
          "Verify email"
        )}
      </Button>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          disabled={countdown > 0 || resendOTPPending}
          onClick={handleResendCode}
          className="font-semibold text-purple-600 dark:text-purple-400 underline-offset-4 transition-colors hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
        >
          {countdown > 0
            ? `Resend code in ${countdown}s`
            : resendOTPPending
              ? "Resending..."
              : "Resend"}
        </button>
      </div>

      <div className="mt-6 border-t border-zinc-100 dark:border-zinc-900 pt-5 text-center">
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/login" />}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 bg-transparent hover:bg-transparent"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
