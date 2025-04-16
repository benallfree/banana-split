import { pdf, type DocumentProps } from '@react-pdf/renderer'
import { type ReactElement } from 'react'

export interface Asset {
  id: string
  name: string
  value: number
  partyAPercentage: number
  partyBPercentage: number
  allocationType: 'split' | 'partyA' | 'partyB'
}

interface GeneratePDFParams {
  partyAName: string
  partyBName: string
  assets: Asset[]
  partyATotal: number
  partyBTotal: number
  template: ReactElement<DocumentProps>
}

export async function generateAssetDivisionPDF({
  partyAName,
  partyBName,
  assets,
  partyATotal,
  partyBTotal,
  template,
}: GeneratePDFParams) {
  const blob = await pdf(template).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'community-property-division-agreement.pdf'
  link.click()
  URL.revokeObjectURL(url)
}
