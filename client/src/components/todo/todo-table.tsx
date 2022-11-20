import { useAuth } from 'hooks/auth/use-auth'
import { useTodoTable } from 'hooks/todos/use-todo-table'
import { TodoEntry } from './todo-entry'

export const TodoTable = () => {
  const { onCreateTodo, todos } = useTodoTable()
  const { user } = useAuth()
  if (user.access_token === '') {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <h2 className='text-xl'>Please login to see your todos.</h2>
      </div>
    )
  }
  if (typeof todos === 'undefined') return null
  return (
    <div className='flex justify-center h-[calc(100%-62px)] py-2'>
      <div className='w-[min(800px,100%)] bg-gray-50 h-full overflow-auto'>
        <table className="table-auto w-full ">
          <thead>
            <tr className="h-10 bg-gray-700 text-white">
              <th className='px-4'>id</th>
              <th className='px-4'>Done</th>
              <th className='px-4'>Description</th>
              <th className='px-4'>Target Date</th>
              <th className='w-[165.38px]'></th>
            </tr>
          </thead>
          <tbody>
            {todos.map(t => (
              <TodoEntry key={t.id} {...t} />
            ))}
          </tbody>
        </table>
        <button
        onClick={onCreateTodo}
        className='px-4 py-2 flex w-[min(90%,300px)] m-auto bg-gray-500 justify-center rounded-full mt-4 text-white'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  )
}
