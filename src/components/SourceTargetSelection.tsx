import React, { useState, useEffect } from 'react';
import { ChevronDown, Server, Database, FolderTree, FileCheck } from 'lucide-react';
import { Instance, UseCase, Facility, Checklist, SourceTarget } from '../types';

// Mock data for instances, use cases, facilities, and checklists
const mockInstances: Instance[] = [
  { id: '1', name: 'DEV-Instance' },
  { id: '2', name: 'UAT-Instance' },
  { id: '3', name: 'CSV-Instance' },
  { id: '4', name: 'PROD-Instance' },
];

const mockUseCases: UseCase[] = [
  { id: '1', name: 'Equipment Logbooks', instanceId: '1' },
  { id: '2', name: 'Batch Manufacturing Records', instanceId: '1' },
  { id: '3', name: 'Equipment Logbooks', instanceId: '2' },
  { id: '4', name: 'Batch Manufacturing Records', instanceId: '2' },
  { id: '5', name: 'Equipment Logbooks', instanceId: '3' },
  { id: '6', name: 'Batch Manufacturing Records', instanceId: '3' },
  { id: '7', name: 'Equipment Logbooks', instanceId: '4' },
  { id: '8', name: 'Batch Manufacturing Records', instanceId: '4' },
];

const mockFacilities: Facility[] = [
  { id: '1', name: 'Facility A', useCaseId: '1' },
  { id: '2', name: 'Facility B', useCaseId: '1' },
  { id: '3', name: 'Facility C', useCaseId: '2' },
  { id: '4', name: 'Facility D', useCaseId: '2' },
  { id: '5', name: 'Facility A', useCaseId: '3' },
  { id: '6', name: 'Facility B', useCaseId: '3' },
  { id: '7', name: 'Facility C', useCaseId: '4' },
  { id: '8', name: 'Facility D', useCaseId: '4' },
  { id: '9', name: 'Facility A', useCaseId: '5' },
  { id: '10', name: 'Facility B', useCaseId: '5' },
  { id: '11', name: 'Facility C', useCaseId: '6' },
  { id: '12', name: 'Facility D', useCaseId: '6' },
  { id: '13', name: 'Facility A', useCaseId: '7' },
  { id: '14', name: 'Facility B', useCaseId: '7' },
  { id: '15', name: 'Facility C', useCaseId: '8' },
  { id: '16', name: 'Facility D', useCaseId: '8' },
];

const mockChecklists: Checklist[] = [
  { id: '1', name: 'Checklist 1', facilityId: '1' },
  { id: '2', name: 'Checklist 2', facilityId: '1' },
  { id: '3', name: 'Checklist 3', facilityId: '2' },
  { id: '4', name: 'Checklist 4', facilityId: '2' },
  { id: '5', name: 'Checklist 5', facilityId: '3' },
  { id: '6', name: 'Checklist 6', facilityId: '3' },
  { id: '7', name: 'Checklist 7', facilityId: '4' },
  { id: '8', name: 'Checklist 8', facilityId: '4' },
  { id: '9', name: 'Checklist 9', facilityId: '5' },
  { id: '10', name: 'Checklist 10', facilityId: '5' },
  // Add more checklists for other facilities as needed
];

interface SourceTargetSelectionProps {
  sourceTarget: SourceTarget;
  onComplete: (sourceTarget: SourceTarget) => void;
}

const SourceTargetSelection: React.FC<SourceTargetSelectionProps> = ({
  sourceTarget,
  onComplete,
}) => {
  const [localSourceTarget, setLocalSourceTarget] = useState<SourceTarget>(sourceTarget);
  const [sourceInstanceFilter, setSourceInstanceFilter] = useState('');
  const [sourceUseCaseFilter, setSourceUseCaseFilter] = useState('');
  const [sourceFacilityFilter, setSourceFacilityFilter] = useState('');
  const [sourceChecklistFilter, setSourceChecklistFilter] = useState('');
  const [targetInstanceFilter, setTargetInstanceFilter] = useState('');
  const [targetUseCaseFilter, setTargetUseCaseFilter] = useState('');
  const [targetFacilityFilter, setTargetFacilityFilter] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Filter instances based on search input
  const filteredSourceInstances = mockInstances.filter(instance =>
    instance.name.toLowerCase().includes(sourceInstanceFilter.toLowerCase())
  );

  const filteredTargetInstances = mockInstances.filter(instance =>
    instance.name.toLowerCase().includes(targetInstanceFilter.toLowerCase())
  );

  // Filter use cases based on selected instance and search input
  const filteredSourceUseCases = mockUseCases.filter(
    useCase => 
      useCase.instanceId === localSourceTarget.sourceInstance?.id &&
      useCase.name.toLowerCase().includes(sourceUseCaseFilter.toLowerCase())
  );

  const filteredTargetUseCases = mockUseCases.filter(
    useCase => 
      useCase.instanceId === localSourceTarget.targetInstance?.id &&
      useCase.name.toLowerCase().includes(targetUseCaseFilter.toLowerCase())
  );

  // Filter facilities based on selected use case and search input
  const filteredSourceFacilities = mockFacilities.filter(
    facility => 
      facility.useCaseId === localSourceTarget.sourceUseCase?.id &&
      facility.name.toLowerCase().includes(sourceFacilityFilter.toLowerCase())
  );

  const filteredTargetFacilities = mockFacilities.filter(
    facility => 
      facility.useCaseId === localSourceTarget.targetUseCase?.id &&
      facility.name.toLowerCase().includes(targetFacilityFilter.toLowerCase())
  );

  // Filter checklists based on selected facility and search input
  const filteredSourceChecklists = mockChecklists.filter(
    checklist => 
      checklist.facilityId === localSourceTarget.sourceFacility?.id &&
      checklist.name.toLowerCase().includes(sourceChecklistFilter.toLowerCase())
  );

  // Validate form
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    
    if (!localSourceTarget.sourceInstance) {
      newErrors.sourceInstance = 'Source instance is required';
    }
    
    if (!localSourceTarget.sourceUseCase) {
      newErrors.sourceUseCase = 'Source use case is required';
    }
    
    if (!localSourceTarget.sourceFacility) {
      newErrors.sourceFacility = 'Source facility is required';
    }
    
    if (!localSourceTarget.sourceChecklist) {
      newErrors.sourceChecklist = 'Source checklist is required';
    }
    
    if (!localSourceTarget.targetInstance) {
      newErrors.targetInstance = 'Target instance is required';
    }
    
    if (!localSourceTarget.targetUseCase) {
      newErrors.targetUseCase = 'Target use case is required';
    }
    
    if (!localSourceTarget.targetFacility) {
      newErrors.targetFacility = 'Target facility is required';
    }
    
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [localSourceTarget]);

  // Handle selection changes
  const handleSourceInstanceChange = (instance: Instance) => {
    setLocalSourceTarget({
      ...localSourceTarget,
      sourceInstance: instance,
      sourceUseCase: null,
      sourceFacility: null,
      sourceChecklist: null,
    });
  };

  const handleSourceUseCaseChange = (useCase: UseCase) => {
    setLocalSourceTarget({
      ...localSourceTarget,
      sourceUseCase: useCase,
      sourceFacility: null,
      sourceChecklist: null,
    });
  };

  const handleSourceFacilityChange = (facility: Facility) => {
    setLocalSourceTarget({
      ...localSourceTarget,
      sourceFacility: facility,
      sourceChecklist: null,
    });
  };

  const handleSourceChecklistChange = (checklist: Checklist) => {
    setLocalSourceTarget({
      ...localSourceTarget,
      sourceChecklist: checklist,
    });
  };

  const handleTargetInstanceChange = (instance: Instance) => {
    setLocalSourceTarget({
      ...localSourceTarget,
      targetInstance: instance,
      targetUseCase: null,
      targetFacility: null,
    });
  };

  const handleTargetUseCaseChange = (useCase: UseCase) => {
    setLocalSourceTarget({
      ...localSourceTarget,
      targetUseCase: useCase,
      targetFacility: null,
    });
  };

  const handleTargetFacilityChange = (facility: Facility) => {
    setLocalSourceTarget({
      ...localSourceTarget,
      targetFacility: facility,
    });
  };

  const handleSubmit = () => {
    if (isFormValid) {
      onComplete(localSourceTarget);
    }
  };

  // Dropdown component
  const Dropdown = ({ 
    label, 
    icon, 
    value, 
    placeholder, 
    options, 
    onChange, 
    onFilterChange, 
    error 
  }: { 
    label: string; 
    icon: React.ReactNode; 
    value: { id: string; name: string } | null; 
    placeholder: string; 
    options: { id: string; name: string }[]; 
    onChange: (option: any) => void; 
    onFilterChange: (value: string) => void; 
    error?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState('');

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFilter(value);
      onFilterChange(value);
    };

    const handleOptionClick = (option: any) => {
      onChange(option);
      setIsOpen(false);
      setFilter('');
      onFilterChange('');
    };

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
          <button
            type="button"
            className={`bg-white relative w-full border ${error ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">{icon}</span>
              {value ? (
                <span className="block truncate">{value.name}</span>
              ) : (
                <span className="block truncate text-gray-400">{placeholder}</span>
              )}
            </div>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </span>
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              <div className="sticky top-0 z-10 bg-white p-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Type to filter..."
                  value={filter}
                  onChange={handleFilterChange}
                />
              </div>
              <ul className="py-1">
                {options.length === 0 ? (
                  <li className="text-gray-500 select-none relative py-2 pl-3 pr-9">
                    No options available
                  </li>
                ) : (
                  options.map((option) => (
                    <li
                      key={option.id}
                      className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                      onClick={() => handleOptionClick(option)}
                    >
                      <span className="block truncate">{option.name}</span>
                      {value?.id === option.id && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 w-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
        <Database className="mr-2 h-6 w-6 text-blue-600" />
        Source & Target Selection
      </h2>
      <p className="text-gray-600 mb-6">
        Select the source and target instances for the migration.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Selection */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
          <h3 className="text-lg font-medium text-blue-800 mb-4">Source</h3>
          
          <Dropdown
            label="Instance"
            icon={<Server className="h-5 w-5" />}
            value={localSourceTarget.sourceInstance}
            placeholder="Select source instance"
            options={filteredSourceInstances}
            onChange={handleSourceInstanceChange}
            onFilterChange={setSourceInstanceFilter}
            error={errors.sourceInstance}
          />
          
          <Dropdown
            label="Use Case"
            icon={<Database className="h-5 w-5" />}
            value={localSourceTarget.sourceUseCase}
            placeholder="Select use case"
            options={filteredSourceUseCases}
            onChange={handleSourceUseCaseChange}
            onFilterChange={setSourceUseCaseFilter}
            error={errors.sourceUseCase}
          />
          
          <Dropdown
            label="Facility"
            icon={<FolderTree className="h-5 w-5" />}
            value={localSourceTarget.sourceFacility}
            placeholder="Select facility"
            options={filteredSourceFacilities}
            onChange={handleSourceFacilityChange}
            onFilterChange={setSourceFacilityFilter}
            error={errors.sourceFacility}
          />
          
          <Dropdown
            label="Checklist"
            icon={<FileCheck className="h-5 w-5" />}
            value={localSourceTarget.sourceChecklist}
            placeholder="Select checklist"
            options={filteredSourceChecklists}
            onChange={handleSourceChecklistChange}
            onFilterChange={setSourceChecklistFilter}
            error={errors.sourceChecklist}
          />
        </div>

        {/* Target Selection */}
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 shadow-sm">
          <h3 className="text-lg font-medium text-green-800 mb-4">Target</h3>
          
          <Dropdown
            label="Instance"
            icon={<Server className="h-5 w-5" />}
            value={localSourceTarget.targetInstance}
            placeholder="Select target instance"
            options={filteredTargetInstances}
            onChange={handleTargetInstanceChange}
            onFilterChange={setTargetInstanceFilter}
            error={errors.targetInstance}
          />
          
          <Dropdown
            label="Use Case"
            icon={<Database className="h-5 w-5" />}
            value={localSourceTarget.targetUseCase}
            placeholder="Select use case"
            options={filteredTargetUseCases}
            onChange={handleTargetUseCaseChange}
            onFilterChange={setTargetUseCaseFilter}
            error={errors.targetUseCase}
          />
          
          <Dropdown
            label="Facility"
            icon={<FolderTree className="h-5 w-5" />}
            value={localSourceTarget.targetFacility}
            placeholder="Select facility"
            options={filteredTargetFacilities}
            onChange={handleTargetFacilityChange}
            onFilterChange={setTargetFacilityFilter}
            error={errors.targetFacility}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end bg-gray-50 p-4 rounded-lg border border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`py-2 px-6 rounded-md font-medium transition-colors duration-300 flex items-center ${
            isFormValid
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 cursor-not-allowed text-gray-500'
          }`}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SourceTargetSelection;
