import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { Asset } from '../utils/pdfGenerator'

export interface StoredData {
  partyAName: string
  partyBName: string
  assets: Asset[]
}

interface DataManagerContextType {
  data: StoredData
  setData: (data: StoredData) => void
  saveData: (data: StoredData) => void
  showNotification: boolean
  setShowNotification: (show: boolean) => void
  partyAName: string
  partyBName: string
  setPartyAName: (name: string) => void
  setPartyBName: (name: string) => void
  assets: Asset[]
  addAsset: () => void
  deleteAsset: (id: string) => void
  updateAsset: (asset: Asset) => void
  calculatePartyATotal: () => number
  calculatePartyBTotal: () => number
}

const DataManagerContext = createContext<DataManagerContextType | null>(null)

export function DataManagerProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoredData>({
    partyAName: '',
    partyBName: '',
    assets: [],
  })
  const [showNotification, setShowNotification] = useState(false)
  const [partyAName, setPartyAName] = useState('')
  const [partyBName, setPartyBName] = useState('')
  const [assets, setAssets] = useState<Asset[]>([])

  // Load initial data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('bananaData')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
        setPartyAName(parsedData.partyAName)
        setPartyBName(parsedData.partyBName)
        setAssets(parsedData.assets)
      } catch (error) {
        console.error('Error parsing stored data:', error)
      }
    }
  }, [])

  // Save data to localStorage
  const saveData = useCallback((newData: StoredData) => {
    localStorage.setItem('bananaData', JSON.stringify(newData))
    setShowNotification(true)
  }, [])

  // Asset management
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

  // Calculations
  const calculatePartyATotal = useCallback(() => {
    return assets.reduce((total, asset) => total + (asset.value * asset.partyAPercentage) / 100, 0)
  }, [assets])

  const calculatePartyBTotal = useCallback(() => {
    return assets.reduce((total, asset) => total + (asset.value * asset.partyBPercentage) / 100, 0)
  }, [assets])

  // Debounced save
  useEffect(() => {
    const timer = setTimeout(() => {
      saveData({ partyAName, partyBName, assets })
    }, 500)
    return () => clearTimeout(timer)
  }, [partyAName, partyBName, assets, saveData])

  const value = {
    data,
    setData,
    saveData,
    showNotification,
    setShowNotification,
    partyAName,
    partyBName,
    setPartyAName,
    setPartyBName,
    assets,
    addAsset,
    deleteAsset,
    updateAsset,
    calculatePartyATotal,
    calculatePartyBTotal,
  }

  return <DataManagerContext.Provider value={value}>{children}</DataManagerContext.Provider>
}

export function useDataManager() {
  const context = useContext(DataManagerContext)
  if (!context) {
    throw new Error('useDataManager must be used within a DataManagerProvider')
  }
  return context
}
