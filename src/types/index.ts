// src/types/index.ts

export type IncidentType =
  | 'cattle_rustling'
  | 'boundary_dispute'
  | 'violent_clash'
  | 'illegal_mining'
  | 'fire_outbreak'
  | 'suspicious_movement';

export type Priority = 'critical' | 'warning' | 'resolved';

export type IncidentStatus =
  | 'reported'
  | 'assigned'
  | 'en_route'
  | 'on_scene'
  | 'resolved';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Incident {
  id: string;
  type: IncidentType;
  priority: Priority;
  status: IncidentStatus;
  title: string;
  description: string;
  location: Coordinates;
  locationName: string;
  state: string;
  lga: string;
  reportedAt: Date;
  reportedBy: string;
  reporterPhone?: string;
  assignedTo?: string;
  assignedAt?: Date;
  resolvedAt?: Date;
  evidence: Evidence[];
  updates: IncidentUpdate[];
}

export interface Evidence {
  id: string;
  type: 'photo' | 'video' | 'audio';
  url: string;
  thumbnail?: string;
  timestamp: Date;
  coordinates?: Coordinates;
  uploadedBy: string;
}

export interface IncidentUpdate {
  id: string;
  message: string;
  author: string;
  authorRole: string;
  timestamp: Date;
  status?: IncidentStatus;
}

export interface ResponseTeam {
  id: string;
  name: string;
  leader: string;
  memberCount: number;
  status: 'available' | 'deployed' | 'offline';
  currentLocation?: Coordinates;
  assignedIncident?: string;
  zone: string;
  contactPhone: string;
}

export interface DashboardMetrics {
  activeIncidents: number;
  criticalCount: number;
  warningCount: number;
  resolvedToday: number;
  avgResponseTime: number;
  totalResolvedThisWeek: number;
  hotspots: Hotspot[];
}

export interface Hotspot {
  location: Coordinates;
  locationName: string;
  state: string;
  incidentCount: number;
  severity: 'high' | 'medium' | 'low';
}

export interface Alert {
  id: string;
  type: 'movement' | 'buffer_zone' | 'seasonal' | 'pattern';
  title: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: Date;
  location?: Coordinates;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'commander' | 'operator' | 'field_officer';
  avatar?: string;
  zone?: string;
  lastActive: Date;
}