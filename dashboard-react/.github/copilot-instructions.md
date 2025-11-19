# Indoor Climate Dashboard - Project Instructions

## Project Overview

This project is a **prototype dashboard for visualizing indoor climate data**. The purpose is to display important environmental parameters to facilitate indoor monitoring. The dashboard should clearly show temperature, humidity, CO₂ levels, and air quality for users. The dashboard must be simple and web-based to facilitate access and use.

## Language Requirements

- **ALL user-facing text must be in English**
- Use English for UI labels, buttons, error messages, and descriptions
- Variable names and code should follow English conventions
- Only use Swedish in comments if absolutely necessary for business context

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Charts**: Recharts (not Chart.js)
- **Icons**: lucide-react
- **Data**: Mock JSON data (mock_climate_data.json, thresholds.json)

## Key Metrics to Display

1. **Temperature** (°C) - Min: 18°C, Max: 26°C
2. **Humidity** (%) - Min: 30%, Max: 60%
3. **CO₂ Levels** (ppm) - Max: 1000 ppm
4. **Air Quality Index (AQI)** - Max: 100
5. **Occupancy** (people) - Max: 80 people

## Core Features

- Line charts for each metric with time-series data
- Time filtering (Last 24 hours / Last 7 days)
- Visual alerts for threshold violations (values outside acceptable ranges)
- Responsive design for various screen sizes
- Clean and intuitive user interface
- **Mobile-first design** - Dashboard must look excellent on phone screens
- Modern, card-based layout with proper spacing
- Touch-friendly controls and appropriate sizing for mobile devices

## Development Guidelines

### Code Quality Standards

- **Always follow React and TypeScript best practices**
- Use functional components with hooks (useState, useEffect, useMemo, etc.)
- Implement proper TypeScript typing - avoid `any` types
- Keep components small, focused, and reusable
- Use meaningful variable and function names
- Follow the DRY (Don't Repeat Yourself) principle

### Code Style

- **Do NOT include unnecessary comments** - code should be self-documenting
- Only add comments for complex business logic or non-obvious implementations
- Use clear, descriptive names instead of comments
- Prefer concise, readable code over verbose explanations

### File Organization

- **NEVER create README.md files** unless explicitly requested
- Organize code by feature/component in appropriate directories
- Keep utility functions in `src/utils/`
- Keep type definitions in `src/types/`
- Keep components in `src/components/`

### Component Structure

- One component per file
- Export components as default
- Use named exports for utility functions and types
- Keep component logic clean - extract complex logic to custom hooks or utilities

### State Management

- Use React hooks for local state management
- Lift state up when needed for component communication
- Consider useContext for global state if the app grows
- Memoize expensive calculations with useMemo/useCallback

### Performance

- Optimize re-renders with proper dependency arrays
- Use React.memo() for expensive components
- Lazy load components when appropriate
- Debounce user interactions when needed

### Data Handling

- Load data asynchronously from public folder
- Implement proper error handling for data fetching
- Filter and transform data efficiently
- Cache processed data to avoid unnecessary recalculations

### Styling

- Use CSS Modules or scoped CSS for component styles
- Ensure responsive design (mobile-first approach)
- Maintain consistent spacing and typography
- Follow accessibility best practices (proper contrast, semantic HTML)

### Testing Approach

- Test in the browser during development
- Verify all features work across different time filters
- Check responsive behavior on different screen sizes
- Validate threshold alerts display correctly

## Project-Specific Rules

- Use Swedish metric thresholds as defined in thresholds.json
- Display data in clear, user-friendly formats
- Prioritize simplicity and ease of use over complex features
- Ensure charts are readable and informative
- Keep the UI clean and uncluttered

## What NOT to Do

- ❌ Do not create README.md files
- ❌ Do not add unnecessary comments
- ❌ Do not use `any` type in TypeScript
- ❌ Do not create overly complex abstractions for simple features
- ❌ Do not ignore TypeScript errors or warnings
- ❌ Do not commit commented-out code
- ❌ Do not create unused files or components

## Git Workflow

- Make atomic, focused commits
- Write clear commit messages in English
- Keep the working directory clean
- Don't commit node_modules or build artifacts

## Priority Focus Areas

1. **Clarity**: Display data in a clear, understandable way
2. **Simplicity**: Keep the UI simple and intuitive
3. **Performance**: Ensure smooth interactions and fast load times
4. **Maintainability**: Write clean, well-structured code
5. **Responsiveness**: Work well on all device sizes
