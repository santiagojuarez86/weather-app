import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="glass-dark rounded-2xl p-6 mb-4">
      <div className="flex items-center justify-center mb-4">
        <AlertCircle className="w-12 h-12 text-red-400" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Oops! Algo salió mal</h3>
        <p className="text-gray-300 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar</span>
          </button>
        )}
      </div>
    </div>
  )
}
