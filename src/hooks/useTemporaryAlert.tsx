import { useState, useEffect, useCallback } from "react"

export const useTemporaryAlert = (duration = 3000) => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")

  const showAlert = useCallback((newMessage: string) => {
    setMessage(newMessage)
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration])

  return { isVisible, message, showAlert }
}

