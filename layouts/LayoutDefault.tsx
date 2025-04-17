import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { DataManagerProvider } from '../contexts/DataManagerContext'
import './style.css'
import './tailwind.css'

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <DataManagerProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className={'flex w-full max-w-5xl mx-auto flex-grow px-4 sm:px-6 lg:px-8'}>
          <Content>{children}</Content>
        </div>
        <Footer />
      </div>
    </DataManagerProvider>
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
