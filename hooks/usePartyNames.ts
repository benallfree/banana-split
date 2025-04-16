import { useEffect, useState } from 'react'

export const usePartyNames = (initialPartyAName = '', initialPartyBName = '') => {
  const [partyAName, setPartyAName] = useState(initialPartyAName)
  const [partyBName, setPartyBName] = useState(initialPartyBName)

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
