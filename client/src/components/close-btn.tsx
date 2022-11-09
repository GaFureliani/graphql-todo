import { DOMAttributes } from 'react'

export const CloseBtn = (props: DOMAttributes<HTMLButtonElement>) => {
  return (
    <button className="hover:bg-black/10 p-1" {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}
