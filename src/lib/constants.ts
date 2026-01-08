// src/lib/constants.ts

import { IncidentType } from '@/types';

export const INCIDENT_TYPES: Record<IncidentType, {
  label: string;
  icon: string;
  color: string;
  description: string;
}> = {
  cattle_rustling: {
    label: 'Cattle Rustling',
    icon: '🐄',
    color: 'text-red-600',
    description: 'Armed cattle theft and rustling activities'
  },
  boundary_dispute: {
    label: 'Boundary Dispute',
    icon: '🗺️',
    color: 'text-orange-600',
    description: 'Land and boundary disputes between communities'
  },
  violent_clash: {
    label: 'Violent Clash',
    icon: '⚔️',
    color: 'text-red-700',
    description: 'Violent confrontations and clashes'
  },
  illegal_mining: {
    label: 'Illegal Mining',
    icon: '⛏️',
    color: 'text-yellow-600',
    description: 'Illegal mining activities affecting grazing areas'
  },
  fire_outbreak: {
    label: 'Fire Outbreak',
    icon: '🔥',
    color: 'text-red-500',
    description: 'Fire outbreaks in grazing areas and reserves'
  },
  suspicious_movement: {
    label: 'Suspicious Movement',
    icon: '👁️',
    color: 'text-blue-600',
    description: 'Unusual movement patterns detected'
  }
};

export const PRIORITY_COLORS = {
  critical: 'bg-red-100 text-red-800 border-red-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  resolved: 'bg-green-100 text-green-800 border-green-200',
};

export const STATUS_COLORS = {
  reported: 'bg-blue-100 text-blue-800',
  assigned: 'bg-purple-100 text-purple-800',
  en_route: 'bg-orange-100 text-orange-800',
  on_scene: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
};

export const NIGERIA_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
  'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
  'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export const FMLD_CONTACT = {
  website: 'https://www.fmld.gov.ng',
  email: 'info@fmld.gov.ng',
  address: 'Office of the SGF, 3 Arms Zone, Maitama, Abuja',
  minister: 'Honourable Minister: Idi Mukhtar Maiha',
  permanentSecretary: 'Permanent Secretary: Dr. Chinyere Ijeoma Akujobi'
};

export const LOGO_URLS = {
  primary: 'https://www.fmld.gov.ng/media/pitures/FEDERAL_MINISTRY_OF_LIVESTOCK_DEVELOPMENT_2.png',
  emblem: 'https://www.fmld.gov.ng/media/about_images/Logo-emblem.jpg'
};

export const APP_CONFIG = {
  name: 'CSOCCC',
  fullName: 'Central Strategic Operations Command and Control Center',
  description: 'Federal Ministry of Livestock Development - Nigeria',
  tagline: 'Protecting Nigeria\'s Livestock Sector',
  subtagline: 'Real-time incident monitoring and rapid response for farmer-herder conflict resolution'
};