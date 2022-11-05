import { Appbar } from "components/layout/appbar"
import { TodoTable } from "components/todo/todo-table"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Appbar></Appbar>
      <TodoTable />
      <ToastContainer />
    </div>
  )
}

export default App
