import React, { useState, useEffect } from 'react';
import { Bundle, MigrationStep } from '../types';
import { generateMockBundle } from '../utils/mockData';
import { Check, Package, Loader2 } from 'lucide-react';

interface BundlePackingProps {
  onComplete: (bundle: Bundle) => void;
}

const BundlePacking: React.FC<BundlePackingProps> = ({ onComplete }) => {
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate the bundle packing process
    const timer = setTimeout(() => {
      const generatedBundle = generateMockBundle();
      setBundle(generatedBundle);
      setLoading(false);
    }, 2000);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 - prev) / 10;
        return newProgress > 99 ? 99 : newProgress;
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleContinue = () => {
    if (bundle) {
      onComplete(bundle);
    }
  };

  const EntityCountCard = ({ count, label, icon }: { count: number; label: string; icon: React.ReactNode }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-3 border border-gray-100">
      <div className="bg-blue-50 p-2 rounded-md text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold">{count}</p>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Bundle Packing</h2>
      <p className="text-gray-600 mb-6">
        We're collecting all dependent entities including object types, properties, relations, and more.
      </p>

      {loading ? (
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Collecting Entities</h3>
          <p className="text-gray-500 mb-4 text-center">
            Analyzing dependencies and building the migration bundle...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1 max-w-md">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">{Math.round(progress)}% complete</p>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start">
            <div className="p-1 bg-blue-100 rounded-full mr-3 mt-1">
              <Check className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium text-blue-800">Bundle Created Successfully</h3>
              <p className="text-blue-700 text-sm">All dependencies have been collected and are ready for migration.</p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
            <Package className="w-5 h-5 mr-2 text-gray-600" />
            Bundle Contents
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {bundle && (
              <>
                <EntityCountCard 
                  count={bundle.summary.objectTypes} 
                  label="Object Types" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>} 
                />
                <EntityCountCard 
                  count={bundle.summary.properties} 
                  label="Properties" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10h10V2Z" /><path d="M22 12h-4v4h4v-4Z" /><path d="M10 12H6v4h4v-4Z" /><path d="M10 18H6v4h4v-4Z" /><path d="M16 18h-4v4h4v-4Z" /></svg>} 
                />
                <EntityCountCard 
                  count={bundle.summary.relations} 
                  label="Relations" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>} 
                />
                <EntityCountCard 
                  count={bundle.summary.objects} 
                  label="Objects" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>} 
                />
                <EntityCountCard 
                  count={bundle.summary.enums} 
                  label="Enums" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 6 4-4 4 4" /><path d="M12 2v14" /><path d="M6 10H2v10h20V10h-4" /></svg>} 
                />
                <EntityCountCard 
                  count={bundle.summary.prototypes} 
                  label="Prototypes" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/></svg>} 
                />
              </>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors duration-300 flex items-center"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BundlePacking;