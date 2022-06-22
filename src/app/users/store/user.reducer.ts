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
    email: "hoangminh@gmail.com",
    lastName: 'Hoang',
    firstName: 'Minh',
    title: 'Team lead',
    gender: 'Male',
    dateOfBirth: '02/02/2001',
    company: 'ROSEN',
    createDate: 2
  },
  {
    email: "longng@gmail.com",
    lastName: 'Long',
    firstName: "Nguyen",
    title: 'Team lead',
    company: 'ROSEN',
    dateOfBirth: '01/28/1999',
    gender:'Male',
    createDate: 1
  },
  {
    email: "acb@gmail.com",
    lastName: 'Chan Nhu',
    firstName: "Con Gian",
    title: 'Team lead',
    company: 'ROSEN',
    dateOfBirth: '03/25/1997',
    gender:'Male',
    createDate: 1
  },
  {
    email: "youme@gmail.com",
    lastName: 'You',
    firstName: "Me",
    title: 'Team lead',
    company: 'ROSEN',
    dateOfBirth: '07/25/1997',
    gender:'Male',
    createDate: 1
  },
  {
    email: "anh7@gmail.com",
    lastName: 'Cuong',
    firstName: "Van",
    title: 'Team lead',
    company: 'ROSEN',
    dateOfBirth: '09/25/1997',
    gender:'Male',
    createDate: 12
  },
  {
    email: "ashiba@gmail.com",
    lastName: 'Linh',
    firstName: "Thao",
    title: 'Team lead',
    company: 'ROSEN',
    dateOfBirth: '07/25/2001',
    gender:'Female',
    createDate: 1
  },
  {
    email: "nhu123@gmail.com",
    lastName: 'Như',
    firstName: "Cẩm",
    title: 'Team lead',
    company: 'ROSEN',
    dateOfBirth: '07/25/2002',
    gender:'Female',
    createDate: 1
  },
  {
    email: "hoang102@gmail.com",
    lastName: 'Nguyễn',
    firstName: "Hoàng",
    title: 'Architecture',
    company: 'ROSEN',
    dateOfBirth: '07/03/2002',
    gender:'Male',
    createDate: 1
  },
  {
    email: "linhnhi21@gmail.com",
    lastName: 'Linh',
    firstName: "Nhi",
    title: 'Architecture',
    company: 'ROSEN',
    dateOfBirth: '09/03/2002',
    gender:'Female',
    createDate: 1
  },
  {
    email: "trangng213@gmail.com",
    lastName: 'Trang',
    firstName: "Nguyễn",
    title: 'Architecture',
    company: 'ROSEN',
    dateOfBirth: '09/03/1997',
    gender:'Female',
    createDate: 1
  },
  {
    email: "duyng099@gmail.com",
    lastName: 'Duy',
    firstName: "Nguyễn",
    title: 'Web Developer',
    company: 'ROSEN',
    dateOfBirth: '09/03/1999',
    gender:'Male',
    createDate: 123
  },
  {
    email: "thachhoang@gmail.com",
    lastName: 'Thạch',
    firstName: "Hoàng",
    title: 'Tester',
    company: 'ROSEN',
    dateOfBirth: '22/03/1998',
    gender:'Male',
    createDate: 1223
  },
  {
    email: "catrang@gmail.com",
    lastName: 'Cá mập',
    firstName: "Trắng",
    title: 'DBA',
    company: 'ROSEN',
    dateOfBirth: '22/05/1996',
    gender:'Male',
    createDate: 1223
  },
  {
    email: "caden@gmail.com",
    lastName: 'Cá mập',
    firstName: "Đen",
    title: 'DBA',
    company: 'ROSEN',
    dateOfBirth: '22/05/1996',
    gender:'Male',
    createDate: 1223
  },
];

export const userReducer = createReducer(
  initialState,
  on(getAllUser, (state) => state),
  on(addUser, (state, { user }) => [...state, user]),
  on(updateUser, (state, {user})=> [...state.filter(u => u.email != user.email), user]),
  on(deleteUser, (state,{ email }) => state.filter(u=> u.email != email))
);
