import React from 'react';
import { Check, CircleDot, Circle, Database, Package, GitMerge, Play, CheckCircle } from 'lucide-react';
import { MigrationStep } from '../types';

interface StepIndicatorProps {
  currentStep: MigrationStep;
}

const steps = [
  { 
    id: MigrationStep.SourceTargetSelection, 
    label: 'Source & Target',
    icon: <Database className="w-5 h-5" />
  },
  { 
    id: MigrationStep.BundlePacking, 
    label: 'Bundle Packing',
    icon: <Package className="w-5 h-5" />
  },
  { 
    id: MigrationStep.ConflictResolution, 
    label: 'Conflict Resolution',
    icon: <GitMerge className="w-5 h-5" />
  },
  { 
    id: MigrationStep.Execution, 
    label: 'Execution',
    icon: <Play className="w-5 h-5" />
  },
  { 
    id: MigrationStep.Complete, 
    label: 'Complete',
    icon: <CheckCircle className="w-5 h-5" />
  },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="w-full mx-auto mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform ${
                    isActive 
                      ? 'border-blue-600 bg-blue-50 text-blue-600 scale-110 shadow-md' 
                      : isCompleted 
                        ? 'border-green-500 bg-green-500 text-white' 
                        : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : isActive ? (
                    step.icon
                  ) : (
                    step.icon
                  )}
                </div>
                <span 
                  className={`mt-2 text-sm font-medium ${
                    isActive 
                      ? 'text-blue-600' 
                      : isCompleted 
                        ? 'text-green-500' 
                        : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 relative mx-2">
                  <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full"></div>
                  <div 
                    className={`absolute top-1/2 transform -translate-y-1/2 h-1 rounded-full transition-all duration-500 ease-out ${
                      currentStep > index ? 'bg-green-500 w-full' : 'bg-gray-200 w-0'
                    }`}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
