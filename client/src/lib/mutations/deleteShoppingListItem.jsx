import { api } from "../axios";

export const deleteShoppingListItem = async (ref) => {
  
  const { data } = await api.delete(`/delete-shopping-list-item${ref}`);
  return data;
};