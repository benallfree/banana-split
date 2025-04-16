interface ActionButtonsProps {
  onImport: () => void
  onExport: () => void
  onGeneratePDF: () => void
}

export default function ActionButtons({ onImport, onExport, onGeneratePDF }: ActionButtonsProps) {
  return (
    <section className="flex flex-col sm:flex-row gap-4 justify-center">
      <button type="button" className="btn btn-outline w-full sm:w-auto" onClick={onImport}>
        Import JSON
      </button>
      <button type="button" className="btn btn-outline w-full sm:w-auto" onClick={onExport}>
        Export JSON
      </button>
      <button type="button" className="btn btn-primary w-full sm:w-auto" onClick={onGeneratePDF}>
        Generate PDF
      </button>
    </section>
  )
}
