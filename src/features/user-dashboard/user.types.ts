export interface IDashboardStats {
  totalPrompts: number;
  publicPrompts: number;
  privatePrompts: number;
  totalForksReceived: number;
}


export interface IPrompt {
  id: string;
  title: string;
  category: string;
  views?: number;
  isPublic: boolean;
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
