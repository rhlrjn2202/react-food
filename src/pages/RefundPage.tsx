import LegalPage from './LegalPage';

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      description="Learn about SpeedBite's refund and compensation policies for food delivery orders."
    >
      <h2>1. Refund Eligibility</h2>
      <p>
        You may be eligible for a refund in the following situations:
      </p>
      <ul>
        <li>Order was not delivered</li>
        <li>Food arrived in unsatisfactory condition</li>
        <li>Significant delay in delivery</li>
        <li>Missing items from your order</li>
        <li>Incorrect items received</li>
      </ul>

      <h2>2. Refund Process</h2>
      <p>
        To request a refund:
      </p>
      <ol>
        <li>Report the issue within 24 hours of delivery</li>
        <li>Provide order number and details of the problem</li>
        <li>Include photos if applicable (for quality issues)</li>
        <li>Submit through our app or contact customer service</li>
      </ol>

      <h2>3. Refund Types</h2>
      
      <h3>Full Refunds</h3>
      <p>
        Full refunds are provided for:
      </p>
      <ul>
        <li>Orders that were never delivered</li>
        <li>Completely incorrect orders</li>
        <li>Food safety concerns</li>
        <li>Technical errors resulting in multiple charges</li>
      </ul>

      <h3>Partial Refunds</h3>
      <p>
        Partial refunds may be issued for:
      </p>
      <ul>
        <li>Missing items from an order</li>
        <li>Quality issues with specific items</li>
        <li>Excessive delivery delays</li>
        <li>Incomplete orders</li>
      </ul>

      <h2>4. Refund Timeframes</h2>
      <p>
        After approval, refunds are processed as follows:
      </p>
      <ul>
        <li>Credit/Debit Cards: 3-5 business days</li>
        <li>SpeedBite Credits: Immediate</li>
        <li>Bank Transfers: 5-7 business days</li>
        <li>Digital Wallets: 1-2 business days</li>
      </ul>

      <h2>5. Compensation Policy</h2>
      <p>
        In addition to refunds, we may offer:
      </p>
      <ul>
        <li>Delivery credits for future orders</li>
        <li>Discount vouchers</li>
        <li>Loyalty points compensation</li>
        <li>Free delivery on next order</li>
      </ul>

      <h2>6. Exceptions</h2>
      <p>
        Refunds may not be available for:
      </p>
      <ul>
        <li>Claims made after 24 hours</li>
        <li>Personal taste preferences</li>
        <li>Self-pickup orders after confirmation</li>
        <li>Customization errors by customer</li>
      </ul>

      <h2>7. Dispute Resolution</h2>
      <p>
        If you disagree with a refund decision:
      </p>
      <ol>
        <li>Contact customer service with additional information</li>
        <li>Provide any supporting documentation</li>
        <li>Request a supervisor review</li>
        <li>Allow 48 hours for escalated review</li>
      </ol>

      <h2>8. Changes to Policy</h2>
      <p>
        We reserve the right to modify this refund policy at any time. Changes will be effective immediately 
        upon posting to our website.
      </p>

      <h2>9. Contact Information</h2>
      <p>
        For refund-related inquiries:
      </p>
      <ul>
        <li>Email: refunds@speedbite.com</li>
        <li>Phone: (123) 456-7890</li>
        <li>24/7 Chat Support: Available in our app</li>
      </ul>
    </LegalPage>
  );
}