
export const UserRole = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export type UserStatusType = "ACTIVE" | "SUSPENDED" | "DELETED";

export type AuthProviderType = "CREDENTIAL" | "GOOGLE";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  imagePublicId: string | null;
  role: UserRoleType;
  status: UserStatusType;
  provider: AuthProviderType;
  googleId: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

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
