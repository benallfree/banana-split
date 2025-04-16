import { useEffect, useState } from 'react'
import { navigate } from 'vike/client/router'
import { useDataManager } from '../contexts/DataManagerContext'

export function Landing() {
  const [partyA, setPartyA] = useState('')
  const [partyB, setPartyB] = useState('')
  const { setData } = useDataManager()

  useEffect(() => {
    // Check if data exists in localStorage
    const existingData = localStorage.getItem('bananaData')
    const urlParams = new URLSearchParams(window.location.search)
    const isDebug = urlParams.has('debug')

    if (existingData) {
      try {
        const parsedData = JSON.parse(existingData)
        // Pre-populate form with existing data
        if (parsedData.partyAName) setPartyA(parsedData.partyAName)
        if (parsedData.partyBName) setPartyB(parsedData.partyBName)

        // Only redirect if not in debug mode
        if (!isDebug) {
          navigate('/dashboard')
        }
      } catch (error) {
        console.error('Error parsing stored data:', error)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (partyA && partyB) {
      const initialData = {
        partyAName: partyA,
        partyBName: partyB,
        assets: [],
      }
      setData(initialData)
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="hero bg-base-200 py-16">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <img src="/assets/logo.svg" alt="Banana Split Logo" className="w-40 h-40 mx-auto mb-6" />
            <h1 className="text-6xl font-bold mb-4">Banana Split</h1>
            <p className="text-2xl mb-4">Manage Your Marital Assets Together</p>
            <div className="badge badge-accent badge-lg">Beta</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 mb-16">
            <form onSubmit={handleSubmit} className="card bg-base-200 shadow-xl p-8 lg:col-span-2">
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text text-lg">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered input-lg"
                  value={partyA}
                  onChange={(e) => setPartyA(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text text-lg">Partner's Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter partner's full name"
                  className="input input-bordered input-lg"
                  value={partyB}
                  onChange={(e) => setPartyB(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-full">
                Get Started
              </button>
            </form>

            <div className="lg:col-span-3 space-y-8">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Key Benefits</h2>
                  <ul className="list-disc list-inside space-y-3 text-lg">
                    <li>Plan ahead for life's unexpected changes</li>
                    <li>Address potential misunderstandings early and openly</li>
                    <li>Keep a clear record of shared financial decisions</li>
                  </ul>
                </div>
              </div>

              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Features</h2>
                  <ul className="list-disc list-inside space-y-3 text-lg">
                    <li>Maintain a living document that grows with you</li>
                    <li>Export legally-sound documentation anytime</li>
                    <li>Update and review together as needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="card bg-accent text-accent-content p-8 inline-block">
              <p className="text-2xl font-semibold mb-2">10 assets free, $99 for life</p>
              <p className="text-lg">Update early and often</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
