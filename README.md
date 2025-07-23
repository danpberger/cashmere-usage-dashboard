# Cashmere Media Usage Indicator & Dashboard

An interactive usage tracking system for Cashmere Media's scholarly content access platform, seamlessly integrated within the chat interface.

## 🎯 Overview

The Cashmere Media Usage Indicator provides real-time visibility into user consumption of scholarly content while maintaining an unobtrusive user experience. The system consists of two main components:

1. **Usage Indicator**: A minimizable widget showing essential metrics
2. **Detailed Dashboard**: A comprehensive interface for detailed usage analytics

## ✨ Key Features

### Usage Indicator
- **Adaptive Status Display**: Color-coded visual feedback based on credit levels
- **Minimizable Design**: Reduces to a compact 64x64px icon when minimized
- **Real-time Updates**: Live tracking of credits, searches, and spending
- **Quick Access Metrics**: Credits remaining, searches left, current balance, and monthly spend

### Detailed Dashboard
- **Comprehensive Analytics**: Multi-tab interface covering overview, transactions, and content sources
- **Interactive Elements**: Clickable content sources with direct access links
- **Export Functionality**: Transaction history and content source export capabilities
- **Advanced Filtering**: Transaction filtering by type (search, access, purchase)

## 🏗️ Architecture & Design Decisions

### Component Structure
```
src/
├── components/
│   ├── UsageIndicator.tsx    # Main widget component
│   └── UsageDashboard.tsx    # Detailed analytics panel
├── hooks/
│   └── useUsageData.ts       # Custom hook for data management
├── types/
│   └── usage.ts              # TypeScript interfaces
└── App.tsx                   # Main application with chat interface
```

### Design Philosophy

#### 1. **Non-Intrusive Integration**
- Fixed positioning in top-right corner
- Smooth animations and transitions
- Contextual color coding for status awareness
- Minimizable to reduce visual clutter

#### 2. **Progressive Disclosure**
- Essential information in the compact indicator
- Detailed analytics accessible on-demand
- Layered information architecture

#### 3. **User-Centric Experience**
- Immediate access to critical usage metrics
- Clear cost transparency
- Quick access to previously viewed content
- Intuitive interaction patterns

### Technical Choices

#### Framework: React with TypeScript
- **Reasoning**: Type safety, component reusability, and robust ecosystem
- **Benefits**: Better developer experience, compile-time error catching, and maintainability

#### Styling: Tailwind CSS
- **Reasoning**: Utility-first approach with custom design system
- **Benefits**: Rapid development, consistent spacing, and built-in responsive design
- **Custom Extensions**: Cashmere brand colors, custom animations, and component-specific utilities

#### State Management: Custom Hook Pattern
- **Reasoning**: Lightweight solution for focused data needs
- **Benefits**: Separation of concerns, testability, and reusability
- **Implementation**: `useUsageData` hook centralizes all usage-related state and API interactions

## 🎨 Visual Design

### Color System
```css
/* Status Colors */
Green (50%+ credits): Safe usage levels
Yellow (20-50% credits): Caution threshold  
Red (<20% credits): Critical levels

/* Brand Colors */
cashmere-500: Primary brand color
cashmere-700: Interactive elements
cashmere-100: Background accents
```

### Animation Strategy
- **Entrance**: 300ms slide-up animation for dashboard
- **State Changes**: Smooth 200ms transitions for indicator states
- **Micro-interactions**: Subtle hover effects and loading states

### Responsive Behavior
- **Desktop**: Fixed positioning with full feature set
- **Mobile**: Adaptive sizing with touch-friendly interactions
- **Dashboard**: Full-screen overlay on smaller devices

## 🔧 Component Details

### UsageIndicator Component

**States:**
- `minimized`: 64x64px icon with essential credit count
- `expanded`: 320x384px panel with detailed metrics

**Key Features:**
- Real-time credit and search tracking
- Progressive status indicators
- One-click dashboard access
- Smooth minimize/expand transitions

### UsageDashboard Component

**Tabs:**
1. **Overview**: Key metrics with visual progress indicators
2. **Transactions**: Filterable transaction history with export
3. **Content Sources**: Recently accessed content with direct links

**Interactive Elements:**
- Content source links open in new tabs
- Export functionality for data portability
- Real-time data refresh capability
- Advanced filtering and sorting

### useUsageData Hook

**Responsibilities:**
- Centralized state management
- API communication simulation
- Real-time data updates
- Loading state management

**Data Structure:**
```typescript
interface UsageMetrics {
  remainingCredits: number;
  totalCredits: number;
  remainingSearches: number;
  totalSearches: number;
  currentBalance: number;
  monthlySpend: number;
  monthlyLimit: number;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm or yarn package manager

### Installation
```bash
# Navigate to project directory
cd cashmere-usage-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎛️ Configuration

### Environment Variables
```env
VITE_API_BASE_URL=https://api.cashmere.media
VITE_REFRESH_INTERVAL=30000
VITE_ENABLE_MOCK_DATA=true
```

### Customization Options

#### Indicator Position
```css
.usage-indicator {
  /* Modify position in src/index.css */
  top: 1rem;    /* Distance from top */
  right: 1rem;  /* Distance from right */
}
```

#### Refresh Intervals
```typescript
// Modify in src/hooks/useUsageData.ts
const REFRESH_INTERVAL = 30000; // 30 seconds
```

## 🔮 Future Enhancements

### Planned Features
1. **Real-time WebSocket Integration**: Live usage updates
2. **Advanced Analytics**: Usage trends and patterns
3. **Mobile App Integration**: Cross-platform synchronization
4. **Usage Predictions**: AI-powered consumption forecasting
5. **Team Management**: Multi-user usage tracking

### Accessibility Improvements
- Screen reader compatibility
- Keyboard navigation support
- High contrast mode
- Reduced motion preferences

## 📊 Performance Considerations

### Optimization Strategies
- Lazy loading for dashboard components
- Memoization for expensive calculations
- Efficient re-rendering with React.memo
- Optimistic updates for better UX

### Bundle Size
- Tree-shaking enabled
- Dynamic imports for dashboard
- Minimized CSS with PurgeCSS
- Compressed assets in production

## 🧪 Testing Strategy

### Unit Tests
- Component rendering and behavior
- Hook functionality and state management
- Utility functions and calculations

### Integration Tests
- Dashboard navigation and filtering
- Data flow between components
- API integration scenarios

### End-to-End Tests
- Complete user workflows
- Cross-browser compatibility
- Responsive behavior validation

---

*This documentation serves as a comprehensive guide for understanding, maintaining, and extending the Cashmere Media Usage Indicator system.*
