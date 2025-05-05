# Data Migration Tool

A web-based companion to the core Leucine platform that enables Solution Architects to package a checklist and its entire ontology from one instance and import it into another through a guided workflow.

## Overview

The Data Migration Tool solves a critical problem for Leucine clients who need to promote digitally-configured checklists (equipment logbooks, BMRs, etc.) from UAT → CSV → Production environments. Since the platform has no built-in migration tool or simulation mode, this tool provides a reliable, self-service way to copy an entire process (and its ontology) between instances with audit-level traceability and zero manual ID handling.

## Key Features

- **Self-service promotion**: Solution Architects can move a validated checklist from one instance to another without developer help
- **Zero reference errors**: Every object type, object, relation, and dropdown value arrives with the correct UUID, preventing "missing entity" runtime failures
- **Regulatory traceability**: Each migration is logged with who, when, source, target, and result for traceability
- **All-or-nothing transactions**: Imports run in a single transaction to ensure data integrity

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Type Safety**: TypeScript interfaces and enums

## Project Structure

```
src/
├── components/         # React components
│   ├── ui/             # UI components (shadcn/ui)
│   ├── TopBar.tsx      # Top navigation bar
│   ├── Sidebar.tsx     # Left sidebar navigation
│   ├── StepIndicator.tsx # Workflow step indicator
│   ├── SourceTargetSelection.tsx # Source and target selection form
│   ├── BundlePacking.tsx # Bundle analysis component
│   ├── ConflictResolution.tsx # Conflict resolution component
│   ├── TransactionExecution.tsx # Transaction execution component
│   ├── MigrationComplete.tsx # Migration completion component
│   ├── LogsTable.tsx   # Migration logs table
│   └── LogDetail.tsx   # Detailed log view
├── types/              # TypeScript interfaces and types
│   └── index.ts        # Core type definitions
├── utils/              # Utility functions
│   └── mockData.ts     # Mock data for development
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Core Workflow

1. **Source & Target Selection**: User selects source and target instances, use cases, and facilities
2. **Bundle Packing**: System analyzes and compiles the bundle of entities to migrate
3. **Conflict Resolution**: User reviews and resolves any conflicts between source and target
4. **Transaction Execution**: System executes the migration in a single transaction
5. **Migration Complete**: User receives confirmation of successful migration

## Data Model

The application uses a comprehensive type system to model the migration process:

- **Entity**: Base type for all migrated items (UUID, label, type)
- **EntityType**: Enum of possible entity types (ObjectType, Property, Relation, Object, Enum, Prototype)
- **Bundle**: Collection of entities with summary counts
- **ComparisonResult**: Enum of possible comparison results (Missing, LabelMatch, Conflict, Match)
- **ComparedEntity**: Entity with comparison result and selection status
- **MigrationStep**: Enum of workflow steps
- **SourceTarget**: Source and target selection data
- **MigrationState**: Overall application state

## Theme Support

The application supports both light and dark modes through a theme toggle in the top bar. The theme implementation uses CSS variables and Tailwind's dark mode support.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/uxsm20/dwi-migration-2.git
   cd dwi-migration-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Development Guidelines

- Use TypeScript for all new components and functions
- Follow the existing component structure for new features
- Use Tailwind CSS for styling
- Implement responsive design for all components
- Use React Hooks for state management
- Add appropriate TypeScript interfaces for all props and state

## Future Enhancements

- API integration for Instance/Use-Case/Facility dropdowns
- Bundle analysis implementation
- Conflict detection logic
- Transaction execution with backend integration
- Comprehensive logging system
- Error handling for network, authentication, and schema validation errors

## License

Proprietary - Leucine
