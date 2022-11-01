import { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
}

export const Container = ({children}: ContainerProps) => {
  return (
    <div className="max-w-xl m-auto bg-red-500 h-[calc(100%-80px)]">
      {children}
    </div>
  )
}