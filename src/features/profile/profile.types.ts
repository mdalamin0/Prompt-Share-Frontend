export interface IUpdateProfilePayload {
  name: string;
}

export interface IUpdateProfileResponse {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
  status: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}
