interface ActionButtonsProps {
  onImport: () => void
  onExport: () => void
  onGeneratePDF: () => void
}

export default function ActionButtons({ onImport, onExport, onGeneratePDF }: ActionButtonsProps) {
  return (
    <section className="flex flex-wrap gap-4 justify-center">
      <button type="button" className="btn btn-outline" onClick={onImport}>
        Import JSON
      </button>
      <button type="button" className="btn btn-outline" onClick={onExport}>
        Export JSON
      </button>
      <button type="button" className="btn btn-primary" onClick={onGeneratePDF}>
        Generate PDF
      </button>
    </section>
  )
}
