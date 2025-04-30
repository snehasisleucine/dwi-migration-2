// Core entity types for the migration system

export interface Entity {
  uuid: string;
  label: string;
  type: EntityType;
}

export enum EntityType {
  ObjectType = 'objectType',
  Property = 'property',
  Relation = 'relation',
  Object = 'object',
  Enum = 'enum',
  Prototype = 'prototype',
}

export interface Bundle {
  entities: Entity[];
  summary: {
    objectTypes: number;
    properties: number;
    relations: number;
    objects: number;
    enums: number;
    prototypes: number;
  };
}

export enum ComparisonResult {
  Missing = 'missing',
  LabelMatch = 'labelMatch',
  Conflict = 'conflict',
  Match = 'match',
}

export interface ComparedEntity extends Entity {
  comparisonResult: ComparisonResult;
  selected: boolean;
}

export enum MigrationStep {
  SourceTargetSelection = 0,
  BundlePacking = 1,
  ConflictResolution = 2,
  Execution = 3,
  Complete = 4,
}

// Source and target selection types
export interface Instance {
  id: string;
  name: string;
}

export interface UseCase {
  id: string;
  name: string;
  instanceId: string;
}

export interface Facility {
  id: string;
  name: string;
  useCaseId: string;
}

export interface Checklist {
  id: string;
  name: string;
  facilityId: string;
}

export interface SourceTarget {
  sourceInstance: Instance | null;
  sourceUseCase: UseCase | null;
  sourceFacility: Facility | null;
  sourceChecklist: Checklist | null;
  targetInstance: Instance | null;
  targetUseCase: UseCase | null;
  targetFacility: Facility | null;
}

export interface MigrationState {
  currentStep: MigrationStep;
  sourceTarget: SourceTarget;
  bundle: Bundle | null;
  comparedEntities: ComparedEntity[];
  executionStatus: 'idle' | 'running' | 'success' | 'error';
  errorMessage: string | null;
}
