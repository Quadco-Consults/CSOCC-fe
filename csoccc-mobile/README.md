# CSOCCC Mobile App

Central Strategic Operations Command and Control Center (CSOCCC) Mobile Application for the Federal Ministry of Livestock Development (FMLD), Nigeria.

## Overview

The CSOCCC Mobile App is a React Native/Expo application designed for field officers to report livestock security incidents, navigate to incident locations, and maintain real-time communication with the command center.

## Features

### ✅ Implemented Features

#### 🔐 Authentication
- Secure officer login with PIN authentication
- Federal Ministry branding and official design
- Role-based access control for field officers

#### 📱 Core Screens
- **Home Dashboard**: Officer overview with active tasks and emergency alert
- **Incident Reporting**: Multi-step incident reporting with evidence capture
- **Incidents Management**: View, filter, and manage assigned incidents
- **Profile**: Officer profile, settings, and system information

#### 📸 Evidence Capture
- Real-time photo and video capture with camera integration
- GPS geotagging of all evidence files
- Automatic timestamping and metadata collection
- Gallery selection for existing media files
- Evidence preview and management system

#### 🗺️ GPS & Location Services
- High-accuracy GPS location capture
- Real-time location tracking for navigation
- Nigerian state detection and regional mapping
- Emergency location broadcasting
- Route planning and navigation integration

#### 🧭 Navigation & Route Planning
- Intelligent route planning to incident locations
- Integration with Google Maps and Apple Maps
- Nigerian road condition assessment
- Cross-state travel warnings
- Emergency route tracking

#### 🎯 Nigerian Context Features
- Multi-language support (English, Hausa, Yoruba, Igbo, Fulfulde)
- Nigerian states geographical bounds and detection
- Federal Ministry of Livestock Development official branding
- Emergency hotline integration (199)
- Rural area navigation optimization

## Technical Stack

### Core Technologies
- **React Native**: Cross-platform mobile development
- **Expo SDK 51**: Development platform and build system
- **TypeScript**: Type safety and development experience
- **React Native Paper**: Material Design UI components

### Key Dependencies
```json
{
  "expo-camera": "Camera access for evidence capture",
  "expo-image-picker": "Photo/video selection and capture",
  "expo-location": "GPS and location services",
  "expo-av": "Audio/video playback and recording",
  "expo-file-system": "Local file storage and management",
  "@expo/vector-icons": "Material Design icons",
  "react-native-paper": "Material Design UI components"
}
```

## Project Structure

```
csoccc-mobile/
├── app/                          # App Router pages
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── index.tsx             # Home dashboard
│   │   ├── report.tsx            # Quick incident reporting
│   │   ├── incidents.tsx         # Incident management
│   │   └── profile.tsx           # Officer profile
│   ├── auth/                     # Authentication screens
│   │   └── login.tsx             # Officer login
│   ├── report/                   # Detailed reporting flow
│   │   └── [type].tsx            # Multi-step incident report
│   └── incident/                 # Incident management
│       └── [id].tsx              # Detailed incident view
├── components/                   # Reusable components
│   └── EvidenceCapture.tsx       # Evidence capture component
├── lib/                         # Core services and utilities
│   ├── theme.ts                 # FMLD branding and design tokens
│   ├── camera.ts                # Camera and evidence services
│   ├── location.ts              # GPS and location services
│   └── navigation.ts            # Route planning and navigation
├── assets/                      # App icons and images
├── app.json                     # Expo configuration
└── package.json                 # Dependencies and scripts
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed globally: `npm install -g @expo/cli`
- iOS Simulator (macOS) or Android Emulator
- Physical device for testing camera and GPS features

### Installation

1. **Clone and navigate to the mobile app directory:**
```bash
cd csoccc-platform/csoccc-mobile
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Run on device/simulator:**
- iOS: `npm run ios` or scan QR code with Expo Go
- Android: `npm run android` or scan QR code with Expo Go
- Web: `npm run web` (limited functionality)

### Development Commands

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web (limited features)
npm run web

# Clear cache and restart
npx expo start --clear
```

## Key Services

### 📸 Camera Service (`lib/camera.ts`)
```typescript
import { cameraService } from '../lib/camera'

// Capture photo with GPS tagging
const photo = await cameraService.capturePhoto()

// Capture video (30s max)
const video = await cameraService.captureVideo()

// Select from gallery
const file = await cameraService.selectFromGallery()
```

### 🗺️ Location Service (`lib/location.ts`)
```typescript
import { locationService } from '../lib/location'

// Get current high-accuracy location
const location = await locationService.getCurrentLocation(true)

// Start location tracking
await locationService.startLocationTracking(
  (location) => console.log('Location update:', location),
  { accuracy: Location.Accuracy.High }
)

// Detect Nigerian state from coordinates
const state = locationService.detectNigerianState(lat, lng)
```

### 🧭 Navigation Service (`lib/navigation.ts`)
```typescript
import { navigationService } from '../lib/navigation'

// Plan route to incident
const route = await navigationService.planRouteToIncident(incidentLocation)

// Start external navigation
await navigationService.openExternalNavigation(incidentLocation)

// Send emergency location
await navigationService.sendEmergencyLocation()
```

## Testing Features

### 📱 Basic App Testing
1. **Login Flow**: Test officer authentication with sample credentials
2. **Navigation**: Verify tab navigation and screen transitions
3. **UI Components**: Test Material Design components and FMLD branding

### 📸 Camera & Evidence Testing
1. **Photo Capture**: Test camera access and photo capture
2. **Video Recording**: Test video recording (30-second limit)
3. **Gallery Selection**: Test media selection from device gallery
4. **GPS Tagging**: Verify automatic geotagging of evidence files

### 🗺️ Location & Navigation Testing
1. **GPS Access**: Test location permissions and accuracy
2. **Address Lookup**: Test reverse geocoding for Nigerian addresses
3. **State Detection**: Test Nigerian state detection from coordinates
4. **Navigation Integration**: Test Google Maps/Apple Maps integration

### 🎯 Incident Reporting Testing
1. **Multi-step Form**: Test 3-step incident reporting flow
2. **Location Capture**: Test automatic GPS location in reports
3. **Evidence Attachment**: Test evidence file attachment and preview
4. **Offline Support**: Test report queuing when offline

## Production Deployment

### Build Configuration
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS build
eas build:configure

# Build for iOS App Store
eas build --platform ios --profile production

# Build for Google Play Store
eas build --platform android --profile production
```

### App Store Requirements
- **iOS Bundle ID**: `ng.gov.fmld.csoccc`
- **Android Package**: `ng.gov.fmld.csoccc`
- **Minimum iOS Version**: 13.0
- **Minimum Android Version**: API 21 (Android 5.0)

## Security Considerations

### 🔒 Data Protection
- All evidence files stored locally with encryption
- GPS coordinates protected with appropriate permissions
- Officer authentication with secure PIN system
- Emergency location transmission over encrypted channels

### 🛡️ Permissions
- **Camera**: Required for evidence capture
- **Location**: Required for incident reporting and navigation
- **Microphone**: Required for voice reports and video evidence
- **Storage**: Required for evidence file management

## Integration with Web Dashboard

### 📡 API Endpoints (Future Implementation)
```typescript
// Incident reporting endpoint
POST /api/mobile/incidents
{
  type: 'cattle_rustling',
  location: { latitude: 7.7322, longitude: 8.5391 },
  evidence: [...files],
  priority: 'critical'
}

// Status updates endpoint
PUT /api/mobile/incidents/:id/status
{
  status: 'en_route',
  location: { latitude: 7.7322, longitude: 8.5391 },
  notes: 'Officer responding to incident'
}

// Emergency alert endpoint
POST /api/mobile/emergency
{
  officerId: 'FO-2024-089',
  location: { latitude: 7.7322, longitude: 8.5391 },
  timestamp: '2024-01-08T12:30:00Z'
}
```

## Nigerian Context Features

### 🇳🇬 Localization Support
- **English**: Primary interface language
- **Hausa**: Northern Nigeria regional language
- **Yoruba**: Southwestern Nigeria regional language
- **Igbo**: Southeastern Nigeria regional language
- **Fulfulde**: Pastoral community language

### 🗺️ Geographic Features
- Coverage for all 36 Nigerian states + FCT
- Rural area navigation optimization
- Cross-state travel warnings
- Regional incident type customization
- Emergency contact integration (199 hotline)

## Support & Documentation

### 📞 Emergency Contacts
- **CSOCCC Hotline**: 199 (24/7 emergency response)
- **Technical Support**: support@fmld.gov.ng
- **Command Center**: command@csoccc.gov.ng

### 📚 Additional Resources
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://react-native-paper.github.io/react-native-paper/)
- [Federal Ministry of Livestock Development](https://fmld.gov.ng/)

---

**Federal Ministry of Livestock Development**
**Central Strategic Operations Command and Control Center (CSOCCC)**
Serving Nigeria with Pride and Dedication 🇳🇬