interface TotalAllocationsProps {
  partyATotal: number
  partyBTotal: number
  partyAName: string
  partyBName: string
}

export default function TotalAllocations({ partyATotal, partyBTotal, partyAName, partyBName }: TotalAllocationsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <section className="card bg-base-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Total Allocations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat bg-base-100 rounded-box">
          <div className="stat-title">{partyAName || 'Party A'} Total</div>
          <div className="stat-value">{formatCurrency(partyATotal)}</div>
        </div>
        <div className="stat bg-base-100 rounded-box">
          <div className="stat-title">{partyBName || 'Party B'} Total</div>
          <div className="stat-value">{formatCurrency(partyBTotal)}</div>
        </div>
      </div>
    </section>
  )
}
