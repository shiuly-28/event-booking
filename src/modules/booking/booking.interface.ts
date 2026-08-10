export interface ICreateBookingInput {
  eventId: string;
  seats?: number;
}

export interface IUpdateBookingInput {
  status?: "PENDING" | "CONFIRMED" | "CANCELLED";
  seats?: number;
}