import { makeAutoObservable } from 'mobx';
import { getCategories, addCategory, deleteCategory, updateCategory } from '../api/index';

class CategoriesStore {
  categories: any = [];

  constructor() {
    makeAutoObservable(this);
  }

  getCategories = async () => {
    this.categories = await getCategories();
  };

  addCategory = async (sendObj: any) => {
    addCategory(sendObj)
      .then(() => {
        this.getCategories();
      })
      .catch((err: string) => new Error(err));
  };

  updateCategory = async (sendObj, id) => {
    await updateCategory(sendObj, id)
      .then(() => this.getCategories())
      .catch((err: string) => new Error(err));
  };

  deleteCategory = async (id: string) => {
    deleteCategory(id)
      .then(() => {
        this.getCategories();
      })
      .catch((err: string) => new Error(err));
  };
}

export default new CategoriesStore();
