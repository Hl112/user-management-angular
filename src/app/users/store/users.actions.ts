import {createAction, props} from "@ngrx/store";
import {User} from "../shared/user";


export const getAllUser = createAction('[All] Users');

export const addUser = createAction('[CREATE] User', props<{ user: User }>());

export const updateUser = createAction("[Update] User", props<{ user: User }>());

export const deleteUser = createAction("[Delete] User", props<{ email : string }>());
