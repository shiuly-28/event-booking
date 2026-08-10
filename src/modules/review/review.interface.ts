export interface ICreateReviewInput {
  rating: number;
  comment?: string;
  eventId: string;
}

export interface IUpdateReviewInput {
  rating?: number;
  comment?: string;
}