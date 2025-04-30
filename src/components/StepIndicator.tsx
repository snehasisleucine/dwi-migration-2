import React from 'react';
import { Check, CircleDot, Circle } from 'lucide-react';
import { MigrationStep } from '../types';

interface StepIndicatorProps {
  currentStep: MigrationStep;
}

const steps = [
  { id: MigrationStep.SourceTargetSelection, label: 'Source & Target' },
  { id: MigrationStep.BundlePacking, label: 'Bundle Packing' },
  { id: MigrationStep.ConflictResolution, label: 'Conflict Resolution' },
  { id: MigrationStep.Execution, label: 'Execution' },
  { id: MigrationStep.Complete, label: 'Complete' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isActive 
                      ? 'border-blue-600 bg-blue-50 text-blue-600' 
                      : isCompleted 
                        ? 'border-green-500 bg-green-500 text-white' 
                        : 'border-gray-300 text-gray-400'
                    }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : isActive ? (
                    <CircleDot className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
                <span 
                  className={`mt-2 text-sm font-medium
                    ${isActive 
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
                <div 
                  className={`flex-1 h-0.5 mx-2 transition-all duration-300
                    ${currentStep > index ? 'bg-green-500' : 'bg-gray-200'}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
