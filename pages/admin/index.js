import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Admin() {
  const [paymentsEnabled, setPaymentsEnabled] = useState(false)

  useEffect(() => {
    async function load() {
      const r = await fetch('/api/admin/get-settings')
      const j = await r.json()
      setPaymentsEnabled(j.payments_enabled === 'true')
    }
    load()
  }, [])

  async function toggle() {
    await axios.post('/api/admin/toggle-payments', { enabled: !paymentsEnabled })
    setPaymentsEnabled(!paymentsEnabled)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold">ZK PRIME - Admin</h1>
      <div className="mt-6">
        <label className="flex items-center gap-4">
          <span>Payments Enabled</span>
          <button onClick={toggle} className={`px-4 py-2 rounded ${paymentsEnabled ? 'bg-yellow-500 text-black' : 'bg-gray-800'}`}>
            {paymentsEnabled ? 'ON' : 'OFF'}
          </button>
        </label>
      </div>
    </div>
  )
}
