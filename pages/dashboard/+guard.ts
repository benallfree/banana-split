import { redirect } from 'vike/abort'

export function guard() {
  if (typeof window === 'undefined') return // Allow server-side rendering

  const existingData = localStorage.getItem('bananaData')
  if (!existingData) {
    throw redirect('/')
  }
}
