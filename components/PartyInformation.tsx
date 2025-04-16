interface PartyInformationProps {
  partyAName: string
  partyBName: string
  onPartyANameChange: (name: string) => void
  onPartyBNameChange: (name: string) => void
}

export default function PartyInformation({
  partyAName,
  partyBName,
  onPartyANameChange,
  onPartyBNameChange,
}: PartyInformationProps) {
  return (
    <section className="card bg-base-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Party Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label" htmlFor="partyA">
            <span className="label-text">Party A Name</span>
          </label>
          <input
            type="text"
            id="partyA"
            className="input input-bordered"
            placeholder="Enter Party A's Name"
            value={partyAName}
            onChange={(e) => onPartyANameChange(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="partyB">
            <span className="label-text">Party B Name</span>
          </label>
          <input
            type="text"
            id="partyB"
            className="input input-bordered"
            placeholder="Enter Party B's Name"
            value={partyBName}
            onChange={(e) => onPartyBNameChange(e.target.value)}
          />
        </div>
      </div>
    </section>
  )
}
