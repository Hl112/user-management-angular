import {createReducer, on} from "@ngrx/store";
import {User} from "../shared/user";
import {addUser, deleteUser, getAllUser, updateUser} from "./users.actions";

export const initialState : User[] = [
  {
    email: "123@abc.com",
    lastName: 'Hong Ngoc',
    firstName: "Nguyen Thi",
    title: 'Team lead',
    company: 'ROSEN',
    dateOfBirth: '01/01/2000',
    gender: 'Female',
    createDate: 3
  },
  {
    email: "he@gmail.com",
    lastName: 'Hi',
    firstName: "He",
    title: 'Team lead',
    createDate: 2
  },
  {
    email: "hsi",
    lastName: 'Hi',
    firstName: "He3",
    title: 'Team lead',
    createDate: 1
  },
];

export const userReducer = createReducer(
  initialState,
  on(getAllUser, (state) => state),
  on(addUser, (state, { user }) => [...state, user]),
  on(updateUser, (state, {user})=> [...state.filter(u => u.email != user.email), user]),
  on(deleteUser, (state,{ email }) => state.filter(u=> u.email != email))
);
