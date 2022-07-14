import {createReducer, on} from "@ngrx/store";
import {User} from "../shared/user";
import {addUser, deleteUser, getAllUser, updateUser} from "./users.actions";

export const initialState : User[] = [
];

export const userReducer = createReducer(
  initialState,
  on(getAllUser, (state) => state),
  on(addUser, (state, { user }) => [...state, user]),
  on(updateUser, (state, {user})=> [...state.filter(u => u.email != user.email), user]),
  on(deleteUser, (state,{ email }) => state.filter(u=> u.email != email))
);
