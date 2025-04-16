import { useEffect } from 'react'

interface NotificationProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export default function Notification({ message, isVisible, onClose }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  )
}
