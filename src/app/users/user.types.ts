export interface RegisterUserRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface User {
  email: string;
  nickname: string;
  role: string;
  id: number;
}
