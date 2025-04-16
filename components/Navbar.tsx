import * as React from 'react'
import { DiscordIcon, GithubIcon, XIcon } from './GithubIcon'

const Navbar: React.FC = () => {
  const [isLandingPage, setIsLandingPage] = React.useState(false)

  React.useEffect(() => {
    setIsLandingPage(window.location.pathname === '/')
  }, [])

  return (
    <nav className="navbar bg-base-100 shadow-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {!isLandingPage && (
              <a href="/" className="flex-shrink-0 flex items-center">
                <img src="/assets/logo.svg" height={40} width={40} alt="logo" />
              </a>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <GithubIcon />
            <XIcon />
            <DiscordIcon />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
