export default function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-200 text-base-content">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex gap-4">
          <a href="/terms-of-service" className="link link-hover">
            Terms of Service
          </a>
          <a href="/privacy" className="link link-hover">
            Privacy Policy
          </a>
        </div>
        <div>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by Banana Split</p>
        </div>
      </div>
    </footer>
  )
}
