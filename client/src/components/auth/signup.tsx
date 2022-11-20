import { Modal } from 'components/modal'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { useCreateUser } from 'hooks/auth/use-create-user'
import { Fragment, useState } from 'react'
import * as yup from 'yup'

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
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Fragment>
      <button className="px-5 py-2 bg-white rounded-full" onClick={() => setIsOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
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
            <div>Sign up</div>
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
            <button type="submit" className="flex items-center justify-center gap-2 bg-violet-600 p-2 rounded-md text-white w-full">
              Sign up
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
            </button>
          </Form>
        </Formik>
      </Modal>
    </Fragment>
  )
}
