import {User} from "./user";

export interface DialogData{
  title: string;
  user?: User;
  isCreate: boolean;
}
