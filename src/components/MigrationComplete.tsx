import React from 'react';
import { CheckCircle, XCircle, Clock, Database, ArrowRight, Server, CheckSquare } from 'lucide-react';

interface MigrationCompleteProps {
  success: boolean;
  onReset: () => void;
  migrationDetails?: {
    sourceInstance: string;
    targetInstance: string;
    entityCount: number;
    duration: string;
    timestamp: string;
  };
}

const MigrationComplete: React.FC<MigrationCompleteProps> = ({ 
  success, 
  onReset,
  migrationDetails = {
    sourceInstance: 'DEV-Instance',
    targetInstance: 'UAT-Instance',
    entityCount: 47,
    duration: '00:01:23',
    timestamp: new Date().toISOString()
  }
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 w-full">
      {success ? (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6 shadow-md">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center justify-center">
            <CheckSquare className="mr-2 h-6 w-6 text-green-600" />
            Migration Completed Successfully
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            All selected entities have been successfully migrated to the target environment.
          </p>
          
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 max-w-lg mx-auto mb-8 shadow-sm">
            <h3 className="font-medium text-green-800 mb-4">Migration Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                <div className="flex items-center mb-2">
                  <Server className="text-green-600 mr-2 h-5 w-5" />
                  <h4 className="font-medium text-gray-800">Source → Target</h4>
                </div>
                <p className="text-gray-700 flex items-center">
                  {migrationDetails.sourceInstance}
                  <ArrowRight className="mx-2 h-4 w-4 text-gray-500" />
                  {migrationDetails.targetInstance}
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                <div className="flex items-center mb-2">
                  <Database className="text-green-600 mr-2 h-5 w-5" />
                  <h4 className="font-medium text-gray-800">Entities Migrated</h4>
                </div>
                <p className="text-gray-700">
                  {migrationDetails.entityCount} entities
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                <div className="flex items-center mb-2">
                  <Clock className="text-green-600 mr-2 h-5 w-5" />
                  <h4 className="font-medium text-gray-800">Duration</h4>
                </div>
                <p className="text-gray-700">
                  {migrationDetails.duration}
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                <div className="flex items-center mb-2">
                  <CheckCircle className="text-green-600 mr-2 h-5 w-5" />
                  <h4 className="font-medium text-gray-800">Status</h4>
                </div>
                <p className="text-gray-700">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Success
                  </span>
                </p>
              </div>
            </div>
            
            <div className="border-t border-green-100 pt-4 mt-2 bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-800 mb-2">Details</h4>
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
            
            <div className="mt-4 text-right text-xs text-gray-500">
              Migration ID: {migrationDetails.timestamp.substring(0, 10)}-{Math.floor(Math.random() * 1000)}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 inline-block">
            <button
              onClick={onReset}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M8 16H3v5"></path>
              </svg>
              Start New Migration
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6 shadow-md">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center justify-center">
            <XCircle className="mr-2 h-6 w-6 text-red-600" />
            Migration Failed
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            An error occurred during the migration. All changes have been rolled back.
          </p>
          
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 max-w-lg mx-auto mb-8 text-left shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 border border-red-100 shadow-sm">
                <div className="flex items-center mb-2">
                  <Server className="text-red-600 mr-2 h-5 w-5" />
                  <h4 className="font-medium text-gray-800">Source → Target</h4>
                </div>
                <p className="text-gray-700 flex items-center">
                  {migrationDetails.sourceInstance}
                  <ArrowRight className="mx-2 h-4 w-4 text-gray-500" />
                  {migrationDetails.targetInstance}
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-red-100 shadow-sm">
                <div className="flex items-center mb-2">
                  <Database className="text-red-600 mr-2 h-5 w-5" />
                  <h4 className="font-medium text-gray-800">Entities Attempted</h4>
                </div>
                <p className="text-gray-700">
                  {migrationDetails.entityCount} entities
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-red-100 shadow-sm">
                <div className="flex items-center mb-2">
                  <Clock className="text-red-600 mr-2 h-5 w-5" />
                  <h4 className="font-medium text-gray-800">Duration</h4>
                </div>
                <p className="text-gray-700">
                  {migrationDetails.duration}
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-red-100 shadow-sm">
                <div className="flex items-center mb-2">
                  <XCircle className="text-red-600 mr-2 h-5 w-5" />
                  <h4 className="font-medium text-gray-800">Status</h4>
                </div>
                <p className="text-gray-700">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Failed
                  </span>
                </p>
              </div>
            </div>
            
            <h3 className="font-medium text-red-800 mb-4">Error Details</h3>
            <div className="bg-white border-l-4 border-red-500 rounded p-3 font-mono text-sm text-red-800 mb-4 shadow-sm">
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
            
            <div className="mt-4 text-right text-xs text-gray-500">
              Migration ID: {migrationDetails.timestamp.substring(0, 10)}-{Math.floor(Math.random() * 1000)}
            </div>
          </div>
          
          <div className="flex gap-4 justify-center bg-gray-50 p-4 rounded-lg border border-gray-200 inline-block">
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
