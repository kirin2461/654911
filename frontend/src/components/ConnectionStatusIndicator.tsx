import { useNotifications } from '@/contexts/NotificationContext'
import { Wifi, WifiOff, Loader2 } from 'lucide-react'

export function ConnectionStatusIndicator() {
  const { connectionStatus } = useNotifications()

  if (connectionStatus === 'connected') {
    return null
  }

  const statusConfig = {
    disconnected: {
      icon: WifiOff,
      text: 'Отключено',
      bgColor: 'bg-red-500/90',
      animate: false
    },
    connecting: {
      icon: Loader2,
      text: 'Подключение...',
      bgColor: 'bg-yellow-500/90',
      animate: true
    },
    reconnecting: {
      icon: Loader2,
      text: 'Переподключение...',
      bgColor: 'bg-yellow-500/90',
      animate: true
    },
    error: {
      icon: WifiOff,
      text: 'Ошибка соединения',
      bgColor: 'bg-red-500/90',
      animate: false
    }
  }

  const config = statusConfig[connectionStatus] || statusConfig.disconnected
  const Icon = config.icon

  return (
    <div className={`fixed bottom-20 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm shadow-lg ${config.bgColor}`}>
      <Icon className={`w-4 h-4 ${config.animate ? 'animate-spin' : ''}`} />
      <span>{config.text}</span>
    </div>
  )
}
