import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface Asset {
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
}

export function generateAssetDivisionPDF({
  partyAName,
  partyBName,
  assets,
  partyATotal,
  partyBTotal,
}: GeneratePDFParams) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()

  // Title
  doc.setFontSize(20)
  doc.text('Asset Division Summary', pageWidth / 2, 20, { align: 'center' })

  // Party Information
  doc.setFontSize(12)
  doc.text(`Party A: ${partyAName || 'Party A'}`, 20, 40)
  doc.text(`Party B: ${partyBName || 'Party B'}`, 20, 50)

  // Assets Table
  const tableData = assets.map((asset) => {
    const allocation =
      asset.allocationType === 'split'
        ? `${asset.partyAPercentage}% / ${asset.partyBPercentage}%`
        : asset.allocationType === 'partyA'
          ? `${partyAName || 'Party A'} Takes`
          : `${partyBName || 'Party B'} Takes`

    return [
      asset.name,
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(asset.value),
      allocation,
    ]
  })

  autoTable(doc, {
    startY: 60,
    head: [['Asset Name', 'Value', 'Allocation']],
    body: tableData,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [66, 66, 66] },
  })

  // Totals
  const finalY = (doc as any).lastAutoTable.finalY + 20
  doc.setFontSize(12)
  doc.text('Total Allocations:', 20, finalY)
  doc.text(
    `${partyAName || 'Party A'}: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(partyATotal)}`,
    20,
    finalY + 10
  )
  doc.text(
    `${partyBName || 'Party B'}: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(partyBTotal)}`,
    20,
    finalY + 20
  )

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  return doc
}
