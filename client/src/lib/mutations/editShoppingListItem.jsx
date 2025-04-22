import { api } from "../axios";

export const editShoppingListItem = async (formData) => {
  const { data } = await api.patch('/edit-shopping-list-item', formData);
  return data;
};
