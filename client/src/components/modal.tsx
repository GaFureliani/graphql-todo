import { Fragment, ReactNode, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CloseBtn } from './close-btn'

interface ModalProps {
  title: string
  children: ReactNode
  buttonText: string
}

export const Modal = ({ children, title, buttonText}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
      <Fragment>
        <button onClick={() => setIsOpen(true)}>{buttonText}</button>
        <Transition
        show={isOpen}
        enter="transition duration-150 ease-out"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition duration-150 ease-out"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
        className='fixed inset-0 z-10 grid justify-center content-center'
      >
        <div className="fixed inset-0 bg-black/30" onClick={() => setIsOpen(false)} aria-hidden="true" />
        <div className='relative'>
          {children}
        </div>
      </Transition>
    </Fragment>
  )
}