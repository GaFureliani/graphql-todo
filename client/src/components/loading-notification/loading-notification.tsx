import { Transition } from '@headlessui/react'
import { useLoadingNotification } from 'hooks/loading-notification/use-loading-notification'
import { Fragment } from 'react'

export const LoadingNotification = () => {
  const { isLoading } = useLoadingNotification()
  return (
    <Transition
    as={Fragment}
    show={isLoading}
    appear={true}
    enter="transition-all duration-300"
    enterFrom="opacity-0 translate-y-full translate-x-1/4"
    enterTo="opacity-100 -translate-y-1/2 translate-x-1/4"
    leave="transition-all duration-300"
    leaveFrom="opacity-100 -translate-y-1/2 translate-x-1/4"
    leaveTo="opacity-0 translate-y-full translate-x-1/4"
    >
      <span className='fixed select-none flex gap-4 items-center rounded-md left-0 bottom-0 px-4 py-2 shadow-xl border border-violet-500'>
        Loading <img src="/loading.svg" alt="." />
      </span>
    </Transition>
  )
}
