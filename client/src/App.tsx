import { Appbar } from 'components/layout/appbar'
import { TodoTable } from 'components/todo/todo-table'
import { refresh_token } from 'helpers/refresh-token'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Appbar />
      <TodoTable />
      <ToastContainer />
    </div>
  )
}
