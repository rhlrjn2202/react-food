import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
      />
      <main className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <p className="mt-4 text-2xl font-semibold text-sand-800">Page not found</p>
          <p className="mt-2 text-sand-600">The page you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="btn-primary mt-8 inline-flex items-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}