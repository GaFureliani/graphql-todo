import { GET_TODOS_RESPONSE } from "hooks/use-todos-query"
import { useState } from "react"

interface TodoListProps {
  todos: GET_TODOS_RESPONSE
}

export const TodoListItem = ({created_at,description,done,id,target_date,updated_at}: GET_TODOS_RESPONSE[number]) => {
  const [localDescription, setLocalDescription] = useState(description)
  return (
    <li className="group relative">
      <div className="opacity-0 group-hover:opacity-80 absolute">
        {"Created at " + created_at}
      </div>
      <input type="checkbox" checked={done} />
      <input type="text" name="description" value={localDescription} onChange={e => setLocalDescription(e.target.value)} />
    </li>
  )
}


export const TodoList = ({todos}: TodoListProps) => {
  return (
    <ul className="">
      {todos.map(t=>
        <TodoListItem key={t.id} {...t} />  
      )}
    </ul>
  )
}
