# CSOCCC Platform Frontend

**Central Strategic Operations Command and Control Center (CSOCCC)**
Federal Ministry of Livestock Development (FMLD), Nigeria

![Nigeria Flag](https://flagcdn.com/ng.svg)

## Project Overview

This is the official frontend application for the Central Strategic Operations Command and Control Center (CSOCCC), developed for the Federal Ministry of Livestock Development (FMLD), Nigeria. The platform provides real-time incident management and rapid response capabilities for farmer-herder conflict resolution and livestock security across Nigeria.

## 🚀 Features

### Landing Page ✅ **COMPLETED**
- **Professional Government Design** - Official FMLD branding and colors
- **Hero Section** - Full-screen hero with animated statistics and CTAs
- **Key Features** - 6 core capabilities with detailed descriptions
- **Incident Response Flow** - 4-step visual timeline (Report → Received → Dispatch → Resolved)
- **Statistics Dashboard** - Animated counters with real-time metrics
- **Incident Types Coverage** - Complete coverage of all 6 incident categories
- **Mobile App Preview** - Detailed mobile interface mockup
- **Partners Section** - Government, security, and international partnerships
- **Multi-language Support** - English, Hausa, Yoruba, Igbo, Fulfulde
- **Responsive Design** - Mobile-first approach with perfect scaling

### Core Capabilities
- 🗺️ **Real-Time Monitoring** - Interactive map with live GPS tracking
- 📱 **Mobile Reporting** - Offline-first app with voice input
- ⚡ **Rapid Response** - Two-click resource deployment (<2 minutes)
- 🔮 **Early Warning System** - AI-powered predictive analytics
- 📊 **Intelligence Analytics** - Pattern analysis and automated briefings
- 🤝 **Community Integration** - Multi-language and cultural support

### Incident Types Managed
- 🐄 **Cattle Rustling** - Armed theft and rustling activities
- 🗺️ **Boundary Disputes** - Land and boundary conflicts
- ⚔️ **Violent Clashes** - Confrontations requiring immediate response
- ⛏️ **Illegal Mining** - Mining activities affecting grazing areas
- 🔥 **Fire Outbreaks** - Fire incidents in grazing reserves
- 👁️ **Suspicious Movements** - Unusual patterns detected

## 🛠 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with FMLD design system
- **UI Components**: Custom components with shadcn/ui foundation
- **State Management**: Zustand (planned)
- **Maps**: Leaflet with React-Leaflet (planned)
- **Forms**: React Hook Form + Zod validation (planned)
- **Charts**: Recharts (planned)
- **Icons**: Lucide React (planned)

## 📁 Project Structure

```
src/
├── app/
│   ├── (landing)/              # Landing page group
│   │   ├── layout.tsx          # Landing layout
│   │   └── page.tsx           # Main landing page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── landing/               # Landing page components
│   │   ├── Navbar.tsx         # Navigation header
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Statistics.tsx     # Animated stats
│   │   ├── Features.tsx       # Core features
│   │   ├── HowItWorks.tsx    # Process flow
│   │   ├── IncidentTypes.tsx  # Incident coverage
│   │   ├── MobileAppSection.tsx # Mobile app preview
│   │   ├── Partners.tsx       # Partner organizations
│   │   ├── CallToAction.tsx   # Final CTA
│   │   └── Footer.tsx        # Site footer
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── constants.ts          # App constants
│   └── utils.ts              # Utility functions
├── types/
│   └── index.ts              # TypeScript definitions
└── data/
    └── mockData.ts           # Sample data
```

## 🎨 Design System

### Colors (FMLD Official Palette)
```css
--fmld-green-primary: #008751    /* Nigerian Green - Primary */
--fmld-green-dark: #006B40       /* Hover states */
--fmld-green-light: #00A86B      /* Accents */
--fmld-gold: #C9A227             /* Gold accents */
--fmld-cream: #F5F5DC            /* Warm backgrounds */

/* Priority Colors */
--status-critical: #DC2626       /* Critical incidents */
--status-warning: #F59E0B        /* Warning level */
--status-resolved: #10B981       /* Resolved status */
```

### Typography
- **Headings**: Poppins (Professional, government-appropriate)
- **Body**: Inter (Clean, highly readable)
- **Monospace**: JetBrains Mono (Technical data display)

## 📊 Mock Data Included

- **6 Sample Incidents** - Realistic incidents across Nigerian states
- **6 Response Teams** - Active deployment status and locations
- **Dashboard Metrics** - Live statistics and performance data
- **4 Intelligence Alerts** - Early warning system examples
- **Geographic Hotspots** - High-risk areas across Nigeria

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Quadco-Consults/CSOCC-fe.git
cd CSOCC-fe

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🏢 Government Information

**Federal Ministry of Livestock Development (FMLD)**
- **Website**: https://www.fmld.gov.ng
- **Email**: info@fmld.gov.ng
- **Address**: Office of the SGF, 3 Arms Zone, Maitama, Abuja
- **Minister**: Honourable Idi Mukhtar Maiha
- **Permanent Secretary**: Dr. Chinyere Ijeoma Akujobi

### Emergency Contact
**📞 CSOCCC Emergency Hotline: 199**
- Available 24/7
- Multi-language support
- Free nationwide access

## 🔄 Development Status

### ✅ Phase 1: Foundation (COMPLETED)
- [x] Next.js project initialization
- [x] FMLD branding and design system
- [x] TypeScript configuration
- [x] Tailwind CSS setup
- [x] Component structure

### ✅ Phase 2: Landing Page (COMPLETED)
- [x] Navigation and layout
- [x] Hero section with statistics
- [x] Features showcase
- [x] How it works process
- [x] Incident types coverage
- [x] Mobile app section
- [x] Partners and testimonials
- [x] Call to action
- [x] Comprehensive footer

### 🚧 Phase 3: Dashboard (PLANNED)
- [ ] Command center layout
- [ ] Real-time incident map
- [ ] Metrics dashboard
- [ ] Incident management
- [ ] Team coordination
- [ ] Intelligence analytics

### 🚧 Phase 4: Mobile App (PLANNED)
- [ ] React Native/Expo setup
- [ ] Offline-first architecture
- [ ] Voice input integration
- [ ] Camera/evidence capture
- [ ] Push notifications

## 🤝 Contributing

This project is developed for the Federal Ministry of Livestock Development. For contributions or issues:

1. Contact the development team
2. Follow government security protocols
3. Ensure compliance with Nigerian data protection laws

## 📄 License

This project is proprietary to the Federal Ministry of Livestock Development, Federal Republic of Nigeria. All rights reserved.

## 🏛️ Acknowledgments

- **Federal Ministry of Livestock Development** - Project leadership
- **Office of the Secretary to the Government** - Administrative support
- **Nigeria Police Force** - Security coordination
- **World Bank Group** - Technical assistance
- **Food and Agriculture Organization (FAO)** - Livestock expertise

---

**🇳🇬 Built with pride for Nigeria's livestock sector security**

*"Together We Protect Nigeria's Livestock Heritage"*
— Hon. Idi Mukhtar Maiha, Federal Minister of Livestock Development