import { Field, Form, Formik, ErrorMessage} from "formik"
import { useLogin } from "hooks/auth/use-login"
import { useAuth } from "hooks/auth/use-auth"
import * as yup from 'yup'
import { LoginBtn } from "./login-btn"

const validationSchema = yup.object({
  email: yup.string().email('invalid email').required('Required'),
  password: yup.string().required('Required')
})

const initial_values = {
  email: '',
  password: ''
}

export const Login = () => {
  const [login] = useLogin()
  const setUser = useAuth(state => state.setUser)
  return (
    <Formik 
      validationSchema={validationSchema}
      initialValues={initial_values}
      onSubmit={({email, password}) => {
        login({variables: {login: {email, password, with_credentials: false}}})
        .then(res => {
          if(res.data) {
            setUser({
              id: res.data.login.id, 
              email: res.data.login.email, 
              access_token: res.data.login.access_token, 
              username: res.data.login.username
            })
          }
        })
      }}
    >
      <Form className="flex flex-col items-center md:w-[350px] pb-10 pt-5 px-4 gap-4 bg-white rounded-md">
        <div>Login</div>
        <div className="w-full">
          <Field name='email' className='block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none' placeholder='Email' />
          <ErrorMessage name='email' component='div' className="text-red-500"/>
        </div>
        <div className="w-full">
          <Field name='password' className='block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none' placeholder='Password' />
          <ErrorMessage name='password' component='div' className="text-red-500"/>
        </div>
        <LoginBtn />
      </Form>
    </Formik>
  )
}