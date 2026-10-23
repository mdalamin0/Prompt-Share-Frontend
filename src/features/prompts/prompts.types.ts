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

