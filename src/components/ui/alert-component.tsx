import type React from "react"

interface AlertComponentProps {
  message: string
}

export const AlertComponent: React.FC<AlertComponentProps> = ({ message }) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rouded-md shadow-lg  whitespace-nowrap text-sm z-[888]">
      <p>{message}</p>
    </div>
  )
}

