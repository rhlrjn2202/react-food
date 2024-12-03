import LegalPage from './LegalPage';

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Read SpeedBite's terms of service, which outline the rules and guidelines for using our food delivery service."
    >
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using SpeedBite's services, you agree to be bound by these Terms of Service. 
        If you do not agree to these terms, please do not use our services.
      </p>

      <h2>2. Service Description</h2>
      <p>
        SpeedBite provides an online platform connecting customers with local restaurants and food providers. 
        We facilitate the ordering and delivery of food items through our website and mobile applications.
      </p>

      <h2>3. User Accounts</h2>
      <p>
        To use certain features of our service, you must register for an account. You are responsible for:
      </p>
      <ul>
        <li>Maintaining the confidentiality of your account information</li>
        <li>All activities that occur under your account</li>
        <li>Notifying us immediately of any unauthorized use</li>
      </ul>

      <h2>4. Ordering and Payment</h2>
      <p>
        When placing an order through SpeedBite, you agree to provide current, complete, and accurate 
        purchase and account information. All payments must be made through our approved payment methods.
      </p>

      <h2>5. Delivery Terms</h2>
      <p>
        Delivery times are estimates and may vary based on:
      </p>
      <ul>
        <li>Restaurant preparation time</li>
        <li>Driver availability</li>
        <li>Traffic conditions</li>
        <li>Weather conditions</li>
      </ul>

      <h2>6. Cancellation Policy</h2>
      <p>
        Orders may be canceled without charge before the restaurant begins preparing your food. 
        Once preparation begins, cancellation may result in charges.
      </p>

      <h2>7. User Conduct</h2>
      <p>
        You agree not to:
      </p>
      <ul>
        <li>Use the service for any unlawful purpose</li>
        <li>Harass or abuse delivery personnel or restaurant staff</li>
        <li>Submit false or misleading information</li>
        <li>Attempt to gain unauthorized access to our systems</li>
      </ul>

      <h2>8. Limitation of Liability</h2>
      <p>
        SpeedBite is not liable for:
      </p>
      <ul>
        <li>Quality of food prepared by restaurants</li>
        <li>Accuracy of restaurant menu information</li>
        <li>Delivery delays due to circumstances beyond our control</li>
        <li>Indirect or consequential damages</li>
      </ul>

      <h2>9. Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Changes will be effective immediately 
        upon posting to our website. Your continued use of our services constitutes acceptance of these changes.
      </p>

      <h2>10. Contact Information</h2>
      <p>
        If you have any questions about these Terms of Service, please contact us at:
      </p>
      <ul>
        <li>Email: legal@speedbite.com</li>
        <li>Phone: (123) 456-7890</li>
        <li>Address: 1234 Food Street, Foodville, FD 12345</li>
      </ul>
    </LegalPage>
  );
}