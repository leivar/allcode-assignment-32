import { api } from "../axios";

export const addTask = async (formData) => {
  const { data } = await api.post('/add-task', formData);
  return data;
};