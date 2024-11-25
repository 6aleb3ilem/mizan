# MIZANLIMS Complete Layout Structure

## 1. Pre-authentication Layout
```plaintext
Pre-auth Layout
└── Simple Layout Container
    ├── Header
    │   └── Logo/Brand
    └── Content Area (Centered)
        ├── Login Page
        │   ├── Username/Email field
        │   ├── Password field
        │   ├── Remember me checkbox
        │   ├── Login button
        │   └── Forgot password link
        │
        ├── Signup Page (Admin only)
        │   ├── Personal Information
        │   │   ├── Full name
        │   │   ├── Email
        │   │   └── Contact number
        │   ├── Account Information
        │   │   ├── Username
        │   │   ├── Password
        │   │   └── Confirm password
        │   └── Submit button
        │
        └── Forgot Password Page
            ├── Email field
            ├── Reset button
            └── Back to login link
```

## 2. Super Admin Panel
```plaintext
Admin Panel Layout
├── Header
│   ├── Logo
│   ├── Quick Search
│   ├── Notifications
│   └── Admin Profile Menu
│
├── Sidebar
│   ├── Admin Profile Summary
│   └── Administrative Functions
│       ├── User Management
│       │   ├── Create users
│       │   ├── Assign roles
│       │   └── Manage permissions
│       ├── Module Management
│       │   ├── Enable/Disable modules
│       │   └── Configure module settings
│       ├── System Settings
│       └── Audit Logs
│
└── Main Content Area
    ├── Dashboard
    │   ├── System Statistics
    │   ├── User Activities
    │   └── Module Status
    └── Management Screens
```

## 3. Main Application Layout (Post-Authentication)
```plaintext
Main Application Structure
├── Header Bar
│   ├── Company Logo (Left)
│   ├── Module Navigation (Center)
│   │   └── Module Icons
│   │       ├── Commercial
│   │       ├── Project
│   │       ├── Financial
│   │       ├── Resources
│   │       └── Reports
│   └── User Menu (Right)
│       ├── Notifications
│       ├── Profile
│       └── Logout
│
├── Selected Module Container
│   ├── Module Header
│   │   ├── Module Title
│   │   ├── Module Navigation
│   │   └── Module Actions
│   │
│   ├── Module Sidebar
│   │   └── Module-Specific Navigation
│   │
│   └── Module Content Area
│       ├── Breadcrumb Navigation
│       ├── Page Title & Actions
│       └── Main Content
│
└── Footer
    └── Application Info
```

## 4. Commercial Module Hierarchy
```plaintext
Commercial Module Structure
├── Dashboard
│   ├── Key Statistics
│   │   ├── Total Clients
│   │   ├── Active Projects
│   │   ├── Pending Devis
│   │   └── Monthly Revenue
│   ├── Recent Activities
│   └── Quick Actions
│
├── Clients Management
│   ├── Client List
│   │   ├── Search & Filters
│   │   └── Client Table
│   ├── Client Details
│   │   ├── Basic Information
│   │   ├── Contact Information
│   │   ├── Projects List
│   │   └── Activity History
│   └── Client Creation/Edit
│
├── Projects Management
│   ├── Project List
│   │   ├── Search & Filters
│   │   └── Project Table
│   ├── Project Details
│   │   ├── Project Information
│   │   ├── Client Details
│   │   ├── Tasks
│   │   └── Documents
│   └── Project Creation/Edit
│
├── Devis Management
│   ├── Devis List
│   │   ├── Search & Filters
│   │   └── Devis Table
│   ├── Devis Details
│   │   ├── Quote Information
│   │   ├── Project Reference
│   │   ├── Items/Services
│   │   └── Calculations
│   └── Devis Creation/Edit
│
└── References Management
    ├── Status Management
    ├── BCT Management
    ├── Profession Management
    ├── Situation Management
    ├── Priority Management
    ├── Type Management
    └── Unite Management
```

## 5. Navigation Flow
```plaintext
User Journey Flow
1. Authentication
   └── Login → Module Selection

2. Module Selection
   └── Click Module → Module Dashboard

3. Commercial Module Navigation
   ├── Sidebar Navigation
   │   └── Main Features Access
   ├── Quick Actions
   │   └── Common Tasks
   └── Breadcrumb Navigation
       └── Hierarchical Navigation
```

## 6. Responsive Behavior
```plaintext
Responsive Layout Structure
├── Desktop View
│   ├── Full sidebar
│   ├── Expanded content area
│   └── Multiple columns
│
├── Tablet View
│   ├── Collapsible sidebar
│   ├── Adjusted content area
│   └── Reduced columns
│
└── Mobile View
    ├── Hidden sidebar (hamburger menu)
    ├── Full-width content
    └── Single column layout
```

## 7. Common UI Components
```plaintext
Reusable Components
├── Data Display
│   ├── Data Tables
│   ├── Cards
│   ├── Status Indicators
│   └── Charts/Graphs
│
├── Forms
│   ├── Input Fields
│   ├── Select Dropdowns
│   ├── Date Pickers
│   └── File Upload
│
├── Navigation
│   ├── Breadcrumbs
│   ├── Tab Bars
│   ├── Pagination
│   └── Search Bars
│
└── Feedback
    ├── Alert Messages
    ├── Progress Indicators
    ├── Loading States
    └── Error Messages
```

Would you like me to:
1. Detail the implementation of any specific section?
2. Provide the component structure for a specific module?
3. Create the styling guidelines and theme configuration?
4. Show the routing setup for this structure?
