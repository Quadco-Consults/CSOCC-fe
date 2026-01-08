// lib/camera.ts - Camera and Evidence Capture Service

import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import * as FileSystem from 'expo-file-system'
import { Alert } from 'react-native'

export interface EvidenceFile {
  id: string
  type: 'photo' | 'video' | 'audio'
  uri: string
  filename: string
  size: number
  timestamp: string
  location: {
    latitude: number
    longitude: number
    accuracy?: number
    address?: string
  } | null
  metadata?: {
    width?: number
    height?: number
    duration?: number
  }
}

class CameraService {
  private evidenceFiles: EvidenceFile[] = []

  async requestPermissions(): Promise<boolean> {
    try {
      // Request camera permissions
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync()
      if (cameraStatus !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'This app needs camera access to capture evidence for incident reports.'
        )
        return false
      }

      // Request location permissions
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync()
      if (locationStatus !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'This app needs location access to geotag evidence files.'
        )
        return false
      }

      return true
    } catch (error) {
      console.error('Error requesting permissions:', error)
      return false
    }
  }

  async getCurrentLocation(): Promise<Location.LocationObject | null> {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
      })
      return location
    } catch (error) {
      console.error('Error getting location:', error)
      return null
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
        return `${address.street || ''} ${address.city || ''}, ${address.region || ''}, ${address.country || ''}`.trim()
      }

      return `${latitude.toFixed(6)}°N, ${longitude.toFixed(6)}°E`
    } catch (error) {
      console.error('Error reverse geocoding:', error)
      return `${latitude.toFixed(6)}°N, ${longitude.toFixed(6)}°E`
    }
  }

  async capturePhoto(): Promise<EvidenceFile | null> {
    try {
      const hasPermission = await this.requestPermissions()
      if (!hasPermission) return null

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [16, 9],
        quality: 0.8,
        exif: true,
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null
      }

      const asset = result.assets[0]
      const location = await this.getCurrentLocation()
      const timestamp = new Date().toISOString()

      // Get file info
      const fileInfo = await FileSystem.getInfoAsync(asset.uri)

      const evidenceFile: EvidenceFile = {
        id: `photo_${Date.now()}`,
        type: 'photo',
        uri: asset.uri,
        filename: `evidence_photo_${timestamp.replace(/[:.]/g, '-')}.jpg`,
        size: fileInfo.size || 0,
        timestamp,
        location: location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy || undefined,
          address: await this.reverseGeocode(location.coords.latitude, location.coords.longitude)
        } : null,
        metadata: {
          width: asset.width,
          height: asset.height,
        }
      }

      this.evidenceFiles.push(evidenceFile)
      return evidenceFile
    } catch (error) {
      console.error('Error capturing photo:', error)
      Alert.alert('Error', 'Failed to capture photo. Please try again.')
      return null
    }
  }

  async captureVideo(): Promise<EvidenceFile | null> {
    try {
      const hasPermission = await this.requestPermissions()
      if (!hasPermission) return null

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        videoQuality: ImagePicker.VideoQuality.Medium,
        videoMaxDuration: 30, // 30 seconds max
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null
      }

      const asset = result.assets[0]
      const location = await this.getCurrentLocation()
      const timestamp = new Date().toISOString()

      // Get file info
      const fileInfo = await FileSystem.getInfoAsync(asset.uri)

      const evidenceFile: EvidenceFile = {
        id: `video_${Date.now()}`,
        type: 'video',
        uri: asset.uri,
        filename: `evidence_video_${timestamp.replace(/[:.]/g, '-')}.mp4`,
        size: fileInfo.size || 0,
        timestamp,
        location: location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy || undefined,
          address: await this.reverseGeocode(location.coords.latitude, location.coords.longitude)
        } : null,
        metadata: {
          width: asset.width,
          height: asset.height,
          duration: asset.duration,
        }
      }

      this.evidenceFiles.push(evidenceFile)
      return evidenceFile
    } catch (error) {
      console.error('Error capturing video:', error)
      Alert.alert('Error', 'Failed to capture video. Please try again.')
      return null
    }
  }

  async selectFromGallery(): Promise<EvidenceFile | null> {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Gallery Permission Required',
          'This app needs access to your photo library to select evidence files.'
        )
        return null
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 0.8,
        videoQuality: ImagePicker.VideoQuality.Medium,
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null
      }

      const asset = result.assets[0]
      const location = await this.getCurrentLocation()
      const timestamp = new Date().toISOString()

      // Get file info
      const fileInfo = await FileSystem.getInfoAsync(asset.uri)

      const evidenceFile: EvidenceFile = {
        id: `gallery_${Date.now()}`,
        type: asset.type === 'video' ? 'video' : 'photo',
        uri: asset.uri,
        filename: `evidence_${asset.type}_${timestamp.replace(/[:.]/g, '-')}.${asset.type === 'video' ? 'mp4' : 'jpg'}`,
        size: fileInfo.size || 0,
        timestamp,
        location: location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy || undefined,
          address: await this.reverseGeocode(location.coords.latitude, location.coords.longitude)
        } : null,
        metadata: {
          width: asset.width,
          height: asset.height,
          duration: asset.duration,
        }
      }

      this.evidenceFiles.push(evidenceFile)
      return evidenceFile
    } catch (error) {
      console.error('Error selecting from gallery:', error)
      Alert.alert('Error', 'Failed to select file from gallery. Please try again.')
      return null
    }
  }

  getEvidenceFiles(): EvidenceFile[] {
    return [...this.evidenceFiles]
  }

  removeEvidenceFile(id: string): void {
    this.evidenceFiles = this.evidenceFiles.filter(file => file.id !== id)
  }

  clearAllEvidence(): void {
    this.evidenceFiles = []
  }

  async saveEvidenceToLocal(incidentId: string): Promise<string[]> {
    const savedFiles: string[] = []

    try {
      const documentsDir = FileSystem.documentDirectory
      const evidenceDir = `${documentsDir}evidence/${incidentId}/`

      // Create evidence directory
      await FileSystem.makeDirectoryAsync(evidenceDir, { intermediates: true })

      for (const file of this.evidenceFiles) {
        const newPath = `${evidenceDir}${file.filename}`
        await FileSystem.copyAsync({
          from: file.uri,
          to: newPath,
        })
        savedFiles.push(newPath)
      }

      return savedFiles
    } catch (error) {
      console.error('Error saving evidence files:', error)
      throw new Error('Failed to save evidence files')
    }
  }
}

export const cameraService = new CameraService()