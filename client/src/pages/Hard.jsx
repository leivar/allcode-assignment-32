import { useContext } from "react";
import HardAddItem from "../lib/components/hardAddItem";
import HardViewList from "../lib/components/hardViewList";
import editContext from "../lib/context/editContext";

export default function Hard(){

  const [isEdit, setIsEdit] = useContext(editContext);
  
  return(
    <section id="hard-task" className="mt-2 p-2">
      <p id="hard-task-title" className="text-2xl">Hard Task</p>
      <section id="hard-task-content" className="flex flex-col md:flex-row" >
        <HardViewList />
        <section>
          {isEdit?
            null:
            <section id="hard-default-view">
              <HardAddItem />
            </section>
          }
        </section>
      </section>
    </section>
  )
}