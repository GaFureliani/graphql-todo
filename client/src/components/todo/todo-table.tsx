import { format } from "date-fns"
import { useTodos } from "hooks/todos/use-todos"

export const TodoTable = () => {
  const { data } = useTodos()
  return (
    <table className="mx-auto table-auto w-1/2 border-separate border-spacing-y-3">
      <thead className="">
        <tr className="bg-gray-500 text-white">
          <th className="">id</th>
          <th className="">Done</th>
          <th className="">Description</th>
          <th className="">Target Date</th>
        </tr>
      </thead>
      <tbody className="">
        {(data?.todos ?? []).map(t=>
          <tr key={t.id} className='mt-2 shadow-md border-2'>
            <td className="text-center">{t.id}</td>
            <td className="text-center">{<input type='checkbox' className="w-5 h-5 accent-violet-700 text-white" checked={t.done} />}</td>
            <td>{<input type="text" className="p-2 outline-none border-2 w-[max(90%,100px)]" value={t.description} />}</td>
            <td className="text-center">{format(new Date(t.target_date), 'yyyy-MM-dd HH:mm')}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
