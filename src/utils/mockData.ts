import { Bundle, ComparedEntity, ComparisonResult, Entity, EntityType } from '../types';

// Generate a random UUID
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Generate random entity names based on type
const generateEntityName = (type: EntityType): string => {
  const prefixes: Record<EntityType, string[]> = {
    [EntityType.ObjectType]: ['User', 'Product', 'Order', 'Customer', 'Invoice', 'Task', 'Project', 'Event'],
    [EntityType.Property]: ['name', 'email', 'price', 'status', 'createdAt', 'description', 'quantity', 'address'],
    [EntityType.Relation]: ['belongsTo', 'hasMany', 'hasOne', 'manyToMany', 'oneToOne', 'manyToOne'],
    [EntityType.Object]: ['Admin', 'Manager', 'Standard', 'Premium', 'Basic', 'Pro', 'Enterprise'],
    [EntityType.Enum]: ['Status', 'Role', 'Priority', 'Category', 'Level', 'Type', 'Stage'],
    [EntityType.Prototype]: ['OrderFlow', 'UserOnboarding', 'InvoiceApproval', 'TaskManagement'],
  };

  const selectedPrefix = prefixes[type][Math.floor(Math.random() * prefixes[type].length)];
  
  if (type === EntityType.ObjectType || type === EntityType.Prototype || type === EntityType.Enum) {
    return selectedPrefix;
  } else if (type === EntityType.Relation) {
    const objects = prefixes[EntityType.ObjectType];
    const obj1 = objects[Math.floor(Math.random() * objects.length)];
    const obj2 = objects[Math.floor(Math.random() * objects.length)];
    return `${obj1}${selectedPrefix}${obj2}`;
  } else if (type === EntityType.Object) {
    const objects = prefixes[EntityType.ObjectType];
    const obj = objects[Math.floor(Math.random() * objects.length)];
    return `${obj}${selectedPrefix}`;
  } else {
    // Property
    const objects = prefixes[EntityType.ObjectType];
    const obj = objects[Math.floor(Math.random() * objects.length)];
    return `${obj}.${selectedPrefix}`;
  }
};

// Generate a mock bundle with random entities
export const generateMockBundle = (): Bundle => {
  const objectTypeCount = 5 + Math.floor(Math.random() * 8);
  const propertyCount = 15 + Math.floor(Math.random() * 20);
  const relationCount = 3 + Math.floor(Math.random() * 6);
  const objectCount = 10 + Math.floor(Math.random() * 20);
  const enumCount = 3 + Math.floor(Math.random() * 5);
  const prototypeCount = 1;

  const entities: Entity[] = [];

  // Generate object types
  for (let i = 0; i < objectTypeCount; i++) {
    entities.push({
      uuid: generateUUID(),
      label: generateEntityName(EntityType.ObjectType),
      type: EntityType.ObjectType,
    });
  }

  // Generate properties
  for (let i = 0; i < propertyCount; i++) {
    entities.push({
      uuid: generateUUID(),
      label: generateEntityName(EntityType.Property),
      type: EntityType.Property,
    });
  }

  // Generate relations
  for (let i = 0; i < relationCount; i++) {
    entities.push({
      uuid: generateUUID(),
      label: generateEntityName(EntityType.Relation),
      type: EntityType.Relation,
    });
  }

  // Generate objects
  for (let i = 0; i < objectCount; i++) {
    entities.push({
      uuid: generateUUID(),
      label: generateEntityName(EntityType.Object),
      type: EntityType.Object,
    });
  }

  // Generate enums
  for (let i = 0; i < enumCount; i++) {
    entities.push({
      uuid: generateUUID(),
      label: generateEntityName(EntityType.Enum),
      type: EntityType.Enum,
    });
  }

  // Generate prototypes
  for (let i = 0; i < prototypeCount; i++) {
    entities.push({
      uuid: generateUUID(),
      label: generateEntityName(EntityType.Prototype),
      type: EntityType.Prototype,
    });
  }

  // Calculate summary
  const summary = {
    objectTypes: objectTypeCount,
    properties: propertyCount,
    relations: relationCount,
    objects: objectCount,
    enums: enumCount,
    prototypes: prototypeCount,
  };

  return {
    entities,
    summary,
  };
};

// Generate comparison results for entities
export const generateComparisonResults = (sourceEntities: Entity[]): ComparedEntity[] => {
  return sourceEntities.map((entity) => {
    // Random distribution of comparison results
    const random = Math.random();
    let comparisonResult: ComparisonResult;
    
    if (random < 0.4) {
      comparisonResult = ComparisonResult.Missing;
    } else if (random < 0.6) {
      comparisonResult = ComparisonResult.LabelMatch;
    } else if (random < 0.8) {
      comparisonResult = ComparisonResult.Conflict;
    } else {
      comparisonResult = ComparisonResult.Match;
    }

    // Default selection based on comparison result
    const selected = comparisonResult === ComparisonResult.Missing || 
                    comparisonResult === ComparisonResult.LabelMatch;

    return {
      ...entity,
      comparisonResult,
      selected,
    };
  });
};

// Execute mock migration transaction
export const executeMockMigration = (entities: ComparedEntity[]): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve, reject) => {
    // Simulate a delay for the migration process
    setTimeout(() => {
      // 90% chance of success
      if (Math.random() < 0.9) {
        resolve({ success: true });
      } else {
        reject({
          success: false,
          error: 'An error occurred during transaction execution. All changes have been rolled back.',
        });
      }
    }, 2000);
  });
};