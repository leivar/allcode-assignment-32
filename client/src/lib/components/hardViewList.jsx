import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getShoppingList } from "../queries/getShoppingList";
import { useContext, useState, useRef, useEffect } from "react";
import editContext from "../context/editContext";
import { editShoppingListItem } from "../mutations/editShoppingListItem";
import { deleteShoppingListItem } from "../mutations/deleteShoppingListItem";

export default function hardViewList(){

  const ref = useRef(null);
  const queryClient = useQueryClient();
  const [ isEdit, setIsEdit ] = useContext(editContext);
  const [ editValue, setEditValue ] = useState(NaN);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['items'],
    queryFn: getShoppingList
  });

  useEffect(() => {
    setHardError('');
    setHardSuccess('');
  },[data]);

  const [ hardError, setHardError ] = useState('');
  const [ hardSuccess, setHardSuccess ] = useState('');

  const itemId = (index) => {  
    return `Hard-item-${index}` 
  };

  const initialFormData = {
    title: null,
    quantity: null,
    location: null,
    id: null
  };
  const [ formData, setFormData ] = useState(initialFormData);
  
  const updateList = (formData) => {
    if(formData.tilte || formData.title === ''){
      setHardError("Title can not be empty");
      return;
    }else{
      handleOnClickEditConfirm();
    }
  };

  const handleOnClickEditConfirm = () => {
    editItem.mutate();
  };

  const handleOnClickEdit = (e, title, quantity, location, id) => {
    setIsEdit(true);
    setHardError('');
    setHardSuccess('');
    setFormData({
      ...formData,
      title: title,
      quantity: quantity,
      location: location,
      id: id
    });
    setEditValue(e.target.value);
  };

  const handleOnClickDelete = (id) => {
    setHardError('');
    setHardSuccess('');
    ref.current = id;
    deleteItem.mutate();
  };

  const handleOnClickCancel = () => {
    setHardError('');
    setHardSuccess('');
    setHardSuccess('');
    setIsEdit(false);
  };

  const queryOnSuccessEdit = () => {
    setIsEdit(false);
    queryClient.refetchQueries(getShoppingList);
    setHardSuccess(`Task ${formData.id} successfully updated to ${formData.title}` )
  };

  const queryOnSuccessDelete = () => {
    queryClient.refetchQueries(getShoppingList);
    setHardSuccess('Task deleted successfully.');
  };

  const editItem = useMutation({
    mutationFn: () => editShoppingListItem(formData),
    onSuccess: () => queryOnSuccessEdit()
  });

  const deleteItem = useMutation({
    mutationFn: () => deleteShoppingListItem(ref.current),
    onSuccess: () => queryOnSuccessDelete()
  });

  if(isLoading){
    return(
      <section id='hard-loading' className="flex flex-col m-2 p-2">
        <p className="text-2xl flex">Easy Task</p>
        <p>Loading...</p>
      </section>
    );
  };

  if(isError){
    return(
      <section id='hard-error' className="flex flex-col m-2 p-2">
        <p className="text-2xl flex">Hard Task</p>
        <p>{error.message}</p>
      </section>
    );
  };

  const shoppingList = data.map((item, index) =>
    <li className='grid grid-cols-5' key={item.id}>
      <p id={itemId(index)} className="grid-1 mt-1 mr-1">{item.title}</p>
      <p className="grid-2 mt-1 mr-1">{item.quantity}</p>
      <p className="grid-3 mt-1 mr-1">{item.location}</p>
      
      <button 
        className="grid-4 mt-1 mr-1 bg-blue-500 hover:bg-blue-400 rounded-xl"
        value={index}
        onClick={(e) => handleOnClickEdit(e, item.title, item.quantity, item.location, item.id)}
      >Edit</button>
      
      <button 
        className="grid-4 mt-1 mr-1 bg-red-500 hover:bg-red-400 rounded-xl"
        value={item.id}
        onClick={(e) => handleOnClickDelete(e.target.value)}
      >Delete</button>
    </li>
  );

  const editView = (editValue) =>
    <section id="hard-edit-view">
      <li className="grid grid-cols-5">
        <textarea 
          className="grid-1"
          defaultValue={data[editValue].title}
          onChange={(e) => setFormData({
            ...formData,
            title: e.target.value
          })}
        />
        <textarea
          className="grid-2"
          defaultValue={data[editValue].quantity}
          onChange={(e) => setFormData({
            ...formData,
            quantity: e.target.value
          })}
          />
        <textarea
          className="grid-3"
          defaultValue={data[editValue].location}
          onChange={(e) => setFormData({
            ...formData,
            location: e.target.value
          })}
          />
        <button 
          className="grid-4 bg-green-500 hover:bg-green-400 rounded-xl"
          onClick={() => updateList(formData)}
        >Save</button>
        <button
          className="grid-5 bg-red-500 hover:bg-red-400 rounded-xl"
          onClick={() => handleOnClickCancel()}
        >Cancel</button>
      </li>
    </section>

  return(
    <section id="hard-view" className="flex-col">
      {isEdit?
        editView(editValue)
        :<ul id="hard-view-list">
          <section id="hard-view-list-headers" className="grid grid-cols-5">
            <li className="grid-1">Name</li>
            <li className="grid-2">Quantity</li>
            <li className="grid-3">Location</li>
          </section>
          {shoppingList}
        </ul>
      }
      
      <section className="">
        {hardError?
          <p className="bg-red-500 p-2 flex rounded-xl mt-2 mb-2">{hardError}</p>
          :null
        }
        {hardSuccess?
          <p className="bg-green-500 p-2 flex rounded-xl mt-2 mb-2">{hardSuccess}</p>
          :null
        }
      </section>
      
    </section>
  );
};