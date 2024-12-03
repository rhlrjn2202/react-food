import { Loader2 } from 'lucide-react';

export default function MobileHeroSlider() {
  return (
    <div className="h-48 bg-sand-100 rounded-xl mx-4 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary-600 mx-auto mb-2" />
        <p className="text-sand-600 text-sm">Loading...</p>
      </div>
    </div>
  );
}