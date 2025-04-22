import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../lib/queries/getTasks";

export default function Easy(){

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  });

  if(isLoading){
    return(
      <section id='easy-loading' className="flex flex-col m-2 p-2">
        <p className="text-2xl flex">Easy Task</p>
        <p>Loading...</p>
      </section>
    );
  };

  if(isError){
    return(
      <section id='easy-error' className="flex flex-col m-2 p-2">
        <p className="text-2xl flex">Easy Task</p>
        <p>{error.message}</p>
      </section>
    );
  }

  const listTasks = data.map((task) => 
    <li key={task.id}>{task.id}. {task.content}</li>
  );

  return(
    <section id='easy-task' className="flex flex-col m-2 p-2">
      <p className="text-2xl flex">Easy Task</p>
      <section className="flex">
        <ul>
          {listTasks}
        </ul>
      </section>
    </section>
  );
};