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
    <section className="card bg-base-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">Assets</h2>
        <button type="button" className="btn btn-primary w-full sm:w-auto" onClick={onAddAsset}>
          Add Asset
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-4">
        {assets.map((asset) => (
          <div key={asset.id} className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <div className="flex justify-between items-start mb-2">
                <input
                  type="text"
                  className="input input-bordered input-sm flex-1 mr-2"
                  placeholder="Asset Name"
                  value={asset.name}
                  onChange={(e) => onUpdateAsset({ ...asset, name: e.target.value })}
                />
                <button className="btn btn-error btn-sm" onClick={() => onDeleteAsset(asset.id)}>
                  Delete
                </button>
              </div>

              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text">Value</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered input-sm w-full"
                  value={asset.value}
                  onChange={(e) => onUpdateAsset({ ...asset, value: Number(e.target.value) })}
                />
              </div>

              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text">Allocation</span>
                </label>
                <div className="join join-vertical w-full">
                  <button
                    type="button"
                    className={`join-item btn btn-sm w-full ${asset.allocationType === 'partyA' ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => handleAllocationTypeChange(asset, 'partyA')}
                  >
                    {partyAName || 'Party A'} Takes
                  </button>
                  <button
                    type="button"
                    className={`join-item btn btn-sm w-full ${asset.allocationType === 'partyB' ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => handleAllocationTypeChange(asset, 'partyB')}
                  >
                    {partyBName || 'Party B'} Takes
                  </button>
                  <button
                    type="button"
                    className={`join-item btn btn-sm w-full ${asset.allocationType === 'split' ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => handleAllocationTypeChange(asset, 'split')}
                  >
                    Split
                  </button>
                </div>
              </div>

              {asset.allocationType === 'split' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">{partyAName || 'Party A'} %</span>
                    </label>
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
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">{partyBName || 'Party B'} %</span>
                    </label>
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
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Value</th>
              <th className="min-w-[300px]">Allocation</th>
              <th>{partyAName || 'Party A'} %</th>
              <th>{partyBName || 'Party B'} %</th>
              <th className="w-[100px]">Actions</th>
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
                  <div className="join w-full">
                    <button
                      type="button"
                      className={`join-item btn btn-sm flex-1 ${asset.allocationType === 'partyA' ? 'btn-primary' : 'btn-ghost'}`}
                      onClick={() => handleAllocationTypeChange(asset, 'partyA')}
                    >
                      {partyAName || 'Party A'} Takes
                    </button>
                    <button
                      type="button"
                      className={`join-item btn btn-sm flex-1 ${asset.allocationType === 'partyB' ? 'btn-primary' : 'btn-ghost'}`}
                      onClick={() => handleAllocationTypeChange(asset, 'partyB')}
                    >
                      {partyBName || 'Party B'} Takes
                    </button>
                    <button
                      type="button"
                      className={`join-item btn btn-sm flex-1 ${asset.allocationType === 'split' ? 'btn-primary' : 'btn-ghost'}`}
                      onClick={() => handleAllocationTypeChange(asset, 'split')}
                    >
                      Split
                    </button>
                  </div>
                </td>
                <td className="pl-4">
                  {asset.allocationType === 'split' ? (
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
                  ) : (
                    <div className="h-[32px]" />
                  )}
                </td>
                <td className="pl-4">
                  {asset.allocationType === 'split' ? (
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
                  ) : (
                    <div className="h-[32px]" />
                  )}
                </td>
                <td>
                  <button className="btn btn-error btn-sm w-full" onClick={() => onDeleteAsset(asset.id)}>
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
