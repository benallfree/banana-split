import { useCallback, useRef, useState } from 'react'

interface ImportModalProps {
  isOpen: boolean
  onClose: () => void
  onImport: (data: any) => void
}

export default function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string)
          onImport(jsonData)
          onClose()
        } catch (error) {
          console.error('Error parsing JSON file:', error)
          setError('Invalid JSON file format')
        }
      }
      reader.readAsText(file)
    },
    [onImport, onClose]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setError(null)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelect(e.dataTransfer.files[0])
      }
    },
    [handleFileSelect]
  )

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelect(e.target.files[0])
      }
    },
    [handleFileSelect]
  )

  const handleFileButtonClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box relative">
        <h3 className="font-bold text-lg mb-4">Import Data</h3>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? 'border-primary bg-primary/10' : 'border-base-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileInputChange} accept=".json" className="hidden" />

          <div className="flex flex-col items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-base-content/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-base-content/70">Drag and drop a JSON file here</p>
            <div className="divider">OR</div>
            <button type="button" className="btn btn-outline" onClick={handleFileButtonClick}>
              Choose File
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}
