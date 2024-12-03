import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import SEO from '../components/SEO';

interface LegalPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, description, children }: LegalPageProps) {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title={title}
        description={description}
      />
      <div className={`min-h-screen bg-sand-50 ${isMobile ? 'pb-safe' : ''}`}>
        {/* Header */}
        <div className={`bg-white border-b border-sand-200 ${isMobile ? '' : 'pt-16'} sticky top-0 z-10`}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              {isMobile && (
                <button 
                  onClick={() => navigate(-1)}
                  className="group flex items-center text-sand-600 hover:text-sand-900 transition-colors mb-4"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Back</span>
                </button>
              )}
              <h1 className="text-2xl font-bold text-sand-900">{title}</h1>
              <p className="mt-1 text-sm text-sand-600">Last updated: January 1, 2024</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
            <div className="legal-content">
              {/* Custom styling for legal content */}
              <style jsx>{`
                .legal-content {
                  @apply text-sand-700 leading-relaxed;
                }
                .legal-content h2 {
                  @apply text-xl font-semibold text-sand-900 mt-8 mb-4 first:mt-0;
                }
                .legal-content h3 {
                  @apply text-lg font-medium text-sand-800 mt-6 mb-3;
                }
                .legal-content p {
                  @apply mb-4 leading-relaxed text-[15px];
                }
                .legal-content ul, .legal-content ol {
                  @apply mb-4 pl-5;
                }
                .legal-content li {
                  @apply mb-2 text-[15px] leading-relaxed relative;
                }
                .legal-content ul li::before {
                  content: '';
                  @apply absolute w-1.5 h-1.5 bg-primary-500 rounded-full left-[-1rem] top-[0.6rem];
                }
                .legal-content ol {
                  @apply list-decimal pl-6;
                }
                .legal-content ol li {
                  @apply pl-1;
                }
                .legal-content a {
                  @apply text-primary-600 hover:text-primary-700 underline;
                }
              `}</style>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}