import { useCallback, useEffect, useState } from 'react'
import ActionButtons from '../../components/ActionButtons'
import AssetsTable from '../../components/AssetsTable'
import Notification from '../../components/Notification'
import PartyInformation from '../../components/PartyInformation'
import TotalAllocations from '../../components/TotalAllocations'

interface Asset {
  id: string
  name: string
  value: number
  partyAPercentage: number
  partyBPercentage: number
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

export default function IndexPage() {
  const { data, setData, saveData, showNotification, setShowNotification } = useLocalStorage('assetSplitterData', {
    partyAName: '',
    partyBName: '',
    assets: [],
  })

  const { partyAName, partyBName, setPartyAName, setPartyBName } = usePartyNames(data.partyAName, data.partyBName)

  const { assets, addAsset, deleteAsset, updateAsset } = useAssets(data.assets)

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
    // TODO: Implement JSON import functionality
    console.log('Import JSON')
  }, [])

  const handleExport = useCallback(() => {
    // TODO: Implement JSON export functionality
    console.log('Export JSON')
  }, [])

  const handleGeneratePDF = useCallback(() => {
    // TODO: Implement PDF generation functionality
    console.log('Generate PDF')
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Asset Splitter</h1>

      <form className="space-y-8">
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

        <ActionButtons onImport={handleImport} onExport={handleExport} onGeneratePDF={handleGeneratePDF} />
      </form>

      <Notification message="Changes saved" isVisible={showNotification} onClose={() => setShowNotification(false)} />
    </div>
  )
}
