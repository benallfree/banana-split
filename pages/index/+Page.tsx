import { useCallback, useEffect, useRef, useState } from 'react'
import ActionButtons from '../../components/ActionButtons'
import AssetsTable from '../../components/AssetsTable'
import ImportModal from '../../components/ImportModal'
import Notification from '../../components/Notification'
import PartyInformation from '../../components/PartyInformation'
import TotalAllocations from '../../components/TotalAllocations'
import { generateAssetDivisionPDF } from '../../utils/pdfGenerator'

interface Asset {
  id: string
  name: string
  value: number
  partyAPercentage: number
  partyBPercentage: number
  allocationType: 'split' | 'partyA' | 'partyB'
}

interface StoredData {
  partyAName: string
  partyBName: string
  assets: Asset[]
}

// Custom hook for managing assets
const useAssets = (initialAssets: Asset[] = []) => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets)

  // Update assets when initial values change
  useEffect(() => {
    setAssets(initialAssets)
  }, [initialAssets])

  const addAsset = useCallback(() => {
    const newAsset: Asset = {
      id: crypto.randomUUID(),
      name: '',
      value: 0,
      partyAPercentage: 50,
      partyBPercentage: 50,
      allocationType: 'split',
    }
    setAssets((prev) => [...prev, newAsset])
  }, [])

  const deleteAsset = useCallback((id: string) => {
    setAssets((prev) => prev.filter((asset) => asset.id !== id))
  }, [])

  const updateAsset = useCallback((updatedAsset: Asset) => {
    setAssets((prev) => prev.map((asset) => (asset.id === updatedAsset.id ? updatedAsset : asset)))
  }, [])

  return { assets, addAsset, deleteAsset, updateAsset }
}

// Custom hook for managing party names
const usePartyNames = (initialPartyAName = '', initialPartyBName = '') => {
  const [partyAName, setPartyAName] = useState(initialPartyAName)
  const [partyBName, setPartyBName] = useState(initialPartyBName)

  // Update state when initial values change
  useEffect(() => {
    setPartyAName(initialPartyAName)
    setPartyBName(initialPartyBName)
  }, [initialPartyAName, initialPartyBName])

  return {
    partyAName,
    partyBName,
    setPartyAName,
    setPartyBName,
  }
}

// Custom hook for localStorage persistence
const useLocalStorage = (key: string, initialData: StoredData) => {
  const [data, setData] = useState<StoredData>(initialData)
  const [showNotification, setShowNotification] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem(key)
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
      } catch (error) {
        console.error('Error parsing stored data:', error)
      }
    }
  }, [key])

  const saveData = useCallback(
    (newData: StoredData) => {
      localStorage.setItem(key, JSON.stringify(newData))
      setShowNotification(true)
    },
    [key]
  )

  return { data, setData, saveData, showNotification, setShowNotification }
}

// Custom hook for file handling
const useFileHandling = (setData: (data: StoredData) => void) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string)
          setData(jsonData)
        } catch (error) {
          console.error('Error parsing JSON file:', error)
          alert('Invalid JSON file format')
        }
      }
      reader.readAsText(file)
    },
    [setData]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
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

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return {
    fileInputRef,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    triggerFileInput,
  }
}

export default function IndexPage() {
  const { data, setData, saveData, showNotification, setShowNotification } = useLocalStorage('assetSplitterData', {
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

  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  // Debounced save
  useEffect(() => {
    const timer = setTimeout(() => {
      saveData({ partyAName, partyBName, assets })
    }, 500)
    return () => clearTimeout(timer)
  }, [partyAName, partyBName, assets, saveData])

  const calculatePartyATotal = useCallback(() => {
    return assets.reduce((total, asset) => total + (asset.value * asset.partyAPercentage) / 100, 0)
  }, [assets])

  const calculatePartyBTotal = useCallback(() => {
    return assets.reduce((total, asset) => total + (asset.value * asset.partyBPercentage) / 100, 0)
  }, [assets])

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
    const doc = generateAssetDivisionPDF({
      partyAName,
      partyBName,
      assets,
      partyATotal: calculatePartyATotal(),
      partyBTotal: calculatePartyBTotal(),
    })
    doc.save('asset-division-summary.pdf')
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
