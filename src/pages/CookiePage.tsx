import LegalPage from './LegalPage';

export default function CookiePage() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="Understand how SpeedBite uses cookies and similar technologies on our website."
    >
      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files that are placed on your device when you visit our website. 
        They help us provide you with a better experience by:
      </p>
      <ul>
        <li>Remembering your preferences</li>
        <li>Keeping you signed in</li>
        <li>Understanding how you use our service</li>
        <li>Improving our website functionality</li>
      </ul>

      <h2>2. Types of Cookies We Use</h2>
      
      <h3>Essential Cookies</h3>
      <p>
        These cookies are necessary for the website to function properly. They enable core functionality such as:
      </p>
      <ul>
        <li>Security features</li>
        <li>Account authentication</li>
        <li>Shopping cart functionality</li>
        <li>Basic site operations</li>
      </ul>

      <h3>Performance Cookies</h3>
      <p>
        These cookies collect information about how you use our website, such as:
      </p>
      <ul>
        <li>Which pages you visit most often</li>
        <li>Error messages you receive</li>
        <li>Loading times and other performance data</li>
      </ul>

      <h3>Functionality Cookies</h3>
      <p>
        These cookies remember your preferences and settings, including:
      </p>
      <ul>
        <li>Language preferences</li>
        <li>Location settings</li>
        <li>Personalization choices</li>
      </ul>

      <h3>Targeting/Advertising Cookies</h3>
      <p>
        These cookies are used to deliver relevant advertisements and track ad campaign performance:
      </p>
      <ul>
        <li>Track ad impressions</li>
        <li>Measure ad effectiveness</li>
        <li>Provide personalized advertisements</li>
      </ul>

      <h2>3. Third-Party Cookies</h2>
      <p>
        Some cookies are placed by third-party services that appear on our pages:
      </p>
      <ul>
        <li>Analytics providers (e.g., Google Analytics)</li>
        <li>Advertising networks</li>
        <li>Social media platforms</li>
        <li>Payment processors</li>
      </ul>

      <h2>4. Managing Cookies</h2>
      <p>
        You can control and manage cookies in various ways:
      </p>
      <ul>
        <li>Browser settings to block or delete cookies</li>
        <li>Our cookie consent tool on the website</li>
        <li>Third-party opt-out tools</li>
      </ul>

      <h2>5. Impact of Disabling Cookies</h2>
      <p>
        If you disable cookies, some features of our website may not function properly:
      </p>
      <ul>
        <li>Shopping cart may not work correctly</li>
        <li>Login sessions may not persist</li>
        <li>Preferences may not be saved</li>
        <li>Some pages may not display properly</li>
      </ul>

      <h2>6. Updates to This Policy</h2>
      <p>
        We may update this Cookie Policy periodically. Changes will be posted on this page with an updated 
        revision date.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have questions about our use of cookies, please contact us:
      </p>
      <ul>
        <li>Email: privacy@speedbite.com</li>
        <li>Phone: (123) 456-7890</li>
        <li>Address: 1234 Food Street, Foodville, FD 12345</li>
      </ul>
    </LegalPage>
  );
}