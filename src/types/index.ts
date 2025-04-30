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
  BundlePacking = 0,
  ConflictResolution = 1,
  Execution = 2,
  Complete = 3,
}

export interface MigrationState {
  currentStep: MigrationStep;
  bundle: Bundle | null;
  comparedEntities: ComparedEntity[];
  executionStatus: 'idle' | 'running' | 'success' | 'error';
  errorMessage: string | null;
}