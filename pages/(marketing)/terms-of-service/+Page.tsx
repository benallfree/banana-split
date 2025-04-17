export default function Page() {
  return (
    <article className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-focus">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using Banana Split ("the Service"), you agree to be bound by these Terms of Service. If you do
        not agree to these terms, please do not use the Service.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        Banana Split is a tool designed to help couples divide their community property during an uncontested divorce.
        The Service provides features for tracking, managing, and documenting asset division.
      </p>

      <h2>3. User Responsibilities</h2>
      <ul>
        <li>You must provide accurate and complete information about your assets</li>
        <li>You are responsible for maintaining the confidentiality of your account</li>
        <li>You agree to use the Service in compliance with all applicable laws</li>
      </ul>

      <h2>4. Disclaimer of Legal Advice</h2>
      <p>
        The Service is not a substitute for legal advice. We recommend consulting with qualified legal professionals
        regarding your specific situation. The Service is provided "as is" without any warranties of any kind.
      </p>

      <h2>5. Privacy and Data Security</h2>
      <p>
        We take your privacy seriously. Your data is encrypted and stored securely. We do not share your information
        with third parties except as required by law.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        Banana Split shall not be liable for any indirect, incidental, special, consequential, or punitive damages
        resulting from your use of the Service.
      </p>

      <h2>7. Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes
        acceptance of the modified terms.
      </p>

      <h2>8. Contact Information</h2>
      <p>
        For questions about these Terms of Service, please contact us on{' '}
        <a href="https://x.com/benallfree" target="_blank" rel="noopener noreferrer">
          X.com
        </a>
      </p>
    </article>
  )
}
