interface Asset {
  id: string
  name: string
  value: number
  partyAPercentage: number
  partyBPercentage: number
  allocationType: 'split' | 'partyA' | 'partyB'
}

interface AssetsTableProps {
  assets: Asset[]
  onAddAsset: () => void
  onDeleteAsset: (id: string) => void
  onUpdateAsset: (asset: Asset) => void
  partyAName: string
  partyBName: string
}

export default function AssetsTable({
  assets,
  onAddAsset,
  onDeleteAsset,
  onUpdateAsset,
  partyAName,
  partyBName,
}: AssetsTableProps) {
  const handleAllocationTypeChange = (asset: Asset, newType: 'split' | 'partyA' | 'partyB') => {
    const updatedAsset = { ...asset, allocationType: newType }
    if (newType === 'partyA') {
      updatedAsset.partyAPercentage = 100
      updatedAsset.partyBPercentage = 0
    } else if (newType === 'partyB') {
      updatedAsset.partyAPercentage = 0
      updatedAsset.partyBPercentage = 100
    } else {
      updatedAsset.partyAPercentage = 50
      updatedAsset.partyBPercentage = 50
    }
    onUpdateAsset(updatedAsset)
  }

  return (
    <section className="card bg-base-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Assets</h2>
        <button type="button" className="btn btn-primary" onClick={onAddAsset}>
          Add Asset
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Value</th>
              <th>Allocation</th>
              {assets.some((asset) => asset.allocationType === 'split') && (
                <>
                  <th>{partyAName || 'Party A'} %</th>
                  <th>{partyBName || 'Party B'} %</th>
                </>
              )}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>
                  <input
                    type="text"
                    className="input input-bordered input-sm w-full"
                    value={asset.name}
                    onChange={(e) => onUpdateAsset({ ...asset, name: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input input-bordered input-sm w-full"
                    value={asset.value}
                    onChange={(e) => onUpdateAsset({ ...asset, value: Number(e.target.value) })}
                  />
                </td>
                <td>
                  <div className="join">
                    <button
                      type="button"
                      className={`join-item btn btn-sm ${asset.allocationType === 'partyA' ? 'btn-primary' : 'btn-ghost'}`}
                      onClick={() => handleAllocationTypeChange(asset, 'partyA')}
                    >
                      {partyAName || 'Party A'} Takes
                    </button>
                    <button
                      type="button"
                      className={`join-item btn btn-sm ${asset.allocationType === 'partyB' ? 'btn-primary' : 'btn-ghost'}`}
                      onClick={() => handleAllocationTypeChange(asset, 'partyB')}
                    >
                      {partyBName || 'Party B'} Takes
                    </button>
                    <button
                      type="button"
                      className={`join-item btn btn-sm ${asset.allocationType === 'split' ? 'btn-primary' : 'btn-ghost'}`}
                      onClick={() => handleAllocationTypeChange(asset, 'split')}
                    >
                      Split
                    </button>
                  </div>
                </td>
                {asset.allocationType === 'split' && (
                  <>
                    <td>
                      <input
                        type="number"
                        className="input input-bordered input-sm w-full"
                        value={asset.partyAPercentage}
                        onChange={(e) =>
                          onUpdateAsset({
                            ...asset,
                            partyAPercentage: Number(e.target.value),
                            partyBPercentage: 100 - Number(e.target.value),
                            allocationType: 'split',
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input input-bordered input-sm w-full"
                        value={asset.partyBPercentage}
                        onChange={(e) =>
                          onUpdateAsset({
                            ...asset,
                            partyBPercentage: Number(e.target.value),
                            partyAPercentage: 100 - Number(e.target.value),
                            allocationType: 'split',
                          })
                        }
                      />
                    </td>
                  </>
                )}
                <td>
                  <button className="btn btn-error btn-sm" onClick={() => onDeleteAsset(asset.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
