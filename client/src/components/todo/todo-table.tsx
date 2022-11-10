import { format, formatISO, formatRFC3339, getDate, parse, parseJSON } from 'date-fns'
import { Field, FieldArray, Form, Formik } from 'formik'
import { useAuth } from 'hooks/auth/use-auth'
import { useCreateTodo } from 'hooks/todos/use-create-todo'
import { useDeleteTodos } from 'hooks/todos/use-delete-todos'
import { todos, todos_data, useTodos } from 'hooks/todos/use-todos'
import { useUpdateTodo } from 'hooks/todos/use-update-todo'
import { ChangeEvent, useState } from 'react'
import DatePicker from 'react-datepicker'
type Todo = todos_data['todos'][number]

const TodoEntry = (todo_data: Todo) => {
  const [updateTodo] = useUpdateTodo()
  const [deleteTodos] = useDeleteTodos()

  const [todo, setTodo] = useState(todo_data)
  const [isModified, setIsModified] = useState(false)
  const onSave = () => {
    updateTodo({
      variables: {
        todo: {
          description: todo.description,
          done: todo.done,
          todo_id: todo.id,
          target_date: todo.target_date
        }
      }
    }).then(() => { setIsModified(false) })
  }

  const onDelete = () => {
    deleteTodos({
      variables: {
        todoIds: [todo.id]
      }
    })
  }

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(state => ({ ...state, description: e.target.value }))
    setIsModified(e.target.value !== todo_data.description)
  }
  const onDoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(state => ({ ...state, done: e.target.checked }))
    setIsModified(e.target.checked !== todo_data.done)
  }
  const onDateChange = (date: Date) => {
    setTodo(state => ({ ...state, target_date: format(date, 'yyyy-MM-dd') }))
    setIsModified(true)
    setIsModified(format(date, 'yyyy-MM-dd') !== todo_data.target_date)
  }
  return (
    <tr className='mt-2 border-2 py-2 even:bg-gray-100'>
      <td className="text-center">
        <div className='px-5'>
          {todo.id}
        </div>
      </td>
      <td className="text-center">
        <input type="checkbox" checked={todo.done} onChange={onDoneChange} className="w-5 h-5 accent-violet-700 text-white" />
      </td>
      <td className='text-center'>
        <input type="text" value={todo.description} onChange={onDescriptionChange} className="p-2 outline-none border-2 w-[max(90%,100px)]" />
      </td>
      <td className="text-center">
        {/* <DatePicker className='p-2' dateFormat="yyyy-MM-dd" selected={new Date(Date.parse(todo.target_date))} onChange={onDateChange} /> */}
      </td>
      <td>
        <div className='flex gap-2'>
          <button onClick={onSave} disabled={!isModified} className='px-4 py-2 disabled:bg-violet-100 disabled:text-black transition-all duration-75 hover:bg-violet-600 bg-violet-500 text-white rounded-md'>Save</button>
          <button onClick={onDelete} className='px-4 py-2 disabled:bg-violet-100 disabled:text-black transition-all duration-75 hover:bg-red-600 bg-red-500 text-white rounded-md'>Delete</button>
        </div>
      </td>
    </tr>
  )
}

export const TodoTable = () => {
  const { data } = useTodos()
  const [createTodo] = useCreateTodo()
  const { user } = useAuth()
  const onCreateTodo = () => {
    createTodo({
      variables: {
        todo: {
          description: '',
          done: false,
          target_date: format(new Date(), 'yyyy-MM-dd')
        }
      }
    })
  }
  if (user.access_token === '') {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <h2 className='text-xl'>Please login to see your todos.</h2>
      </div>
    )
  }
  if (typeof data === 'undefined') return null
  return (
    <div className='flex justify-center h-[calc(100%-62px)]'>
      <div className='w-[min(800px,100%)] bg-gray-50 h-full overflow-auto'>
        <table className="table-auto w-full ">
          <thead>
            <tr className="h-10 bg-violet-700 text-white">
              <th className="">id</th>
              <th className="">Done</th>
              <th className="">Description</th>
              <th className="">Target Date</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {(data.todos ?? []).map(t => (
              <TodoEntry key={t.id} {...t} />
            ))}
          </tbody>
        </table>
        <button
        onClick={onCreateTodo}
        className='px-4 py-2 disabled:bg-violet-100 disabled:text-black transition-all duration-75 hover:bg-violet-600 bg-violet-500 text-white rounded-md w-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  )
}
