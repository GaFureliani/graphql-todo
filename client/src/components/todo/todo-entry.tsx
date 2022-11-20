import { useTodoEntry } from 'hooks/todos/use-todo-entry'
import { todos_data } from 'hooks/todos/use-todos'
import DatePicker from 'react-datepicker'
type Todo = todos_data['todos'][number]

export const TodoEntry = (todo_data: Todo) => {
  const {
    todo,
    isModified,
    onDateChange,
    onDelete,
    onDescriptionChange,
    onDoneChange,
    onSave
  } = useTodoEntry(todo_data)

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
        <DatePicker
          timeIntervals={15}
          timeFormat="HH:mm"
          showTimeSelect
          className='p-2'
          dateFormat="MMMM dd, yyyy HH:mm"
          selected={new Date(todo.target_date)}
          onChange={onDateChange} />
      </td>
      <td>
        <div className='flex gap-2'>
          <button onClick={onSave} disabled={!isModified} className='px-4 py-2 rounded-full bg-violet-500 text-white disabled:bg-violet-300'>Save</button>
          <button onClick={onDelete} className='px-4 py-2 disabled:bg-violet-100 disabled:text-black transition-all duration-75 bg-gray-600 text-white rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  )
}
