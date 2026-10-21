/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const GoogleLoginButton = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      type="button"
      variant="outline"
      size="lg"
      className="h-11 w-full"
      disabled={isGoogleLoading}
    >
      {isGoogleLoading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Connecting to Google...
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-4"
          >
            <path
              fill="#4285F4"
              d="M21.35 12.23c0-.78-.07-1.53-.22-2.25H12v4.26h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.4Z"
            />
            <path
              fill="#34A853"
              d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
            />
            <path
              fill="#FBBC05"
              d="M6.54 13.58A5.86 5.86 0 0 1 6.23 12c0-.55.1-1.08.31-1.58V7.89H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.05 4.11l3.24-2.53Z"
            />
            <path
              fill="#EA4335"
              d="M12 6.39c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.84 3.43 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 8.11 9.46 6.39 12 6.39Z"
            />
          </svg>
          Continue with Google
        </>
      )}
    </Button>
  );
};

export default GoogleLoginButton;
