import { User } from "../shared/user";

export interface UserInPosition{
  id: number;
  name?: string;
  children? : User[]
}
