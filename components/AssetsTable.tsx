interface Asset {
  id: string
  name: string
  value: number
  partyAPercentage: number
  partyBPercentage: number
}

interface AssetsTableProps {
  assets: Asset[]
  onAddAsset: () => void
  onDeleteAsset: (id: string) => void
  onUpdateAsset: (asset: Asset) => void
}

export default function AssetsTable({ assets, onAddAsset, onDeleteAsset, onUpdateAsset }: AssetsTableProps) {
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
              <th>Party A %</th>
              <th>Party B %</th>
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
                  <input
                    type="number"
                    className="input input-bordered input-sm w-full"
                    value={asset.partyAPercentage}
                    onChange={(e) =>
                      onUpdateAsset({
                        ...asset,
                        partyAPercentage: Number(e.target.value),
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
                      })
                    }
                  />
                </td>
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
