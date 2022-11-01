import { Appbar } from "components/appbar"
import { Container } from "components/container"
import { TodoList } from "components/todo-list"
import { useTodosQuery } from "hooks/use-todos-query"

function App() {
  const {data, loading, error} = useTodosQuery()
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
