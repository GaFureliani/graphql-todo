import { Field, Form, Formik, ErrorMessage } from 'formik'
import { useCreateUser } from 'hooks/auth/use-create-user'
import * as yup from 'yup'
import { LoginBtn } from './login-btn'

const validationSchema = yup.object({
  email: yup.string().email('invalid email').required('Required'),
  password: yup.string().required('Required'),
  username: yup.string().required('Required')
})

const initial_values = {
  email: '',
  username: '',
  password: ''
}

export const SignUp = () => {
  const [createUser] = useCreateUser()
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initial_values}
      onSubmit={({ email, password, username }) => {
        createUser({
          variables: {
            user: {
              email,
              password,
              username
            }
          }
        })
      }}
    >
      <Form className="flex flex-col items-center md:w-[350px] pb-10 pt-5 px-4 gap-4 bg-white rounded-md">
        <div>Login</div>
        <div className="w-full">
          <Field name='username' className='block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none' placeholder='User name' />
          <ErrorMessage name='username' component='div' className="text-red-500"/>
        </div>
        <div className="w-full">
          <Field name='email' className='block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none' placeholder='Email' />
          <ErrorMessage name='email' component='div' className="text-red-500"/>
        </div>
        <div className="w-full">
          <Field name='password' type='password' className='block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none' placeholder='Password' />
          <ErrorMessage name='password' component='div' className="text-red-500"/>
        </div>
        <LoginBtn />
      </Form>
    </Formik>
  )
}
