import React, { useState, useCallback } from 'react';
import StepIndicator from './components/StepIndicator';
import BundlePacking from './components/BundlePacking';
import ConflictResolution from './components/ConflictResolution';
import TransactionExecution from './components/TransactionExecution';
import MigrationComplete from './components/MigrationComplete';
import { MigrationState, MigrationStep, Bundle, ComparedEntity } from './types';
import { Database } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<MigrationState>({
    currentStep: MigrationStep.BundlePacking,
    bundle: null,
    comparedEntities: [],
    executionStatus: 'idle',
    errorMessage: null,
  });

  const handleBundlePackingComplete = useCallback((bundle: Bundle) => {
    setState((prev) => ({
      ...prev,
      currentStep: MigrationStep.ConflictResolution,
      bundle,
    }));
  }, []);

  const handleConflictResolutionComplete = useCallback((comparedEntities: ComparedEntity[]) => {
    setState((prev) => ({
      ...prev,
      currentStep: MigrationStep.Execution,
      comparedEntities,
    }));
  }, []);

  const handleExecutionComplete = useCallback((success: boolean) => {
    setState((prev) => ({
      ...prev,
      currentStep: MigrationStep.Complete,
      executionStatus: success ? 'success' : 'error',
    }));
  }, []);

  const handleReset = useCallback(() => {
    setState({
      currentStep: MigrationStep.BundlePacking,
      bundle: null,
      comparedEntities: [],
      executionStatus: 'idle',
      errorMessage: null,
    });
  }, []);

  const handleBackFromConflict = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: MigrationStep.BundlePacking,
    }));
  }, []);

  const handleBackFromExecution = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: MigrationStep.ConflictResolution,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded text-white mr-3">
              <Database className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Data Migration Tool</h1>
          </div>
          <div className="text-sm text-gray-500">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
              Migration in Progress
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <StepIndicator currentStep={state.currentStep} />

          {state.currentStep === MigrationStep.BundlePacking && (
            <BundlePacking onComplete={handleBundlePackingComplete} />
          )}

          {state.currentStep === MigrationStep.ConflictResolution && state.bundle && (
            <ConflictResolution 
              bundle={state.bundle} 
              onComplete={handleConflictResolutionComplete}
              onBack={handleBackFromConflict}
            />
          )}

          {state.currentStep === MigrationStep.Execution && state.comparedEntities.length > 0 && (
            <TransactionExecution 
              comparedEntities={state.comparedEntities} 
              onComplete={handleExecutionComplete}
              onBack={handleBackFromExecution}
            />
          )}

          {state.currentStep === MigrationStep.Complete && (
            <MigrationComplete 
              success={state.executionStatus === 'success'} 
              onReset={handleReset} 
            />
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-gray-500">
          <p>
            Data Migration Tool v1.0 - All changes are executed in a single transaction to ensure data integrity.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;