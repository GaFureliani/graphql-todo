import { Appbar } from "components/appbar"
import { TodoTable } from "components/todo-table"
import { useAuth } from "hooks/use-auth"
import { useRefreshMutation } from "hooks/use-refresh-mutation"
import { useEffect } from "react"

function App() {
  const setUser = useAuth(state => state.setUser)
  const [refresh_user, { loading }] = useRefreshMutation()
  useEffect(() => {
    refresh_user().then(response => {
      if(response.data){
        setUser(response.data.refresh_token)
      }
    })
  }, [])

  return (
    <div className="h-screen flex flex-col">
      <Appbar></Appbar>
      <TodoTable />
    </div>
  )
}

export default App
