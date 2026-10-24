import { categoryType, IPrompt } from "../user-dashboard/user.types";

export interface User  {
    id: string;
    name: string;
    image: string;
    role: string;
  }

export interface IPublicPrompt extends IPrompt {
  user: User;
}

export interface IClonePromptResponse {
  id: string;
  title: string;
  description: string;
  template: string;
  category: "code" | "text" | "image";
  tags: string[];
  isPublic: boolean;
  userId: string;
  forkCount: number;
  createdAt: string;
  updatedAt: string;
}


