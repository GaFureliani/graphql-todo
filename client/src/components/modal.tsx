import { Fragment, ReactNode, useState } from 'react'
import { Transition } from '@headlessui/react'

interface ModalProps {
  children: ReactNode
  openButton: ReactNode
}

export const Modal = ({ children, openButton}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
      <Fragment>
        <span onClick={()=>setIsOpen(true)}>
          {openButton}
        </span>
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