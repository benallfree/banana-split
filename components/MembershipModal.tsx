interface MembershipModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="card bg-base-100 max-w-lg w-full mx-4">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Upgrade to Add More Assets</h2>
          <p className="text-lg mb-6">
            You've reached the free tier limit of 10 assets. Upgrade to our premium plans to add unlimited assets.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <a
              href="https://buy.polar.sh/polar_cl_uYCk1m4tm0hoDUwGSsHvVprn1yzb5jAwgN72T2HxdnK"
              className="card bg-primary text-primary-content p-4 hover:bg-primary-focus transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-lg font-bold mb-2">Founder's Edition</h3>
              <p className="text-xl font-bold">$9.99</p>
              <p className="text-sm mt-2">Limited to 100 users</p>
            </a>

            <a
              href="https://buy.polar.sh/polar_cl_nD96G5nqGcrVzvgpVcT2PPsUOdZduCRmKLy3f4co2pF"
              className="card bg-secondary text-secondary-content p-4 hover:bg-secondary-focus transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-lg font-bold mb-2">Lifetime Membership</h3>
              <p className="text-xl font-bold">$99</p>
              <p className="text-sm mt-2">One-time payment, lifetime access</p>
            </a>
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-ghost" onClick={onClose}>
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
