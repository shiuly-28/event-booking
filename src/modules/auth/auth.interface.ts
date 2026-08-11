export interface IRegisterInput {
  name: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";   // 👈 optional role
}