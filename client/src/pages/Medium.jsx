import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addTask } from "../lib/mutations/addTask";
import { getTasks } from "../lib/queries/getTasks";

export default function Medium(){
  const queryClient = useQueryClient();
  const [ statusSuccess, setStatusSuccess ] = useState('');
  const [ statusError, setStatusError ] = useState('');
  const [ formData, setFormData ] = useState("");
  
  const newTask = useMutation({
    mutationFn: () => addTask({content: formData}),
    onSuccess: () => queryClient.refetchQueries(getTasks)
  });
  
  const handleOnClick = () => {
    newTask.mutate();
  };

  if(newTask.isSuccess){
    if(newTask.data.success){
      setStatusError(null);
      setStatusSuccess(newTask.data.success);
    }else{
      setStatusSuccess(null);
      setStatusError(newTask.data.error);
    }
    newTask.reset();
  };

  if(newTask.isError){
    setStatusError(newTask.data.error);
    newTask.reset();
  };

  return(
    <section id="medium-task" className="m-2 p-2 flex flex-col" >
      <p className="flex text-2xl">Medium Task</p>
      
      <section id="medium-task-content" className="flex flex-col mt-2">
        <form>
          <input onChange={(e) => setFormData(e.target.value)} value={formData} placeholder='Enter new task' className="p-2 border-1 border-emerald-400 rounded-xl" />
          <label className="flex bg-emerald-500 p-2 hover:bg-emerald-400 rounded-xl w-[13.3rem]">Add Task
            <button type="button" onClick={() => handleOnClick()} />
          </label>
        </form>
        <section id="medium-status" className="flex w-[13.3rem]">
          {statusError?
            <p className="p-2 bg-red-500 rounded-xl">{statusError}</p>
            :null
          }
      
          {statusSuccess?
            <p className="p-2 bg-green-500 rounded-xl">{statusSuccess}</p>
            :null
          }
        </section>
      </section>
    </section>
  );
};
  
  