import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface MigrationCompleteProps {
  success: boolean;
  onReset: () => void;
}

const MigrationComplete: React.FC<MigrationCompleteProps> = ({ success, onReset }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      {success ? (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Migration Completed Successfully</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            All selected entities have been successfully migrated to the target environment.
          </p>
          
          <div className="bg-green-50 border border-green-100 rounded-lg p-6 max-w-lg mx-auto mb-8">
            <h3 className="font-medium text-green-800 mb-4">Migration Summary</h3>
            <ul className="space-y-2 text-left">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-0.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-gray-700">All entities were migrated in a single transaction</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-0.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-gray-700">Database schema was updated successfully</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-0.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-gray-700">All dependencies were properly resolved</span>
              </li>
            </ul>
          </div>
          
          <button
            onClick={onReset}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors duration-300"
          >
            Start New Migration
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Migration Failed</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            An error occurred during the migration. All changes have been rolled back.
          </p>
          
          <div className="bg-red-50 border border-red-100 rounded-lg p-6 max-w-lg mx-auto mb-8 text-left">
            <h3 className="font-medium text-red-800 mb-4">Error Details</h3>
            <div className="bg-white border border-red-200 rounded p-3 font-mono text-sm text-red-800 mb-4">
              ERROR: Transaction aborted due to conflict with existing entities.
            </div>
            <p className="text-gray-700 mb-4">
              The transaction was rolled back to ensure data consistency. No changes were made to the target environment.
            </p>
            <h4 className="font-medium text-gray-800 mb-2">Troubleshooting Steps:</h4>
            <ul className="space-y-2 list-disc pl-5 text-gray-700">
              <li>Review the conflicting entities and resolve naming conflicts</li>
              <li>Ensure that required dependencies exist in the target environment</li>
              <li>Check for any schema version incompatibilities</li>
            </ul>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={onReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-6 rounded-md font-medium transition-colors duration-300"
            >
              Go Back
            </button>
            <button
              onClick={onReset}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors duration-300"
            >
              Start New Migration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MigrationComplete;