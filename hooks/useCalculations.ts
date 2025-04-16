import { useCallback } from 'react'
import { Asset } from './useAssets'

export const useCalculations = (assets: Asset[]) => {
  const calculatePartyATotal = useCallback(() => {
    return assets.reduce((total, asset) => total + (asset.value * asset.partyAPercentage) / 100, 0)
  }, [assets])

  const calculatePartyBTotal = useCallback(() => {
    return assets.reduce((total, asset) => total + (asset.value * asset.partyBPercentage) / 100, 0)
  }, [assets])

  return {
    calculatePartyATotal,
    calculatePartyBTotal,
  }
}
