import { useCallback, useEffect, useState } from 'react'
import { Asset } from './useAssets'

export interface StoredData {
  partyAName: string
  partyBName: string
  assets: Asset[]
}

export const useLocalStorage = (key: string, initialData: StoredData) => {
  const [data, setData] = useState<StoredData>(initialData)
  const [showNotification, setShowNotification] = useState(false)

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
