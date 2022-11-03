import { Appbar } from "components/appbar"
import { Container } from "components/container"
import { TodoList } from "components/todo-list"
import { useAuth } from "hooks/use-auth"
import { useLogin } from "hooks/use-login"
import { useRefreshMutation } from "hooks/use-refresh-mutation"
import { useTodosQuery } from "hooks/use-todos-query"
import { useEffect } from "react"

function App() {
  const {data, loading, error} = useTodosQuery()
  const setUser = useAuth(state => state.setUser)
  const [refresh_user] = useRefreshMutation()
  useEffect(() => {
    refresh_user().then(response => {
      if(response.data){
        setUser(response.data.refresh_token)

      }
    })
  }, [])

  return (
    <div className="h-screen">
      <Appbar></Appbar>
      <Container>
        <TodoList todos={data ?? []} />
      </Container>
    </div>
  )
}

export default App
