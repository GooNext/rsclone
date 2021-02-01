import { makeAutoObservable } from 'mobx';
import { addNewTask, deleteTask, getTasks, updateTaskByBoardId, updateTask, updateStatus } from '../api/index';

class TasksStore {
  tasks: Array<{ title: string }> = [];

  constructor() {
    makeAutoObservable(this);
  }

  getTasks = async () => {
    this.tasks = await getTasks();
  };

  addNewTask = async (sendObj: any) => {
    addNewTask(sendObj)
      .then(() => this.getTasks())
      .catch((err: string) => new Error(err));
  };

  deleteTask = async (id: string) => {
    await deleteTask(id)
      .then(() => this.getTasks())
      .catch((err: string) => new Error(err));
  };

  updateTaskByBoardId = async (taskId: string, boardId: string) => {
    await updateTaskByBoardId(taskId, boardId)
      .then(() => this.getTasks())
      .catch((err: string) => new Error(err));
  };

  updateTask = async (sendObj, id) => {
    await updateTask(sendObj, id)
      .then(() => this.getTasks())
      .catch((err: string) => new Error(err));
  };

  updateStatus = async (id, status) => {
    await updateStatus(id, status)
      .then(() => this.getTasks())
      .catch((err: string) => new Error(err));
  };
}

export default new TasksStore();
