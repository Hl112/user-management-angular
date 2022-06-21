import {createFeatureSelector} from "@ngrx/store";
import {User} from "../shared/user";

export const selectUsers = createFeatureSelector<Array<User>>('users');
