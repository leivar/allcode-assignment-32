import { api } from "../axios";

export const addShoppingListItem = async (formData) => {
  const { data } = await api.post('/add-shopping-list-item', formData);
  return data;
};