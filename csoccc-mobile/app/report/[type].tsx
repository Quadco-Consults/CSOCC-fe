// app/report/[type].tsx

import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { Card, Button, TextInput, RadioButton, List } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useLocalSearchParams, router } from 'expo-router'
import { colors, styles } from '../../lib/theme'
import { locationService, LocationInfo } from '../../lib/location'
import { EvidenceFile } from '../../lib/camera'
import EvidenceCapture from '../../components/EvidenceCapture'

export default function DetailedReportScreen() {
  const { type } = useLocalSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    severity: 'medium',
    peopleCount: '',
    hasEvidence: false,
    evidenceCount: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<LocationInfo | null>(null)
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([])
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)

  // Get real GPS location
  useEffect(() => {
    const getLocation = async () => {
      setIsLoadingLocation(true)
      try {
        const locationData = await locationService.getLocationForIncidentReport()
        if (locationData) {
          setCurrentLocation(locationData.location)
          setFormData(prev => ({
            ...prev,
            location: locationData.formatted
          }))
        } else {
          // Fallback to mock location if permissions denied or location unavailable
          setFormData(prev => ({
            ...prev,
            location: 'Location unavailable - enable GPS for accurate reporting'
          }))
        }
      } catch (error) {
        console.error('Error getting location:', error)
        setFormData(prev => ({
          ...prev,
          location: 'Location error - please try again'
        }))
      } finally {
        setIsLoadingLocation(false)
      }
    }

    getLocation()
  }, [])

  const incidentTypes: Record<string, any> = {
    cattle_rustling: { label: 'Cattle Rustling', icon: '🐄' },
    boundary_dispute: { label: 'Boundary Dispute', icon: '🗺️' },
    violent_clash: { label: 'Violent Clash', icon: '⚔️' },
    illegal_mining: { label: 'Illegal Mining', icon: '⛏️' },
    fire_outbreak: { label: 'Fire Outbreak', icon: '🔥' },
    suspicious_movement: { label: 'Suspicious Movement', icon: '👁️' },
  }

  const currentType = incidentTypes[type as string] || { label: 'Unknown', icon: '❓' }

  const handleEvidenceUpdate = (files: EvidenceFile[]) => {
    setEvidenceFiles(files)
    setFormData(prev => ({
      ...prev,
      hasEvidence: files.length > 0,
      evidenceCount: files.length
    }))
  }

  const handleRefreshLocation = async () => {
    setIsLoadingLocation(true)
    try {
      const locationData = await locationService.getLocationForIncidentReport()
      if (locationData) {
        setCurrentLocation(locationData.location)
        setFormData(prev => ({
          ...prev,
          location: locationData.formatted
        }))
        Alert.alert('Location Updated', 'GPS location has been refreshed successfully.')
      } else {
        Alert.alert('Location Error', 'Unable to get current location. Please check your GPS settings.')
      }
    } catch (error) {
      Alert.alert('Location Error', 'Failed to refresh location. Please try again.')
    } finally {
      setIsLoadingLocation(false)
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      Alert.alert(
        '✅ Report Submitted Successfully!',
        `Reference Number: INC-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}\n\nStatus: Received\n\nYou will be notified when a team is assigned.`,
        [
          {
            text: 'View Report',
            onPress: () => router.push('/(tabs)/incidents')
          },
          {
            text: 'Report Another',
            onPress: () => router.push('/(tabs)/report')
          },
          {
            text: 'Back to Home',
            onPress: () => router.push('/(tabs)')
          }
        ]
      )
    }, 2000)
  }

  const renderStep1 = () => (
    <View>
      {/* Location */}
      <Text style={[styles.heading, { fontSize: 16, marginBottom: 12 }]}>
        📍 Location Details
      </Text>

      <Card style={[styles.card, { marginBottom: 16 }]}>
        <Card.Content style={{ padding: 16 }}>
          <View style={{
            backgroundColor: currentLocation ? colors.fmldGreen : colors.warning,
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons
                  name={isLoadingLocation ? "loading" : "crosshairs-gps"}
                  size={24}
                  color={colors.white}
                  style={{ marginRight: 8 }}
                />
                <Text style={[styles.heading, { color: colors.white, fontSize: 14 }]}>
                  {isLoadingLocation ? 'Getting Location...' : 'Current Location'}
                </Text>
              </View>

              {currentLocation && (
                <TouchableOpacity
                  onPress={handleRefreshLocation}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: 12,
                    padding: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    name="refresh"
                    size={16}
                    color={colors.white}
                  />
                </TouchableOpacity>
              )}
            </View>

            <Text style={[styles.body, { color: colors.white, fontSize: 12, marginBottom: 4 }]}>
              {formData.location || 'Getting GPS location...'}
            </Text>

            {currentLocation && (
              <View>
                <Text style={[styles.body, { color: colors.white, fontSize: 10, opacity: 0.8 }]}>
                  📍 {currentLocation.coordinates}
                </Text>
                {currentLocation.accuracy && (
                  <Text style={[styles.body, { color: colors.white, fontSize: 10, opacity: 0.8 }]}>
                    🎯 Accuracy: ±{Math.round(currentLocation.accuracy)}m
                  </Text>
                )}
              </View>
            )}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.gray100,
              padding: 12,
              borderRadius: 6,
              alignItems: 'center',
            }}
            onPress={() => Alert.alert('Manual Location', 'Interactive map for manual location adjustment coming soon. Current GPS location will be used for now.')}
          >
            <Text style={[styles.body, { color: colors.fmldGreen, fontSize: 14 }]}>
              🗺️ Adjust location manually
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      {/* Description */}
      <Text style={[styles.heading, { fontSize: 16, marginBottom: 12 }]}>
        📝 Incident Description
      </Text>

      <Card style={[styles.card, { marginBottom: 16 }]}>
        <Card.Content style={{ padding: 16 }}>
          <TextInput
            mode="outlined"
            label="Describe what happened"
            placeholder="Please provide detailed information about the incident..."
            multiline
            numberOfLines={4}
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
            style={{ marginBottom: 12 }}
          />

          <Button
            mode="outlined"
            icon="microphone"
            onPress={() => {
              Alert.alert(
                'Voice Input',
                'Voice recording feature will be available in the next version',
                [{ text: 'OK' }]
              )
            }}
            style={{ borderColor: colors.fmldGreen }}
          >
            🎤 Voice Input
          </Button>
        </Card.Content>
      </Card>

      {/* Severity */}
      <Text style={[styles.heading, { fontSize: 16, marginBottom: 12 }]}>
        ⚠️ Incident Severity
      </Text>

      <Card style={[styles.card, { marginBottom: 16 }]}>
        <Card.Content style={{ padding: 16 }}>
          <RadioButton.Group
            onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}
            value={formData.severity}
          >
            <List.Item
              title="Low Priority"
              description="Minor incident, no immediate threat"
              left={() => <RadioButton value="low" />}
              titleStyle={{ fontSize: 14 }}
              descriptionStyle={{ fontSize: 12 }}
            />
            <List.Item
              title="Medium Priority"
              description="Moderate incident, requires attention"
              left={() => <RadioButton value="medium" />}
              titleStyle={{ fontSize: 14 }}
              descriptionStyle={{ fontSize: 12 }}
            />
            <List.Item
              title="High Priority"
              description="Urgent incident, immediate response needed"
              left={() => <RadioButton value="high" />}
              titleStyle={{ fontSize: 14 }}
              descriptionStyle={{ fontSize: 12, color: colors.critical }}
            />
          </RadioButton.Group>
        </Card.Content>
      </Card>

      {/* People Count */}
      <Text style={[styles.heading, { fontSize: 16, marginBottom: 12 }]}>
        👥 Estimated People Involved
      </Text>

      <Card style={[styles.card, { marginBottom: 16 }]}>
        <Card.Content style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['1-5 people', '5-10 people', '10-20 people', '20+ people', 'Unknown'].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setFormData(prev => ({ ...prev, peopleCount: option }))}
                style={{
                  backgroundColor: formData.peopleCount === option ? colors.fmldGreen : colors.gray100,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 16,
                }}
              >
                <Text style={{
                  color: formData.peopleCount === option ? colors.white : colors.gray700,
                  fontSize: 12,
                }}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>
    </View>
  )

  const renderStep2 = () => (
    <View>
      <Text style={[styles.heading, { fontSize: 16, marginBottom: 12 }]}>
        📸 Evidence Collection
      </Text>

      <Card style={[styles.card, { marginBottom: 16 }]}>
        <Card.Content style={{ padding: 16 }}>
          <Text style={[styles.body, { marginBottom: 16 }]}>
            Add photos, videos, or audio recordings as evidence. All files are automatically geotagged and timestamped.
          </Text>

          <EvidenceCapture
            onEvidenceUpdate={handleEvidenceUpdate}
            maxFiles={5}
            showLocationInfo={true}
          />

          <Button
            mode="contained"
            onPress={() => setCurrentStep(3)}
            disabled={formData.description.trim().length === 0}
            style={{
              backgroundColor: colors.fmldGreen,
              marginTop: 16,
            }}
          >
            {formData.evidenceCount > 0 ? `Continue with ${formData.evidenceCount} Evidence File(s)` : 'Continue to Review'}
          </Button>

          {formData.evidenceCount === 0 && (
            <Button
              mode="outlined"
              onPress={() => setCurrentStep(3)}
              disabled={formData.description.trim().length === 0}
              style={{
                marginTop: 8,
              }}
            >
              Skip Evidence Collection
            </Button>
          )}
        </Card.Content>
      </Card>
    </View>
  )

  const renderStep3 = () => (
    <View>
      <Text style={[styles.heading, { fontSize: 16, marginBottom: 12 }]}>
        ✅ Confirm Report Details
      </Text>

      <Card style={[styles.card, { marginBottom: 16 }]}>
        <Card.Content style={{ padding: 16 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.heading, { fontSize: 18, marginBottom: 8 }]}>
              Report Ready
            </Text>
            <Text style={[styles.body, { color: colors.gray700, fontSize: 12 }]}>
              Review your report before submission
            </Text>
          </View>

          {/* Summary */}
          <View style={{
            backgroundColor: colors.gray100,
            padding: 12,
            borderRadius: 6,
            marginBottom: 16,
          }}>
            <Text style={[styles.heading, { fontSize: 14, marginBottom: 8 }]}>
              Summary
            </Text>
            <View style={{ gap: 4 }}>
              <Text style={[styles.body, { fontSize: 12 }]}>
                <Text style={{ fontWeight: 'bold' }}>Type:</Text> {currentType.icon} {currentType.label}
              </Text>
              <Text style={[styles.body, { fontSize: 12 }]}>
                <Text style={{ fontWeight: 'bold' }}>Location:</Text> {formData.location || 'Current GPS location'}
              </Text>
              <Text style={[styles.body, { fontSize: 12 }]}>
                <Text style={{ fontWeight: 'bold' }}>Severity:</Text> {formData.severity.charAt(0).toUpperCase() + formData.severity.slice(1)} Priority
              </Text>
              {formData.peopleCount && (
                <Text style={[styles.body, { fontSize: 12 }]}>
                  <Text style={{ fontWeight: 'bold' }}>People Involved:</Text> {formData.peopleCount}
                </Text>
              )}
              <Text style={[styles.body, { fontSize: 12 }]}>
                <Text style={{ fontWeight: 'bold' }}>Evidence:</Text> {formData.evidenceCount} file(s)
              </Text>
            </View>
          </View>

          {/* Offline Status */}
          <View style={{
            backgroundColor: colors.warning,
            padding: 12,
            borderRadius: 6,
            marginBottom: 16,
          }}>
            <Text style={[styles.body, { fontSize: 11, color: colors.white }]}>
              ⚡ Offline Mode Active - Report will be sent when connection is restored
            </Text>
          </View>

          <Text style={[styles.body, { fontSize: 11, color: colors.gray700, marginBottom: 16 }]}>
            You will receive SMS confirmation once your report is processed by the command center.
          </Text>

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isSubmitting}
            style={{ backgroundColor: colors.fmldGreen, paddingVertical: 8 }}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            {isSubmitting ? 'Submitting Report...' : 'Submit Incident Report'}
          </Button>
        </Card.Content>
      </Card>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{
        backgroundColor: colors.fmldGreen,
        paddingTop: 48,
        paddingBottom: 16,
        paddingHorizontal: 16,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.white} />
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[styles.heading, { fontSize: 18, color: colors.white }]}>
              {currentType.icon} {currentType.label}
            </Text>
            <Text style={[styles.body, { fontSize: 12, color: colors.fmldCream }]}>
              Step {currentStep} of 3
            </Text>
          </View>

          <View style={{ width: 24 }} />
        </View>

        {/* Progress Bar */}
        <View style={{
          backgroundColor: colors.fmldGreenDark,
          height: 4,
          borderRadius: 2,
          marginTop: 16,
        }}>
          <View style={{
            backgroundColor: colors.white,
            height: 4,
            borderRadius: 2,
            width: `${(currentStep / 3) * 100}%`,
          }} />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.padding}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </ScrollView>

      {/* Navigation Buttons */}
      {currentStep < 3 && (
        <View style={{
          flexDirection: 'row',
          padding: 16,
          gap: 12,
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.gray100,
        }}>
          {currentStep > 1 && (
            <Button
              mode="outlined"
              onPress={handlePrevious}
              style={{ flex: 1 }}
            >
              ← Previous
            </Button>
          )}

          <Button
            mode="contained"
            onPress={handleNext}
            style={{
              flex: currentStep === 1 ? 1 : 2,
              backgroundColor: colors.fmldGreen,
            }}
            disabled={currentStep === 1 && formData.description.trim().length === 0}
          >
            {currentStep === 2 ? 'Review Report' : 'Next →'}
          </Button>
        </View>
      )}
    </View>
  )
}