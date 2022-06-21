import { User } from "../shared/user";

export interface UserInPosition{
  name: string;
  children? : User[]
}
