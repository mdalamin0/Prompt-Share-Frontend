
export const UserRole = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  role: UserRoleType;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface resendVerificationPayload {
  email: string;
}

export interface resetPasswordPayload {
  email: string;
  newPassword: string;
  otp: string;
}
