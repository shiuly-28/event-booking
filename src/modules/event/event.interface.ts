export interface ICreateEventInput {
  title: string;
  description?: string;
  location: string;
  price?: number;
  startsAt: string; // ISO date string
  seats?: number;
  categoryId: string;
}

export interface IUpdateEventInput {
  title?: string;
  description?: string;
  location?: string;
  price?: number;
  startsAt?: string;
  seats?: number;
  categoryId?: string;
}