import './style.css'

import './tailwind.css'

import logoUrl from '../assets/logo.svg'
import Navbar from '../components/Navbar'

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className={'flex w-full max-w-5xl mx-auto flex-grow px-4 sm:px-6 lg:px-8'}>
        <Content>{children}</Content>
      </div>
    </div>
  )
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div id="sidebar" className={'p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200'}>
      {children}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container" className="w-full">
      <div id="page-content" className={'py-4 sm:py-6 min-h-screen'}>
        {children}
      </div>
    </div>
  )
}

function Logo() {
  return (
    <div className={'p-5 mb-2'}>
      <a href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </a>
    </div>
  )
}
