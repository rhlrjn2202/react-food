import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-sand-200/80">
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-4 gap-8 pb-12 border-b border-sand-200">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-sand-900">
                Speed<span className="text-primary-600">Bite</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-sand-600 leading-relaxed">
              Delivering happiness, one bite at a time. Your favorite meals, delivered fast and fresh to your doorstep.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'YouTube' }
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full
                           bg-sand-100 text-sand-600 hover:bg-primary-100 hover:text-primary-600
                           transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-sand-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Hot Deals', path: '/hot-deals' },
                { label: 'Special Items', path: '/special-items' },
                { label: 'Search', path: '/search' }
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sand-600 hover:text-primary-600 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-sand-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {[
                { label: 'Terms of Service', path: '/terms' },
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Cookie Policy', path: '/cookies' },
                { label: 'Refund Policy', path: '/refunds' }
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sand-600 hover:text-primary-600 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="font-semibold text-sand-900 mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-sand-600">
              <li>
                <p>1234 Food Street</p>
                <p>Foodville, FD 12345</p>
              </li>
              <li>
                <a 
                  href="tel:+1234567890"
                  className="hover:text-primary-600 transition-colors"
                >
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@speedbite.com"
                  className="hover:text-primary-600 transition-colors"
                >
                  support@speedbite.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex items-center justify-between">
          <p className="text-sm text-sand-600">
            © {currentYear} SpeedBite. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              {['visa', 'mastercard', 'amex', 'paypal'].map(method => (
                <div
                  key={method}
                  className="w-8 h-8 rounded bg-sand-100 flex items-center justify-center"
                >
                  <span className="text-[0.6rem] uppercase text-sand-600 font-medium">
                    {method}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-sm text-sand-500">
              Crafted with ♥️ by SpeedBite Team
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}