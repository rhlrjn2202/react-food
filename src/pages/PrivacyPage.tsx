import LegalPage from './LegalPage';

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Learn how SpeedBite collects, uses, and protects your personal information."
    >
      <h2>1. Information We Collect</h2>
      <p>
        We collect information that you provide directly to us, including:
      </p>
      <ul>
        <li>Name and contact information</li>
        <li>Delivery addresses</li>
        <li>Payment information</li>
        <li>Order history and preferences</li>
        <li>Communications with our support team</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use the information we collect to:
      </p>
      <ul>
        <li>Process and deliver your orders</li>
        <li>Communicate with you about your orders</li>
        <li>Send you marketing communications (with your consent)</li>
        <li>Improve our services</li>
        <li>Detect and prevent fraud</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>
        We may share your information with:
      </p>
      <ul>
        <li>Restaurants to fulfill your orders</li>
        <li>Delivery partners to complete deliveries</li>
        <li>Payment processors to handle transactions</li>
        <li>Service providers who assist our operations</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal data against:
      </p>
      <ul>
        <li>Unauthorized access</li>
        <li>Accidental loss</li>
        <li>Destruction or damage</li>
      </ul>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to:
      </p>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Object to data processing</li>
        <li>Withdraw consent</li>
      </ul>

      <h2>6. Cookies and Tracking</h2>
      <p>
        We use cookies and similar technologies to:
      </p>
      <ul>
        <li>Remember your preferences</li>
        <li>Understand how you use our service</li>
        <li>Provide personalized experiences</li>
        <li>Improve our website functionality</li>
      </ul>

      <h2>7. Marketing Communications</h2>
      <p>
        You can opt out of marketing communications at any time by:
      </p>
      <ul>
        <li>Clicking the "unsubscribe" link in our emails</li>
        <li>Updating your account preferences</li>
        <li>Contacting our support team</li>
      </ul>

      <h2>8. Children's Privacy</h2>
      <p>
        Our services are not directed to children under 13. We do not knowingly collect 
        personal information from children under 13.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
        the new policy on this page and updating the "Last Updated" date.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        For questions about this Privacy Policy, please contact:
      </p>
      <ul>
        <li>Email: privacy@speedbite.com</li>
        <li>Phone: (123) 456-7890</li>
        <li>Address: 1234 Food Street, Foodville, FD 12345</li>
      </ul>
    </LegalPage>
  );
}