import { api } from "../axios";

export const getShoppingList = async () => {

  const { data } = await api.get('/shopping-list');
  
  return data;
};