// components/EvidenceCapture.tsx - Enhanced Evidence Capture Component

import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Dimensions
} from 'react-native'
import { Card, Button, IconButton, Badge } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Video } from 'expo-av'
import { colors, styles } from '../lib/theme'
import { cameraService, EvidenceFile } from '../lib/camera'

interface EvidenceCaptureProps {
  onEvidenceUpdate: (files: EvidenceFile[]) => void
  maxFiles?: number
  showLocationInfo?: boolean
}

export default function EvidenceCapture({
  onEvidenceUpdate,
  maxFiles = 5,
  showLocationInfo = true
}: EvidenceCaptureProps) {
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([])
  const [isCapturing, setIsCapturing] = useState(false)

  const updateEvidence = (newFiles: EvidenceFile[]) => {
    setEvidenceFiles(newFiles)
    onEvidenceUpdate(newFiles)
  }

  const handleCapturePhoto = async () => {
    if (evidenceFiles.length >= maxFiles) {
      Alert.alert('Maximum Files Reached', `You can only attach up to ${maxFiles} evidence files.`)
      return
    }

    setIsCapturing(true)
    try {
      const file = await cameraService.capturePhoto()
      if (file) {
        const newFiles = [...evidenceFiles, file]
        updateEvidence(newFiles)
        Alert.alert(
          '📸 Photo Captured',
          `Photo saved with GPS coordinates${file.location ? ` at ${file.location.address}` : ''}`
        )
      }
    } finally {
      setIsCapturing(false)
    }
  }

  const handleCaptureVideo = async () => {
    if (evidenceFiles.length >= maxFiles) {
      Alert.alert('Maximum Files Reached', `You can only attach up to ${maxFiles} evidence files.`)
      return
    }

    setIsCapturing(true)
    try {
      const file = await cameraService.captureVideo()
      if (file) {
        const newFiles = [...evidenceFiles, file]
        updateEvidence(newFiles)
        Alert.alert(
          '🎥 Video Captured',
          `Video saved (${file.metadata?.duration ? Math.round(file.metadata.duration / 1000) + 's' : 'unknown duration'})${file.location ? ` at ${file.location.address}` : ''}`
        )
      }
    } finally {
      setIsCapturing(false)
    }
  }

  const handleSelectFromGallery = async () => {
    if (evidenceFiles.length >= maxFiles) {
      Alert.alert('Maximum Files Reached', `You can only attach up to ${maxFiles} evidence files.`)
      return
    }

    setIsCapturing(true)
    try {
      const file = await cameraService.selectFromGallery()
      if (file) {
        const newFiles = [...evidenceFiles, file]
        updateEvidence(newFiles)
        Alert.alert(
          '📁 File Selected',
          `${file.type === 'video' ? 'Video' : 'Photo'} added to evidence${file.location ? ` (geotagged)` : ''}`
        )
      }
    } finally {
      setIsCapturing(false)
    }
  }

  const handleRemoveFile = (fileId: string) => {
    Alert.alert(
      'Remove Evidence',
      'Are you sure you want to remove this evidence file?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const newFiles = evidenceFiles.filter(f => f.id !== fileId)
            updateEvidence(newFiles)
            cameraService.removeEvidenceFile(fileId)
          }
        }
      ]
    )
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`
    return `${Math.round(bytes / (1024 * 1024))}MB`
  }

  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString()
  }

  const renderEvidenceFile = (file: EvidenceFile) => {
    const screenWidth = Dimensions.get('window').width
    const imageWidth = (screenWidth - 48) / 2 - 8

    return (
      <View key={file.id} style={{
        width: imageWidth,
        marginBottom: 16,
        marginRight: 8,
      }}>
        <Card style={styles.card}>
          {/* File Preview */}
          <View style={{ position: 'relative' }}>
            {file.type === 'photo' ? (
              <Image
                source={{ uri: file.uri }}
                style={{
                  width: '100%',
                  height: imageWidth * 0.75,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
                resizeMode="cover"
              />
            ) : (
              <View style={{
                width: '100%',
                height: imageWidth * 0.75,
                backgroundColor: colors.gray100,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <MaterialCommunityIcons
                  name="video"
                  size={32}
                  color={colors.gray700}
                />
                <Text style={[styles.body, { fontSize: 12, color: colors.gray700, marginTop: 8 }]}>
                  Video
                </Text>
                {file.metadata?.duration && (
                  <Text style={[styles.body, { fontSize: 10, color: colors.gray600 }]}>
                    {Math.round(file.metadata.duration / 1000)}s
                  </Text>
                )}
              </View>
            )}

            {/* File Type Badge */}
            <Badge
              size={16}
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: file.type === 'video' ? colors.critical : colors.fmldGreen,
              }}
            >
              {file.type === 'video' ? '🎥' : '📸'}
            </Badge>

            {/* Remove Button */}
            <TouchableOpacity
              onPress={() => handleRemoveFile(file.id)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderRadius: 12,
                padding: 4,
              }}
            >
              <MaterialCommunityIcons
                name="close"
                size={16}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>

          {/* File Info */}
          <Card.Content style={{ padding: 8 }}>
            <Text style={[styles.body, { fontSize: 10, color: colors.gray700 }]} numberOfLines={1}>
              {file.filename}
            </Text>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 4
            }}>
              <Text style={[styles.body, { fontSize: 9, color: colors.gray600 }]}>
                {formatFileSize(file.size)}
              </Text>

              {file.location && (
                <MaterialCommunityIcons
                  name="map-marker"
                  size={12}
                  color={colors.resolved}
                />
              )}
            </View>

            {showLocationInfo && file.location && (
              <Text
                style={[styles.body, { fontSize: 9, color: colors.gray600, marginTop: 2 }]}
                numberOfLines={2}
              >
                📍 {file.location.address || `${file.location.latitude.toFixed(4)}, ${file.location.longitude.toFixed(4)}`}
              </Text>
            )}

            <Text style={[styles.body, { fontSize: 8, color: colors.gray500, marginTop: 4 }]}>
              {formatTimestamp(file.timestamp)}
            </Text>
          </Card.Content>
        </Card>
      </View>
    )
  }

  return (
    <View>
      {/* Capture Controls */}
      <View style={{
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
      }}>
        <TouchableOpacity
          onPress={handleCapturePhoto}
          disabled={isCapturing || evidenceFiles.length >= maxFiles}
          style={{
            flex: 1,
            backgroundColor: isCapturing ? colors.gray300 : colors.fmldGreen,
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            opacity: evidenceFiles.length >= maxFiles ? 0.5 : 1,
          }}
        >
          <MaterialCommunityIcons
            name="camera"
            size={24}
            color={colors.white}
            style={{ marginBottom: 4 }}
          />
          <Text style={[styles.body, { color: colors.white, fontSize: 12, fontWeight: 'bold' }]}>
            {isCapturing ? 'Capturing...' : 'Take Photo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCaptureVideo}
          disabled={isCapturing || evidenceFiles.length >= maxFiles}
          style={{
            flex: 1,
            backgroundColor: isCapturing ? colors.gray300 : colors.critical,
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            opacity: evidenceFiles.length >= maxFiles ? 0.5 : 1,
          }}
        >
          <MaterialCommunityIcons
            name="video"
            size={24}
            color={colors.white}
            style={{ marginBottom: 4 }}
          />
          <Text style={[styles.body, { color: colors.white, fontSize: 12, fontWeight: 'bold' }]}>
            Record Video
          </Text>
          <Text style={[styles.body, { color: colors.white, fontSize: 10, opacity: 0.8 }]}>
            (30s max)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Gallery Selection */}
      <Button
        mode="outlined"
        onPress={handleSelectFromGallery}
        disabled={isCapturing || evidenceFiles.length >= maxFiles}
        style={{
          borderColor: colors.fmldGreen,
          marginBottom: 16,
          opacity: evidenceFiles.length >= maxFiles ? 0.5 : 1,
        }}
        icon="folder-image"
      >
        Select from Gallery
      </Button>

      {/* Evidence Files Grid */}
      {evidenceFiles.length > 0 && (
        <View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Text style={[styles.heading, { fontSize: 14 }]}>
              Evidence Files ({evidenceFiles.length}/{maxFiles})
            </Text>

            {evidenceFiles.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Clear All Evidence',
                    'Are you sure you want to remove all evidence files?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Clear All',
                        style: 'destructive',
                        onPress: () => {
                          updateEvidence([])
                          cameraService.clearAllEvidence()
                        }
                      }
                    ]
                  )
                }}
              >
                <Text style={[styles.body, { fontSize: 12, color: colors.critical }]}>
                  Clear All
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <ScrollView
            horizontal={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
              {evidenceFiles.map(renderEvidenceFile)}
            </View>
          </ScrollView>
        </View>
      )}

      {/* GPS Info Banner */}
      {showLocationInfo && evidenceFiles.length > 0 && (
        <View style={{
          backgroundColor: colors.info,
          padding: 12,
          borderRadius: 6,
          marginTop: 8,
        }}>
          <Text style={[styles.body, { fontSize: 11, color: colors.white, textAlign: 'center' }]}>
            💡 All evidence files are automatically geotagged with GPS coordinates and timestamped
          </Text>
        </View>
      )}
    </View>
  )
}