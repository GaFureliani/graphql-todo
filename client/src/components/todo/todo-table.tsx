import { format } from "date-fns"
import { todos_data, useTodos } from "hooks/todos/use-todos"
import { useUpdateTodo } from "hooks/todos/use-update-todo"
import { ChangeEvent, useEffect, useState } from "react"

type Todo = todos_data['todos'][number]

const TodoEntry = (data: Todo) => {
  const [updateTodo] = useUpdateTodo()
  const [todo, setTodo] = useState(data)

  const onDoneChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await updateTodo({
      variables: {
        todo: {
          todo_id: todo.id,
          done: e.target.checked
        }
      }
    })
  }
  const onTargetDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    
  }

  return (
    <tr className='mt-2 shadow-md border-2'>
      <td className="text-center">
        {todo.id}
      </td>
      <td className="text-center">
        <input type="checkbox" checked={data.done} onChange={onDoneChange} className="w-5 h-5 accent-violet-700 text-white" />
      </td>
      <td>
        <input type="text" className="p-2 outline-none border-2 w-[max(90%,100px)]" />
      </td>
      <td className="text-center">
        <input type="datetime-local" onChange={onTargetDateChange} value={format(new Date(todo.target_date), 'yyyy-MM-dd HH:mm')} />
      </td>
    </tr>
  )
}

export const TodoTable = () => {
  const { data } = useTodos()

  return (
    <table className="mx-auto table-auto w-1/2 border-separate border-spacing-y-3">
      <thead className="">
        <tr className="bg-gray-500 text-white h-15">
          <th className="">id</th>
          <th className="">Done</th>
          <th className="">Description</th>
          <th className="">Target Date</th>
        </tr>
      </thead>
      <tbody className="">
        {(data?.todos ?? []).map(t=>
          <TodoEntry key={t.id} {...t} />
        )}
      </tbody>
    </table>
  )
}
