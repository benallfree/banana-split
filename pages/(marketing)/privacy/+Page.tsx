export default function Page() {
  return (
    <article className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-focus">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Introduction</h2>
      <p>
        At Banana Split, we take your privacy seriously. This Privacy Policy explains our commitment to protecting your
        information when you use our service.
      </p>

      <h2>2. Local-Only Data Storage</h2>
      <p>
        Banana Split is designed with your privacy in mind. We collect <strong>no data whatsoever</strong> from our
        users. All information you enter into the application remains on your device and is stored locally in your
        browser.
      </p>
      <p>This means:</p>
      <ul>
        <li>Your asset information is stored only on your device</li>
        <li>No data is transmitted to our servers</li>
        <li>No personal information is collected or processed by us</li>
        <li>You maintain complete control over your data</li>
      </ul>

      <h2>3. Data Export and Backup</h2>
      <p>
        While we don't store your data on our servers, we provide functionality to export your data as JSON files. These
        files are stored on your device and can be used to back up your information or transfer it to another device.
      </p>

      <h2>4. Cookies and Local Storage</h2>
      <p>
        Banana Split uses browser local storage to save your asset information locally on your device. This is necessary
        for the application to function properly and remember your data between sessions. No cookies are used for
        tracking or analytics purposes.
      </p>

      <h2>5. Third-Party Services</h2>
      <p>
        Banana Split does not integrate with any third-party services that collect user data. We do not use analytics
        tools, advertising networks, or any other services that might track your usage of our application.
      </p>

      <h2>6. Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
        Policy on this page and updating the "Last updated" date.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us on{' '}
        <a href="https://x.com/benallfree" target="_blank" rel="noopener noreferrer">
          X.com
        </a>
      </p>
    </article>
  )
}
