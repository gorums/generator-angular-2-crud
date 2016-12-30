import {UserModel, DoctorModel}  from '../models';

export interface State {
  users: Array<UserModel>
  doctors: Array<DoctorModel>
}

export const defaultState = {
  users: [],
  doctors: []
}