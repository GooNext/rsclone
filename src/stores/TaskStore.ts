import { makeAutoObservable } from 'mobx';
import { getTaskById } from '../api';

class TaskStore {
  task: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  getTask = async (id: string) => {
    this.task = await getTaskById(id);
  };
}

export default new TaskStore();
