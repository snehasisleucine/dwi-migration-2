import React, { useState, useCallback } from 'react';
import StepIndicator from './components/StepIndicator';
import SourceTargetSelection from './components/SourceTargetSelection';
import BundlePacking from './components/BundlePacking';
import ConflictResolution from './components/ConflictResolution';
import TransactionExecution from './components/TransactionExecution';
import MigrationComplete from './components/MigrationComplete';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import LogsTable, { LogEntry } from './components/LogsTable';
import LogDetail from './components/LogDetail';
import { MigrationState, MigrationStep, Bundle, ComparedEntity, SourceTarget } from './types';

// Mock data for logs
const mockLogs: LogEntry[] = [
  {
    id: '1',
    status: 'success',
    sourceInstance: 'UAT-Instance',
    targetInstance: 'PROD-Instance',
    timestamp: '2025-04-30T06:30:45Z',
    duration: '00:01:34',
    entityCount: 57,
  },
  {
    id: '2',
    status: 'failed',
    sourceInstance: 'DEV-Instance',
    targetInstance: 'UAT-Instance',
    timestamp: '2025-04-29T14:22:10Z',
    duration: '00:00:45',
    entityCount: 0,
  },
  {
    id: '3',
    status: 'cancelled',
    sourceInstance: 'DEV-Instance',
    targetInstance: 'CSV-Instance',
    timestamp: '2025-04-28T09:15:30Z',
    duration: '00:00:12',
    entityCount: 0,
  },
];

// Mock data for audit logs
const mockAuditLogs = [
  {
    id: '1',
    timestamp: '2025-04-30T06:30:15Z',
    action: 'Bundle Packing Started',
    details: 'Collecting entities from source instance',
  },
  {
    id: '2',
    timestamp: '2025-04-30T06:30:25Z',
    action: 'Bundle Packing Completed',
    details: 'Collected 57 entities (12 object types, 23 properties, 8 relations, 10 objects, 3 enums, 1 prototype)',
  },
  {
    id: '3',
    timestamp: '2025-04-30T06:30:35Z',
    action: 'Conflict Resolution Started',
    details: 'Analyzing conflicts between source and target',
  },
  {
    id: '4',
    timestamp: '2025-04-30T06:31:05Z',
    action: 'Conflict Resolution Completed',
    details: 'Resolved conflicts: 45 missing, 10 label-match, 2 conflicts (skipped)',
  },
  {
    id: '5',
    timestamp: '2025-04-30T06:31:15Z',
    action: 'Transaction Execution Started',
    details: 'Executing migration transaction',
  },
  {
    id: '6',
    timestamp: '2025-04-30T06:32:19Z',
    action: 'Transaction Execution Completed',
    details: 'Successfully migrated 57 entities',
  },
];

const App: React.FC = () => {
  // Main workflow state
  const [state, setState] = useState<MigrationState>({
    currentStep: MigrationStep.SourceTargetSelection,
    sourceTarget: {
      sourceInstance: null,
      sourceUseCase: null,
      sourceFacility: null,
      sourceChecklist: null,
      targetInstance: null,
      targetUseCase: null,
      targetFacility: null,
    },
    bundle: null,
    comparedEntities: [],
    executionStatus: 'idle',
    errorMessage: null,
  });

  // Navigation state
  const [activeTab, setActiveTab] = useState<'workflow' | 'logs'>('workflow');
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  const handleSourceTargetComplete = useCallback((sourceTarget: SourceTarget) => {
    setState((prev) => ({
      ...prev,
      currentStep: MigrationStep.BundlePacking,
      sourceTarget,
    }));
  }, []);

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
      currentStep: MigrationStep.SourceTargetSelection,
      sourceTarget: {
        sourceInstance: null,
        sourceUseCase: null,
        sourceFacility: null,
        sourceChecklist: null,
        targetInstance: null,
        targetUseCase: null,
        targetFacility: null,
      },
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

  // Find the selected log
  const selectedLog = selectedLogId 
    ? mockLogs.find(log => log.id === selectedLogId) 
    : null;

  // Handle log selection
  const handleLogSelect = (logId: string) => {
    setSelectedLogId(logId);
  };

  // Handle back from log detail
  const handleBackFromLogDetail = () => {
    setSelectedLogId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Full-width top bar */}
      <TopBar userName="Snehasis Majumdar" />

      <div className="flex-1 flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 overflow-auto">
          {/* Step indicator below top bar */}
          {activeTab === 'workflow' && (
            <div className="bg-white border-b border-gray-200 py-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <StepIndicator currentStep={state.currentStep} />
              </div>
            </div>
          )}
          
          <div className="py-6 px-6">
            <div className="max-w-7xl mx-auto">
              {activeTab === 'workflow' ? (
                <>
                  {state.currentStep === MigrationStep.SourceTargetSelection && (
                    <SourceTargetSelection 
                      sourceTarget={state.sourceTarget}
                      onComplete={handleSourceTargetComplete}
                    />
                  )}

                  {state.currentStep === MigrationStep.BundlePacking && (
                    <BundlePacking 
                      onComplete={handleBundlePackingComplete}
                      onCancel={() => {
                        // Log cancellation
                        console.log("Migration cancelled during bundle packing");
                        // You could also update state here to show a cancellation message
                        // or redirect to a different step
                      }}
                    />
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
                      migrationDetails={{
                        sourceInstance: state.sourceTarget.sourceInstance?.name || 'Unknown',
                        targetInstance: state.sourceTarget.targetInstance?.name || 'Unknown',
                        entityCount: state.comparedEntities.filter(e => e.selected).length,
                        duration: '00:01:23', // This would come from actual timing in a real app
                        timestamp: new Date().toISOString()
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  {selectedLog ? (
                    <LogDetail 
                      log={selectedLog} 
                      auditLogs={mockAuditLogs} 
                      onBack={handleBackFromLogDetail} 
                    />
                  ) : (
                    <LogsTable logs={mockLogs} onLogSelect={handleLogSelect} />
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 py-3">
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
