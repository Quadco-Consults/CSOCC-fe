// lib/location.ts - GPS and Location Services

import * as Location from 'expo-location'
import { Alert } from 'react-native'

export interface LocationInfo {
  latitude: number
  longitude: number
  accuracy?: number
  altitude?: number
  heading?: number
  speed?: number
  timestamp: number
  address?: string
  coordinates: string
}

export interface NigerianState {
  name: string
  capital: string
  bounds: {
    north: number
    south: number
    east: number
    west: number
  }
}

// Nigerian states with their geographical bounds
const NIGERIAN_STATES: NigerianState[] = [
  { name: 'Benue', capital: 'Makurdi', bounds: { north: 8.5, south: 6.5, east: 10.0, west: 7.3 } },
  { name: 'Plateau', capital: 'Jos', bounds: { north: 10.4, south: 8.2, east: 10.6, west: 8.8 } },
  { name: 'Kaduna', capital: 'Kaduna', bounds: { north: 11.6, south: 9.0, east: 8.9, west: 6.1 } },
  { name: 'Taraba', capital: 'Jalingo', bounds: { north: 9.8, south: 6.5, east: 14.6, west: 9.3 } },
  { name: 'Nasarawa', capital: 'Lafia', bounds: { north: 9.6, south: 7.7, east: 9.6, west: 7.0 } },
  { name: 'Kano', capital: 'Kano', bounds: { north: 12.9, south: 10.4, east: 9.7, west: 7.6 } },
  { name: 'Bauchi', capital: 'Bauchi', bounds: { north: 12.8, south: 9.3, east: 11.7, west: 8.8 } },
  { name: 'Adamawa', capital: 'Yola', bounds: { north: 11.5, south: 7.0, east: 14.2, west: 11.0 } },
]

class LocationService {
  private watchId: Location.LocationSubscription | null = null
  private lastKnownLocation: LocationInfo | null = null

  async requestPermissions(): Promise<boolean> {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'CSOCCC Mobile needs location access to accurately report incident locations and provide navigation assistance.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Grant Permission', onPress: async () => {
              const { status: newStatus } = await Location.requestForegroundPermissionsAsync()
              return newStatus === 'granted'
            }}
          ]
        )
        return false
      }

      // Request background location for emergency tracking
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync()
      if (backgroundStatus !== 'granted') {
        console.warn('Background location permission not granted')
      }

      return true
    } catch (error) {
      console.error('Error requesting location permissions:', error)
      return false
    }
  }

  async getCurrentLocation(highAccuracy: boolean = true): Promise<LocationInfo | null> {
    try {
      const hasPermission = await this.requestPermissions()
      if (!hasPermission) return null

      const location = await Location.getCurrentPositionAsync({
        accuracy: highAccuracy ? Location.Accuracy.High : Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 1,
      })

      const locationInfo: LocationInfo = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy || undefined,
        altitude: location.coords.altitude || undefined,
        heading: location.coords.heading || undefined,
        speed: location.coords.speed || undefined,
        timestamp: location.timestamp,
        coordinates: `${location.coords.latitude.toFixed(6)}°N, ${location.coords.longitude.toFixed(6)}°E`,
      }

      // Get human-readable address
      try {
        locationInfo.address = await this.reverseGeocode(
          location.coords.latitude,
          location.coords.longitude
        )
      } catch (error) {
        console.warn('Failed to get address:', error)
        locationInfo.address = locationInfo.coordinates
      }

      this.lastKnownLocation = locationInfo
      return locationInfo
    } catch (error) {
      console.error('Error getting current location:', error)
      return this.lastKnownLocation
    }
  }

  async reverseGeocode(latitude: number, longitude: number): Promise<string> {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      })

      if (addresses && addresses.length > 0) {
        const address = addresses[0]
        const parts = []

        if (address.name) parts.push(address.name)
        if (address.street) parts.push(address.street)
        if (address.district) parts.push(address.district)
        if (address.city) parts.push(address.city)
        if (address.region) parts.push(address.region)

        const formattedAddress = parts.join(', ')

        // Add Nigerian state if detected
        const state = this.detectNigerianState(latitude, longitude)
        if (state && !formattedAddress.includes(state.name)) {
          return `${formattedAddress}, ${state.name}, Nigeria`
        }

        return formattedAddress || `${latitude.toFixed(6)}°N, ${longitude.toFixed(6)}°E`
      }

      // Fallback to coordinates
      return `${latitude.toFixed(6)}°N, ${longitude.toFixed(6)}°E`
    } catch (error) {
      console.error('Error reverse geocoding:', error)
      return `${latitude.toFixed(6)}°N, ${longitude.toFixed(6)}°E`
    }
  }

  detectNigerianState(latitude: number, longitude: number): NigerianState | null {
    for (const state of NIGERIAN_STATES) {
      const { bounds } = state
      if (
        latitude >= bounds.south &&
        latitude <= bounds.north &&
        longitude >= bounds.west &&
        longitude <= bounds.east
      ) {
        return state
      }
    }
    return null
  }

  async startLocationTracking(
    callback: (location: LocationInfo) => void,
    options: {
      accuracy?: Location.Accuracy
      timeInterval?: number
      distanceInterval?: number
    } = {}
  ): Promise<boolean> {
    try {
      const hasPermission = await this.requestPermissions()
      if (!hasPermission) return false

      this.watchId = await Location.watchPositionAsync(
        {
          accuracy: options.accuracy || Location.Accuracy.Balanced,
          timeInterval: options.timeInterval || 10000, // 10 seconds
          distanceInterval: options.distanceInterval || 50, // 50 meters
        },
        async (location) => {
          const locationInfo: LocationInfo = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy || undefined,
            altitude: location.coords.altitude || undefined,
            heading: location.coords.heading || undefined,
            speed: location.coords.speed || undefined,
            timestamp: location.timestamp,
            coordinates: `${location.coords.latitude.toFixed(6)}°N, ${location.coords.longitude.toFixed(6)}°E`,
          }

          // Get address in background
          try {
            locationInfo.address = await this.reverseGeocode(
              location.coords.latitude,
              location.coords.longitude
            )
          } catch (error) {
            locationInfo.address = locationInfo.coordinates
          }

          this.lastKnownLocation = locationInfo
          callback(locationInfo)
        }
      )

      return true
    } catch (error) {
      console.error('Error starting location tracking:', error)
      return false
    }
  }

  stopLocationTracking(): void {
    if (this.watchId) {
      this.watchId.remove()
      this.watchId = null
    }
  }

  getLastKnownLocation(): LocationInfo | null {
    return this.lastKnownLocation
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371 // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1)
    const dLon = this.toRad(lon2 - lon1)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distance in kilometers
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180)
  }

  formatLocationForEmergency(location: LocationInfo): string {
    const state = this.detectNigerianState(location.latitude, location.longitude)
    const accuracy = location.accuracy ? ` (±${Math.round(location.accuracy)}m)` : ''

    return [
      `📍 EMERGENCY LOCATION`,
      `Coordinates: ${location.coordinates}${accuracy}`,
      `Address: ${location.address || 'Address lookup in progress...'}`,
      state ? `State: ${state.name}, Nigeria` : '',
      `Timestamp: ${new Date(location.timestamp).toLocaleString()}`,
      location.altitude ? `Altitude: ${Math.round(location.altitude)}m` : '',
    ].filter(Boolean).join('\n')
  }

  async getLocationForIncidentReport(): Promise<{
    location: LocationInfo
    formatted: string
    emergency: string
  } | null> {
    const location = await this.getCurrentLocation(true)
    if (!location) return null

    const state = this.detectNigerianState(location.latitude, location.longitude)
    const accuracy = location.accuracy ? ` (±${Math.round(location.accuracy)}m accuracy)` : ''

    return {
      location,
      formatted: `${location.address || location.coordinates}${accuracy}`,
      emergency: this.formatLocationForEmergency(location)
    }
  }
}

export const locationService = new LocationService()