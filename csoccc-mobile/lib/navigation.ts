// lib/navigation.ts - Navigation and Route Planning Service

import * as Location from 'expo-location'
import { Alert, Linking } from 'react-native'
import { locationService, LocationInfo } from './location'

export interface RouteInfo {
  distance: number // in kilometers
  estimatedTime: number // in minutes
  difficulty: 'easy' | 'moderate' | 'difficult'
  warnings: string[]
  waypoints?: {
    latitude: number
    longitude: number
    description: string
  }[]
}

export interface IncidentLocation {
  latitude: number
  longitude: number
  address: string
  incidentId: string
  priority: 'low' | 'medium' | 'high' | 'critical'
}

class NavigationService {
  private isTracking = false
  private currentRoute: RouteInfo | null = null
  private destination: IncidentLocation | null = null

  async planRouteToIncident(
    incidentLocation: IncidentLocation
  ): Promise<RouteInfo | null> {
    try {
      const currentLocation = await locationService.getCurrentLocation(true)
      if (!currentLocation) {
        Alert.alert('Location Error', 'Cannot plan route without current location access.')
        return null
      }

      const distance = locationService.calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        incidentLocation.latitude,
        incidentLocation.longitude
      )

      // Estimate travel time based on Nigerian road conditions and terrain
      const estimatedTime = this.calculateTravelTime(distance, incidentLocation)

      // Assess route difficulty based on terrain and infrastructure
      const difficulty = this.assessRouteDifficulty(currentLocation, incidentLocation)

      // Generate route warnings for Nigerian context
      const warnings = this.generateRouteWarnings(currentLocation, incidentLocation, distance)

      const route: RouteInfo = {
        distance,
        estimatedTime,
        difficulty,
        warnings,
      }

      this.currentRoute = route
      this.destination = incidentLocation

      return route
    } catch (error) {
      console.error('Error planning route:', error)
      return null
    }
  }

  private calculateTravelTime(distance: number, incident: IncidentLocation): number {
    // Base speed estimates for Nigerian rural areas (km/h)
    const baseSpeed = 40 // Average for mixed terrain
    const urgencyMultiplier = incident.priority === 'critical' ? 1.2 : 1.0

    // Account for road conditions in rural Nigeria
    const roadConditionFactor = 0.8 // Assume 80% of ideal speed due to road conditions

    const effectiveSpeed = baseSpeed * roadConditionFactor * urgencyMultiplier
    return Math.round((distance / effectiveSpeed) * 60) // Convert to minutes
  }

  private assessRouteDifficulty(
    current: LocationInfo,
    incident: IncidentLocation
  ): 'easy' | 'moderate' | 'difficult' {
    const distance = locationService.calculateDistance(
      current.latitude,
      current.longitude,
      incident.latitude,
      incident.longitude
    )

    // Assess based on distance and regional terrain
    if (distance < 10) return 'easy'
    if (distance < 50) return 'moderate'
    return 'difficult'
  }

  private generateRouteWarnings(
    current: LocationInfo,
    incident: IncidentLocation,
    distance: number
  ): string[] {
    const warnings: string[] = []
    const currentState = locationService.detectNigerianState(current.latitude, current.longitude)
    const incidentState = locationService.detectNigerianState(incident.latitude, incident.longitude)

    // Cross-state travel warning
    if (currentState && incidentState && currentState.name !== incidentState.name) {
      warnings.push(`🚨 Cross-state travel: ${currentState.name} → ${incidentState.name}`)
    }

    // Long distance warning
    if (distance > 100) {
      warnings.push('⚠️ Long distance travel - ensure adequate fuel and supplies')
    }

    // High priority incident warning
    if (incident.priority === 'critical') {
      warnings.push('🚨 CRITICAL INCIDENT - Use emergency protocols and maintain radio contact')
    }

    // Rural area warning
    if (distance > 20) {
      warnings.push('📍 Rural area - GPS signal may be intermittent, carry backup navigation')
    }

    // Night travel warning
    const currentHour = new Date().getHours()
    if (currentHour < 6 || currentHour > 18) {
      warnings.push('🌙 Night travel - exercise extreme caution and consider escort')
    }

    return warnings
  }

  async openExternalNavigation(incident: IncidentLocation): Promise<boolean> {
    try {
      const currentLocation = await locationService.getCurrentLocation()
      if (!currentLocation) {
        Alert.alert('Location Error', 'Current location is required for navigation.')
        return false
      }

      const destination = `${incident.latitude},${incident.longitude}`
      const label = `Incident ${incident.incidentId}`

      // Try Google Maps first (most common in Nigeria)
      const googleMapsUrl = `google.navigation:q=${destination}&mode=d`
      const googleMapsWebUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${label}`

      const canOpenGoogleMaps = await Linking.canOpenURL(googleMapsUrl)

      if (canOpenGoogleMaps) {
        await Linking.openURL(googleMapsUrl)
        return true
      }

      // Fallback to web Google Maps
      const canOpenWeb = await Linking.canOpenURL(googleMapsWebUrl)
      if (canOpenWeb) {
        await Linking.openURL(googleMapsWebUrl)
        return true
      }

      // Last resort: Apple Maps (iOS) or generic maps
      const appleMapsUrl = `http://maps.apple.com/?daddr=${destination}&dirflg=d`
      const canOpenAppleMaps = await Linking.canOpenURL(appleMapsUrl)

      if (canOpenAppleMaps) {
        await Linking.openURL(appleMapsUrl)
        return true
      }

      Alert.alert(
        'Navigation Error',
        'No navigation app available. Please manually navigate to the coordinates provided.'
      )
      return false
    } catch (error) {
      console.error('Error opening navigation:', error)
      Alert.alert(
        'Navigation Error',
        'Failed to open navigation app. Please try again or navigate manually.'
      )
      return false
    }
  }

  async startRouteTracking(): Promise<boolean> {
    if (!this.destination) {
      Alert.alert('No Route', 'No active route to track.')
      return false
    }

    try {
      this.isTracking = true

      const success = await locationService.startLocationTracking(
        (location) => this.handleLocationUpdate(location),
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 30000, // 30 seconds
          distanceInterval: 100, // 100 meters
        }
      )

      if (success) {
        Alert.alert(
          'Route Tracking Started',
          'Your location will be tracked during navigation to the incident.'
        )
      }

      return success
    } catch (error) {
      console.error('Error starting route tracking:', error)
      this.isTracking = false
      return false
    }
  }

  private handleLocationUpdate(location: LocationInfo): void {
    if (!this.destination) return

    const distanceToDestination = locationService.calculateDistance(
      location.latitude,
      location.longitude,
      this.destination.latitude,
      this.destination.longitude
    )

    // Check if arrived at destination (within 100 meters)
    if (distanceToDestination < 0.1) {
      this.handleArrivalAtDestination()
      return
    }

    // Update route information
    if (this.currentRoute) {
      const remainingDistance = distanceToDestination
      const remainingTime = this.calculateTravelTime(remainingDistance, this.destination)

      // You could emit events here for UI updates
      console.log(`Navigation update: ${remainingDistance.toFixed(1)}km remaining, ETA ${remainingTime}min`)
    }
  }

  private handleArrivalAtDestination(): void {
    this.stopRouteTracking()

    Alert.alert(
      '🎯 Arrived at Incident Location',
      `You have arrived at incident ${this.destination?.incidentId}. Please report your status to the command center.`,
      [
        {
          text: 'Report Arrival',
          onPress: () => {
            // This would trigger a status update to the server
            console.log('Officer arrived at incident location')
          }
        }
      ]
    )
  }

  stopRouteTracking(): void {
    this.isTracking = false
    locationService.stopLocationTracking()
    this.currentRoute = null
    this.destination = null
  }

  getCurrentRoute(): RouteInfo | null {
    return this.currentRoute
  }

  getDestination(): IncidentLocation | null {
    return this.destination
  }

  isCurrentlyTracking(): boolean {
    return this.isTracking
  }

  formatRouteInfo(route: RouteInfo): string {
    const warnings = route.warnings.length > 0
      ? `\n\nWarnings:\n${route.warnings.map(w => `• ${w}`).join('\n')}`
      : ''

    return [
      `📍 Distance: ${route.distance.toFixed(1)}km`,
      `⏱️ Estimated Time: ${route.estimatedTime} minutes`,
      `🎯 Difficulty: ${route.difficulty.charAt(0).toUpperCase() + route.difficulty.slice(1)}`,
      warnings
    ].join('\n')
  }

  async sendEmergencyLocation(): Promise<boolean> {
    try {
      const location = await locationService.getCurrentLocation(true)
      if (!location) {
        Alert.alert('Location Error', 'Cannot send emergency location without GPS access.')
        return false
      }

      const emergencyInfo = locationService.formatLocationForEmergency(location)

      // In a real app, this would send to the command center
      console.log('Emergency location sent:', emergencyInfo)

      Alert.alert(
        '🚨 Emergency Location Sent',
        `Your location has been sent to CSOCCC Command Center:\n\n${emergencyInfo}`,
        [
          { text: 'Call Backup', onPress: () => Linking.openURL('tel:199') },
          { text: 'OK' }
        ]
      )

      return true
    } catch (error) {
      console.error('Error sending emergency location:', error)
      return false
    }
  }
}

export const navigationService = new NavigationService()