import { makeAutoObservable } from 'mobx';
import { getUserByLogin } from '../api';

class UserStore {
  user: any = {};

  constructor() {
    makeAutoObservable(this);
    this.getUserByLogin();
  }

  getUserByLogin = async () => {
    this.user = await getUserByLogin(localStorage.getItem('userLogin'));
  };
}

export default new UserStore();
