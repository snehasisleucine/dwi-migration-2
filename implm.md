# Data Migration Tool Implementation Plan

## Layout Structure
- [x] Top Bar
  - [x] Left: Leucine logo + "Data Migration" text
  - [x] Right: User persona icon with dropdown
    - [x] Display full name ("Snehasis Majumdar")
    - [x] View profile option
    - [x] Logout option
  - [x] Adjust to be full width across the container

- [x] Left Sidebar
  - [x] Workflow option (main migration process)
  - [x] Logs option (migration history table)
  - [x] Detailed view with tabs
    - [x] Details tab
    - [x] Audit logs tab with UTC timestamps

- [x] Navigation Layout
  - [x] Move step indicator (menu bar) below the top bar
  - [x] Adjust spacing and container widths

## Workflow Enhancements
- [x] Source Selection
  - [x] Three-level dropdown (Instance → Use-Case → Facility)
  - [x] Checklist name selection
  - [x] Type-to-filter functionality for dropdowns
  - [x] Validation for selected values
  - [x] UI for source selection form

- [x] Target Selection
  - [x] Three-level dropdown (Instance → Use-Case → Facility)
  - [x] Live population from destination instance
  - [x] Validation for selected values
  - [x] UI for target selection form

- [x] Analysis Step
  - [x] Bundle compilation with entity counts
  - [x] Confirm/Cancel options
  - [x] Cancellation logging ("Cancelled during packing")

- [x] Review & Conflicts
  - [x] Two-panel layout
    - [x] Bundle Contents panel (aggregate counts)
    - [x] Additions & Conflicts panel
  - [x] Pre-ticked items for missing entities
  - [x] Pre-ticked items for label-match entities
  - [x] Unticked items for conflicts (with red icon)
  - [x] Transaction warning footer

- [x] Import Process
  - [x] Instance locking mechanism
  - [x] Single transaction commit
  - [x] All-or-nothing transaction model
  - [x] Automatic rollback on failure

- [x] Completion
  - [x] Success status display
  - [x] Migration log recording
    - [x] Status
    - [x] Source → Target
    - [x] Object count
    - [x] Duration

## Logging System
- [x] Migration History Table
  - [x] Status column (Success/Failed/Cancelled)
  - [x] Source instance
  - [x] Target instance
  - [x] Timestamp
  - [x] Duration
  - [x] Entity counts

- [x] Detailed View
  - [x] All migration details tab
  - [x] Audit logs tab with UTC timestamps
  - [x] Error details for failed migrations

- [ ] Error Handling
  - [ ] Network error handling
  - [ ] Authentication error handling
  - [ ] Schema validation error handling
  - [ ] Rollback logging

## Open Questions
- What specific columns should be included in the logs table?
- What specific actions should be tracked in the audit logs besides migration steps?
- What information should be displayed in the user profile view?
- Are there specific error scenarios we should handle besides network, auth, and schema issues?

## Technical Implementation
- [x] Update existing React components
- [x] Create new components for:
  - [x] Top bar with logo and user menu
  - [x] Left sidebar navigation
  - [x] Logs table view
  - [x] Detailed log view with tabs
  - [x] Source/Target selection form
- [x] Update workflow steps:
  - [x] Add SourceTargetSelection step to MigrationStep enum
  - [x] Update StepIndicator to include the new step
  - [x] Modify workflow to start with source/target selection
- [ ] Implement API integration for:
  - [ ] Instance/Use-Case/Facility dropdowns
  - [ ] Bundle analysis
  - [ ] Conflict detection
  - [ ] Transaction execution
  - [ ] Logging system
