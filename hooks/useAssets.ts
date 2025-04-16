import { useCallback, useEffect, useState } from 'react'

export interface Asset {
  id: string
  name: string
  value: number
  partyAPercentage: number
  partyBPercentage: number
  allocationType: 'split' | 'partyA' | 'partyB'
}

export const useAssets = (initialAssets: Asset[] = []) => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets)

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
