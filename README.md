
# Dayton Weld Certification Application

## Project Overview
This application manages the certification process for welders at Dayton, including safety training, production requirements, quality standards, and documentation.

## 🛠️ Technology Stack
- **Frontend**: React 18 with TypeScript and Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Supabase (Authentication, Database, Edge Functions)
- **Email Service**: Resend

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── QualitySection.tsx
│   ├── ProductionSection.tsx
│   ├── SafetySection.tsx
│   ├── DCPSection.tsx
│   └── ...
├── integrations/       
│   └── supabase/       # Supabase configuration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── pages/              # Page components

supabase/
├── config.toml         # Supabase configuration
└── functions/          # Edge functions
    └── send-certification-email/
```

## 🗄️ Database Schema

### certification_surveys
- Stores certification data and progress
- Includes training video completion tracking
- Links to user profiles

### profiles
- Extended user information
- Role-based access control
- Timestamp tracking

## 🔐 Authentication
- Email/password authentication via Supabase
- Role-based access control
- Protected routes and API endpoints

## 📧 Email System
- Resend integration for transactional emails
- Certification completion notifications
- Edge function implementation

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📚 Documentation
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Resend Dashboard](https://resend.com)
- [shadcn/ui Components](https://ui.shadcn.com)

## 🌐 Deployment
1. Open [Lovable](https://lovable.dev/projects/55ecfff2-3672-447e-94ff-4957930768f9)
2. Click Share → Publish
3. Site updates at [daytonweldcertification.com](https://daytonweldcertification.com)

