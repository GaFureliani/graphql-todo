import { Modal } from 'components/modal'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { useLogin } from 'hooks/auth/use-login'
import { Fragment, useState } from 'react'
import * as yup from 'yup'

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
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Fragment>
      <button className="px-5 py-2 bg-white rounded-full" onClick={() => setIsOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initial_values}
          onSubmit={({ email, password }) => {
            login({ variables: { login: { email, password } } })
          }}>
          <Form className="flex flex-col items-center md:w-[350px] pb-10 pt-5 px-4 gap-4 bg-white rounded-md">
            <div>Login</div>
            <div className="w-full">
              <Field name='email' className='block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none' placeholder='Email' />
              <ErrorMessage name='email' component='div' className="text-red-500"/>
            </div>
            <div className="w-full">
              <Field name='password' type='password' className='block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none' placeholder='Password' />
              <ErrorMessage name='password' component='div' className="text-red-500"/>
            </div>
            <button type="submit" className="flex items-center justify-center gap-2 bg-violet-600 p-2 rounded-md text-white w-full">
              Login
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </button>
          </Form>
        </Formik>
      </Modal>
    </Fragment>
  )
}
