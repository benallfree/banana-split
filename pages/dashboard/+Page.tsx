import { useCallback, useEffect, useRef, useState } from 'react'
import ActionButtons from '../../components/ActionButtons'
import AssetsTable from '../../components/AssetsTable'
import ImportModal from '../../components/ImportModal'
import Notification from '../../components/Notification'
import PartyInformation from '../../components/PartyInformation'
import PDFTemplate from '../../components/PDFTemplate'
import TotalAllocations from '../../components/TotalAllocations'
import { useAssets } from '../../hooks/useAssets'
import { useCalculations } from '../../hooks/useCalculations'
import { useFileHandling } from '../../hooks/useFileHandling'
import { StoredData, useLocalStorage } from '../../hooks/useLocalStorage'
import { usePartyNames } from '../../hooks/usePartyNames'
import { generateAssetDivisionPDF } from '../../utils/pdfGenerator'

export function Page() {
  const { data, setData, saveData, showNotification, setShowNotification } = useLocalStorage('bananaData', {
    partyAName: '',
    partyBName: '',
    assets: [],
  })

  const { partyAName, partyBName, setPartyAName, setPartyBName } = usePartyNames(data.partyAName, data.partyBName)

  const { assets, addAsset, deleteAsset, updateAsset } = useAssets(data.assets)

  const {
    fileInputRef,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    triggerFileInput,
  } = useFileHandling(setData)

  const { calculatePartyATotal, calculatePartyBTotal } = useCalculations(assets)

  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const templateRef = useRef<HTMLDivElement>(null)

  // Debounced save
  useEffect(() => {
    const timer = setTimeout(() => {
      saveData({ partyAName, partyBName, assets })
    }, 500)
    return () => clearTimeout(timer)
  }, [partyAName, partyBName, assets, saveData])

  const handleImport = useCallback(() => {
    setIsImportModalOpen(true)
  }, [])

  const handleImportData = useCallback(
    (importedData: StoredData) => {
      setData(importedData)
      setShowNotification(true)
    },
    [setData, setShowNotification]
  )

  const handleExport = useCallback(() => {
    const dataToExport = {
      partyAName,
      partyBName,
      assets,
    }

    const jsonString = JSON.stringify(dataToExport, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'asset-splitter-data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [partyAName, partyBName, assets])

  const handleGeneratePDF = useCallback(() => {
    const template = (
      <PDFTemplate
        partyAName={partyAName}
        partyBName={partyBName}
        assets={assets}
        partyATotal={calculatePartyATotal()}
        partyBTotal={calculatePartyBTotal()}
      />
    )

    generateAssetDivisionPDF({
      partyAName,
      partyBName,
      assets,
      partyATotal: calculatePartyATotal(),
      partyBTotal: calculatePartyBTotal(),
      template,
    })
  }, [partyAName, partyBName, assets, calculatePartyATotal, calculatePartyBTotal])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Asset Splitter</h1>

      <form className="space-y-6 sm:space-y-8">
        <PartyInformation
          partyAName={partyAName}
          partyBName={partyBName}
          onPartyANameChange={setPartyAName}
          onPartyBNameChange={setPartyBName}
        />

        <AssetsTable
          assets={assets}
          onAddAsset={addAsset}
          onDeleteAsset={deleteAsset}
          onUpdateAsset={updateAsset}
          partyAName={partyAName}
          partyBName={partyBName}
        />

        <TotalAllocations
          partyATotal={calculatePartyATotal()}
          partyBTotal={calculatePartyBTotal()}
          partyAName={partyAName}
          partyBName={partyBName}
        />

        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${isDragging ? 'border-primary bg-primary/10' : 'border-base-300'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileInputChange} accept=".json" className="hidden" />
          <p className="text-base-content/70">Drag and drop a JSON file here or click the Import button</p>
        </div>

        <ActionButtons onImport={handleImport} onExport={handleExport} onGeneratePDF={handleGeneratePDF} />
      </form>

      <Notification message="Changes saved" isVisible={showNotification} onClose={() => setShowNotification(false)} />

      <ImportModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} onImport={handleImportData} />
    </div>
  )
}
