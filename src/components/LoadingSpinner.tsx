export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-dark rounded-3xl p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          <p className="text-white text-lg">Cargando clima...</p>
        </div>
      </div>
    </div>
  )
}
