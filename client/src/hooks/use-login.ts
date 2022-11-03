import { useAuth } from "./use-auth"
import { useLoginMutation } from "./use-login-mutation"

export const useLogin = () => {
  const {setUser} = useAuth()
  const [loginMutation, { loading }] = useLoginMutation()
  const login = ({email, password}: {email:string, password: string}) => {
    loginMutation({
        variables: {
          login_data: {
            email,
            password
          }
        }
      })
      .then(response => {
        if(response.data){
          setUser(response.data.login_user)
        } else {
          console.log(response.errors)
        }
      })
  }
  return {loading, login}
}