import { notification } from 'antd';
import { getAccessToken, logout } from '../utils';

const fetchApi = async ({ path, method, body }: any) => {
  const headers = new Headers();
  const token = getAccessToken();
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  headers.append('Content-Type', 'application/json; charset=utf-8');
  const url = `https://dry-cliffs-80424.herokuapp.com/${path}`;
  return fetch(url, {
    headers,
    method,
    body: body ? JSON.stringify(body) : null,
  }).then((res) => {
    if (res.status === 401) {
      logout();
    }
    return res.json();
  });
};

export const getCategories = async (): Promise<unknown | string> => {
  return fetchApi({ path: 'categories', method: 'GET' });
};

export const addCategory = async (sendObj: Record<string, unknown>): Promise<unknown | string> => {
  return fetchApi({ path: 'categories/add', method: 'POST', body: sendObj });
};

export const updateCategory = async (sendObj, categoryId): Promise<unknown | string> => {
  return fetchApi({ path: `categories/${categoryId}`, method: 'PUT', body: sendObj });
};

export const deleteCategory = async (id: string): Promise<unknown | string> => {
  return fetchApi({ path: `categories/${id}`, method: 'DELETE' });
};

export const addNewTask = async (sendObj: Record<string, unknown>): Promise<unknown | string> => {
  return fetchApi({ path: 'tasks/add', method: 'POST', body: sendObj });
};

export const getTasks = async (): Promise<unknown | any> => {
  return fetchApi({ path: 'tasks', method: 'GET' });
};

export const getTaskById = async (id: string): Promise<unknown | string> => {
  return fetchApi({ path: `tasks/${id}`, method: 'GET' });
};

export const updateTaskByBoardId = async (taskId: string, boardId: string): Promise<unknown | string> => {
  return fetchApi({ path: `tasks/update/boardId/${taskId}`, method: 'PUT', body: { boardId } });
};

export const updateTask = async (sendObj, taskId): Promise<unknown | string> => {
  return fetchApi({ path: `tasks/update/${taskId}`, method: 'PUT', body: sendObj });
};

export const updateStatus = async (taskId, status): Promise<unknown | string> => {
  return fetchApi({ path: `tasks/update-status/${taskId}`, method: 'PUT', body: status });
};

export const deleteTask = async (id: string): Promise<unknown | string> => {
  return fetchApi({ path: `tasks/${id}`, method: 'DELETE' });
};

export const getBoards = async (): Promise<unknown | any> => {
  return fetchApi({ path: 'boards', method: 'GET' });
};

export const addBoard = async (sendObj: Record<string, unknown>): Promise<unknown | string> => {
  return fetchApi({ path: 'boards/add', method: 'POST', body: sendObj });
};

export const deleteBoard = async (id: string): Promise<unknown | string> => {
  return fetchApi({ path: `boards/${id}`, method: 'DELETE' });
};

export const registerUser = async (sendObj: Record<string, unknown>): Promise<unknown | string> => {
  return fetchApi({ path: 'user', method: 'POST', body: sendObj }).then((res: any) => {
    if (res.code === 11000) {
      notification.open({
        message: 'No no no no no',
        description: `Login ${res.keyValue.login} alredy exists`,
      });
    } else {
      notification.open({
        message: 'Success',
        description: 'Your account was been succesfully created please sign in',
      });
      window.location.href = '/auth';
    }
  });
};

export const loginUser = async (sendObj: Record<string, unknown>): Promise<unknown | string> => {
  return fetchApi({ path: 'login', method: 'POST', body: sendObj });
};

export const getUserByLogin = async (login: string | null): Promise<unknown | string> => {
  return fetchApi({ path: `user/${login}`, method: 'GET' });
};
