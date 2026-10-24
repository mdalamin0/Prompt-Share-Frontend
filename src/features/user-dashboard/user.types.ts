export interface IDashboardStats {
  totalPrompts: number;
  publicPrompts: number;
  privatePrompts: number;
  totalForksReceived: number;
}


export type categoryType = "code" | "text" | "image";

export interface IPromptFormData {
  title: string;
  description: string;
  template: string;
  category: categoryType;
  tags: string[];
  isPublic: boolean;
}

export interface IPrompt {
  id: string;
  title: string;
  description: string;
  template: string;
  category: categoryType;
  tags: string[];
  isPublic: boolean;
  forkCount: number;
  isForkedByCurrentUser: boolean;
  createdAt: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: IMeta;
}

export interface PromptParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "desc" | "asc";
  sortBy?: string;
  category?: categoryType;
}