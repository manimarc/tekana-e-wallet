import { UserStatus } from 'src/common';

export interface UserResponse {
  _id: string;
  email: string;
  names: string;
  phone: string;
  role: string;
  status: UserStatus;
}
