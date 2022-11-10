import { Appbar } from 'components/layout/appbar'
import { LoadingNotification } from 'components/loading-notification/loading-notification'
import { TodoTable } from 'components/todo/todo-table'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

export const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Appbar />
      <TodoTable />
      <ToastContainer />
      <LoadingNotification />
    </div>
  )
}
