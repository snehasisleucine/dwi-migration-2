import React, { useState, useEffect } from 'react';
import { ComparedEntity } from '../types';
import { executeMockMigration } from '../utils/mockData';
import { CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react';

interface TransactionExecutionProps {
  comparedEntities: ComparedEntity[];
  onComplete: (success: boolean) => void;
  onBack: () => void;
}

const TransactionExecution: React.FC<TransactionExecutionProps> = ({
  comparedEntities,
  onComplete,
  onBack,
}) => {
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const selectedEntities = comparedEntities.filter((entity) => entity.selected);

  useEffect(() => {
    const executeTransaction = async () => {
      setStatus('running');
      setExecutionLog((prev) => [...prev, 'Starting transaction execution...']);
      setExecutionLog((prev) => [...prev, 'Acquiring lock on target instance...']);
      
      try {
        // Simulate instance locking
        await new Promise(resolve => setTimeout(resolve, 800));
        setExecutionLog((prev) => [...prev, 'Lock acquired. Target instance is now read-only for other users.']);
        setExecutionLog((prev) => [...prev, 'Beginning single transaction commit...']);
        
        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev + Math.random() * 10;
            if (newProgress >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return newProgress;
          });
          
          // Add random log entries
          if (Math.random() > 0.7) {
            const entityTypes = ['object type', 'property', 'relation', 'object', 'enum', 'prototype'];
            const entityType = entityTypes[Math.floor(Math.random() * entityTypes.length)];
            const action = Math.random() > 0.3 ? 'Adding' : 'Updating';
            
            setExecutionLog((prev) => [...prev, `${action} ${entityType}...`]);
          }
        }, 300);

        // Execute the migration
        const result = await executeMockMigration(selectedEntities);
        
        clearInterval(progressInterval);
        setProgress(100);
        
        if (result.success) {
          setExecutionLog((prev) => [...prev, 'All entities processed successfully.']);
          setExecutionLog((prev) => [...prev, 'Committing transaction...']);
          
          // Simulate commit delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          setExecutionLog((prev) => [...prev, 'Transaction committed successfully.']);
          setExecutionLog((prev) => [...prev, 'Releasing lock on target instance...']);
          
          // Simulate lock release
          await new Promise(resolve => setTimeout(resolve, 300));
          
          setExecutionLog((prev) => [...prev, 'Lock released. Target instance is now writable.']);
          setStatus('success');
          onComplete(true);
        } else {
          throw new Error(result.error || 'Unknown error occurred.');
        }
      } catch (error: any) {
        setExecutionLog((prev) => [
          ...prev, 
          `Error: ${error.error || error.message || 'Unknown error occurred.'}`,
          'Initiating automatic rollback...',
          'Rolling back all changes...',
        ]);
        
        // Simulate rollback delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setExecutionLog((prev) => [
          ...prev,
          'Rollback complete. No changes were made to the target instance.',
          'Releasing lock on target instance...',
        ]);
        
        // Simulate lock release
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setExecutionLog((prev) => [
          ...prev,
          'Lock released. Target instance is now writable.'
        ]);
        
        setErrorMessage(error.error || error.message || 'Unknown error occurred.');
        setStatus('error');
        onComplete(false);
      }
    };

    const timer = setTimeout(() => {
      executeTransaction();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [comparedEntities, onComplete]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Transaction Execution</h2>
      
      <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
            <span className="text-gray-700 font-medium">All-or-Nothing Transaction</span>
          </div>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
            Safety Feature
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-1">
          The import will run as an all-or-nothing transaction. If any item fails, no changes will be made.
        </p>
        <p className="text-gray-600 text-sm">
          Selected entities: <span className="font-medium">{selectedEntities.length}</span> of {comparedEntities.length} total
        </p>
      </div>

      {/* Progress section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Execution Progress</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${status === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}
            style={{ width: `${progress}%`, transition: 'width 0.3s ease-out' }}
          ></div>
        </div>
      </div>

      {/* Status indicator */}
      {status !== 'idle' && (
        <div 
          className={`mb-6 p-4 rounded-lg border ${
            status === 'running' ? 'bg-blue-50 border-blue-100' : 
            status === 'success' ? 'bg-green-50 border-green-100' : 
            'bg-red-50 border-red-100'
          }`}
        >
          <div className="flex items-center">
            {status === 'running' && <Loader2 className="w-5 h-5 text-blue-600 animate-spin mr-3" />}
            {status === 'success' && <CheckCircle className="w-5 h-5 text-green-600 mr-3" />}
            {status === 'error' && <XCircle className="w-5 h-5 text-red-600 mr-3" />}
            
            <div>
              <h3 
                className={`font-medium ${
                  status === 'running' ? 'text-blue-800' : 
                  status === 'success' ? 'text-green-800' : 
                  'text-red-800'
                }`}
              >
                {status === 'running' && 'Transaction in Progress'}
                {status === 'success' && 'Transaction Completed Successfully'}
                {status === 'error' && 'Transaction Failed'}
              </h3>
              
              {status === 'error' && <p className="text-red-700 text-sm">{errorMessage}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Execution log */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Execution Log</h3>
        <div className="bg-gray-900 text-gray-200 rounded-lg p-4 font-mono text-sm h-60 overflow-y-auto">
          {executionLog.map((log, index) => (
            <div key={index} className="mb-1">
              <span className="text-gray-500">[{new Date().toISOString().substring(11, 19)}]</span> {log}
            </div>
          ))}
          {status === 'running' && (
            <div className="animate-pulse">
              <span className="text-gray-500">[{new Date().toISOString().substring(11, 19)}]</span> Executing...
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={status === 'running'}
          className={`py-2 px-5 rounded-md font-medium transition-colors duration-300 flex items-center ${
            status === 'running' 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back
        </button>
        
        {status === 'success' || status === 'error' ? (
          <button
            onClick={() => onComplete(status === 'success')}
            className={`py-2 px-6 rounded-md font-medium transition-colors duration-300 flex items-center ${
              status === 'success' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            Finish
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-400 text-white py-2 px-6 rounded-md font-medium cursor-not-allowed flex items-center"
          >
            Processing
            <Loader2 className="ml-2 w-4 h-4 animate-spin" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionExecution;
