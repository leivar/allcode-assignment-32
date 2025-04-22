import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addShoppingListItem } from "../lib/mutations/addShoppingListItem";
import { getShoppingList } from "../lib/queries/getShoppingList";

export default function HardAddItem() {
    const queryClient = useQueryClient();
    const [ statusSuccess, setStatusSuccess ] = useState('');
    const [ statusError, setStatusError ] = useState('');
    const [ formData, setFormData ] = useState({
      title: '',
      location: '',
      quantity: ''
    });
    
    const newItem = useMutation({
      mutationFn: () => addShoppingListItem(formData),
      onSuccess: () => queryClient.refetchQueries(getShoppingList)
    });
    
    const handleOnClick = () => {
      newItem.mutate();
    };
  
    if(newItem.isSuccess){
      if(newItem.data.success){
        setStatusError(null);
        setStatusSuccess(newItem.data.success);
      }else{
        setStatusSuccess(null);
        setStatusError(newItem.data.error);
      }
      newItem.reset();
    };
  
    if(newItem.isError){
      setStatusError(newItem.data.error);
      newItem.reset();
    };

  return(
      <section id="hard-add-item" className="flex flex-col mt-2">
        <section id='hard-add-item-status' className="mt-2">
          {statusError?
            <p className="p-2 bg-red-500 rounded-xl">{statusError}</p>
            :null
          }
          {statusSuccess?
            <p className="p-2 bg-green-500 rounded-xl">{statusSuccess}</p>
            :null
          }
        </section>
        <form className="flex flex-col">
          <input onChange={(e) => setFormData({
            ...formData,
            title: e.target.value
          })} value={formData.title} placeholder='Enter new item name' className="w-[13.3rem] p-2 border-1 border-emerald-400 rounded-xl" />
          <input onChange={(e) => setFormData({
            ...formData,
            location: e.target.value
          })} value={formData.location} placeholder='Enter location to get item' className="w-[13.3rem] p-2 border-1 border-emerald-400 rounded-xl" />
          <input onChange={(e) => setFormData({
            ...formData,
            quantity: e.target.value
          })} value={formData.quantity} placeholder="Enter quantity of items to get" className="w-[13.3rem] p-2 border-1 border-emerald-400 rounded-xl"/>
          <label className="flex bg-emerald-500 p-2 hover:bg-emerald-400 rounded-xl w-[13.3rem]">Add Item
            <button type="button" onClick={() => handleOnClick()} />
          </label>
        </form>
      </section>
  )
}