
# 🛠️ Dayton Weld Certification – Technical Documentation

## Project Architecture

### Frontend Components
- **Authentication**: Managed through AuthProvider component
- **Certification Process**: Multi-step form with progress tracking
- **Quality Checks**: Video completion verification
- **Production Standards**: Assessment tracking
- **Safety Requirements**: Checklist and verification
- **DCP Integration**: Documentation control process

### Database Structure (Supabase)

#### Tables
1. **certification_surveys**
   - Tracks certification progress
   - Stores completion status
   - Manages training materials

2. **profiles**
   - User information
   - Role management
   - Account tracking

### Edge Functions
- **send-certification-email**: Handles email notifications
- Implemented using Deno runtime
- Integrated with Resend API

## 🔗 Key URLs & Resources

- **Live Site**: [https://daytonweldcertification.com](https://daytonweldcertification.com)  
- **Lovable Editor**: [https://lovable.dev/projects/55ecfff2-3672-447e-94ff-4957930768f9](https://lovable.dev/projects/55ecfff2-3672-447e-94ff-4957930768f9)

## ⚙️ Technology Stack Details

### Frontend
- **React + Vite**: Fast development and optimized builds
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn-ui**: Pre-built accessible components

### Backend (Supabase)
- **Authentication**: Email/password
- **Database**: PostgreSQL with RLS
- **Edge Functions**: Deno runtime
- **Storage**: File management

### Email (Resend)
- Transactional email service
- HTML email templates
- Delivery tracking

## 🚀 Deployment Process

1. **Development**
   ```bash
   npm run dev
   ```

2. **Testing**
   ```bash
   npm run build
   npm run preview
   ```

3. **Production**
   - Use Lovable's publishing system
   - Automatic SSL certificate management
   - CDN distribution

## 🌐 Domain Management

- **Domain**: `daytonweldcertification.com`
- **SSL**: Enabled automatically
- **Management**: Via Lovable dashboard

## 📬 Email Configuration

- **Service**: Resend
- **API Integration**: Via Edge Functions
- **Templates**: HTML email templates
- **Tracking**: Delivery and open rates

---

For developer onboarding and detailed documentation, see [README.md](./README.md)

> Built with ❤️ using React, Tailwind, and Lovable

