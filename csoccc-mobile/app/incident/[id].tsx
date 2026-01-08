// app/incident/[id].tsx - Enhanced Incident Detail Screen with Navigation

import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native'
import { Card, Button, Badge, FAB, TextInput } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useLocalSearchParams, router } from 'expo-router'
import { colors, styles } from '../../lib/theme'
import { navigationService, RouteInfo, IncidentLocation } from '../../lib/navigation'
import { locationService } from '../../lib/location'

// Mock incident data - in a real app, this would come from an API
const mockIncident = {
  id: 'INC-2024-047',
  type: 'Cattle Rustling',
  status: 'Assigned',
  priority: 'critical',
  location: {
    latitude: 7.7322,
    longitude: 8.5391,
    address: 'Agatu, Benue State',
  },
  description: 'Armed cattle theft reported. Approximately 50 head of cattle stolen from grazing area near the riverbank. Witnesses report 6-8 armed individuals on motorcycles.',
  reportedBy: 'Community Leader - Chief Adamu',
  reportedTime: '2024-01-08T10:30:00Z',
  assignedTime: '2 hours ago',
  assignedOfficer: 'Officer Adamu Ibrahim',
  evidence: [
    { type: 'photo', description: 'Stolen cattle tracks' },
    { type: 'witness', description: 'Community leader testimony' },
  ],
  timeline: [
    { time: '10:30 AM', event: 'Incident reported by community leader' },
    { time: '10:45 AM', event: 'Case assigned to field officer' },
    { time: '11:00 AM', event: 'Officer acknowledged assignment' },
    { time: '11:15 AM', event: 'Route planning initiated' },
  ],
  contacts: [
    { role: 'Reporting Officer', name: 'Chief Adamu', phone: '+234-xxx-xxx-xxxx' },
    { role: 'Local Police', name: 'Inspector Garba', phone: '+234-xxx-xxx-xxxx' },
  ],
  icon: '🐄',
}

export default function IncidentDetailScreen() {
  const { id } = useLocalSearchParams()
  const [incident] = useState(mockIncident)
  const [currentRoute, setCurrentRoute] = useState<RouteInfo | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [statusUpdate, setStatusUpdate] = useState('')
  const [isLoadingRoute, setIsLoadingRoute] = useState(false)

  useEffect(() => {
    // Check if we have an active route for this incident
    const existingRoute = navigationService.getCurrentRoute()
    const destination = navigationService.getDestination()

    if (existingRoute && destination && destination.incidentId === incident.id) {
      setCurrentRoute(existingRoute)
      setIsNavigating(navigationService.isCurrentlyTracking())
    }
  }, [incident.id])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return colors.critical
      case 'high': return colors.warning
      case 'medium': return colors.info
      default: return colors.resolved
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Assigned': return colors.info
      case 'En Route': return colors.warning
      case 'On Scene': return colors.fmldGold
      case 'Resolved': return colors.resolved
      default: return colors.gray700
    }
  }

  const handlePlanRoute = async () => {
    setIsLoadingRoute(true)
    try {
      const incidentLocation: IncidentLocation = {
        latitude: incident.location.latitude,
        longitude: incident.location.longitude,
        address: incident.location.address,
        incidentId: incident.id,
        priority: incident.priority as any
      }

      const route = await navigationService.planRouteToIncident(incidentLocation)

      if (route) {
        setCurrentRoute(route)
        Alert.alert(
          '🗺️ Route Planned',
          navigationService.formatRouteInfo(route),
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Start Navigation', onPress: handleStartNavigation }
          ]
        )
      }
    } catch (error) {
      Alert.alert('Route Planning Error', 'Failed to plan route to incident location.')
    } finally {
      setIsLoadingRoute(false)
    }
  }

  const handleStartNavigation = async () => {
    if (!currentRoute) {
      await handlePlanRoute()
      return
    }

    const incidentLocation: IncidentLocation = {
      latitude: incident.location.latitude,
      longitude: incident.location.longitude,
      address: incident.location.address,
      incidentId: incident.id,
      priority: incident.priority as any
    }

    const success = await navigationService.openExternalNavigation(incidentLocation)

    if (success) {
      // Start tracking the route
      setIsNavigating(true)
      await navigationService.startRouteTracking()

      // Update incident status to "En Route"
      Alert.alert(
        'Navigation Started',
        'Route tracking is active. Your progress will be monitored by the command center.'
      )
    }
  }

  const handleStopNavigation = () => {
    Alert.alert(
      'Stop Navigation',
      'Are you sure you want to stop route tracking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Stop',
          style: 'destructive',
          onPress: () => {
            navigationService.stopRouteTracking()
            setIsNavigating(false)
            setCurrentRoute(null)
          }
        }
      ]
    )
  }

  const handleUpdateStatus = () => {
    if (!statusUpdate.trim()) {
      Alert.alert('Status Update', 'Please enter a status update message.')
      return
    }

    // In a real app, this would send to the server
    Alert.alert(
      'Status Updated',
      `Status update sent to command center: "${statusUpdate}"`,
      [
        { text: 'OK', onPress: () => setStatusUpdate('') }
      ]
    )
  }

  const handleEmergencyAlert = async () => {
    const success = await navigationService.sendEmergencyLocation()
    if (success) {
      // Additional emergency protocols could be triggered here
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

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
              {incident.icon} {incident.id}
            </Text>
            <Badge
              size={16}
              style={{
                backgroundColor: getPriorityColor(incident.priority),
                marginTop: 4,
              }}
            >
              {incident.priority.toUpperCase()}
            </Badge>
          </View>

          <TouchableOpacity onPress={handleEmergencyAlert}>
            <MaterialCommunityIcons name="alert-octagon" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.padding}>
        {/* Incident Overview */}
        <Card style={[styles.card, { marginBottom: 16 }]}>
          <Card.Content style={{ padding: 16 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 12,
            }}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.heading, { fontSize: 18, marginBottom: 4 }]}>
                  {incident.type}
                </Text>
                <Text style={[styles.body, { fontSize: 14, color: colors.gray700, marginBottom: 8 }]}>
                  📍 {incident.location.address}
                </Text>
                <Text style={[styles.body, { fontSize: 12, color: colors.gray600 }]}>
                  Reported: {formatTime(incident.reportedTime)}
                </Text>
              </View>

              <Badge
                size={16}
                style={{ backgroundColor: getStatusColor(incident.status) }}
              >
                {incident.status}
              </Badge>
            </View>

            <Text style={[styles.body, { fontSize: 14, lineHeight: 20 }]}>
              {incident.description}
            </Text>
          </Card.Content>
        </Card>

        {/* Navigation Section */}
        <Card style={[styles.card, { marginBottom: 16 }]}>
          <Card.Content style={{ padding: 16 }}>
            <Text style={[styles.heading, { fontSize: 16, marginBottom: 12 }]}>
              🗺️ Navigation
            </Text>

            {currentRoute && (
              <View style={{
                backgroundColor: colors.gray100,
                padding: 12,
                borderRadius: 6,
                marginBottom: 12,
              }}>
                <Text style={[styles.body, { fontSize: 12, marginBottom: 8 }]}>
                  📍 Distance: {currentRoute.distance.toFixed(1)}km
                </Text>
                <Text style={[styles.body, { fontSize: 12, marginBottom: 8 }]}>
                  ⏱️ Estimated Time: {currentRoute.estimatedTime} minutes
                </Text>
                <Text style={[styles.body, { fontSize: 12, marginBottom: 8 }]}>
                  🎯 Route Difficulty: {currentRoute.difficulty.charAt(0).toUpperCase() + currentRoute.difficulty.slice(1)}
                </Text>

                {currentRoute.warnings.length > 0 && (
                  <View style={{ marginTop: 8 }}>
                    <Text style={[styles.body, { fontSize: 12, fontWeight: 'bold', marginBottom: 4 }]}>
                      ⚠️ Route Warnings:
                    </Text>
                    {currentRoute.warnings.map((warning, index) => (
                      <Text key={index} style={[styles.body, { fontSize: 11, color: colors.warning }]}>
                        • {warning}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            )}

            <View style={{
              flexDirection: 'row',
              gap: 8,
            }}>
              {!isNavigating ? (
                <>
                  <Button
                    mode="outlined"
                    onPress={handlePlanRoute}
                    disabled={isLoadingRoute}
                    style={{ flex: 1 }}
                    loading={isLoadingRoute}
                  >
                    {currentRoute ? 'Update Route' : 'Plan Route'}
                  </Button>

                  <Button
                    mode="contained"
                    onPress={handleStartNavigation}
                    disabled={!currentRoute}
                    style={{
                      flex: 1,
                      backgroundColor: colors.fmldGreen,
                    }}
                  >
                    Start Navigation
                  </Button>
                </>
              ) : (
                <Button
                  mode="outlined"
                  onPress={handleStopNavigation}
                  style={{
                    flex: 1,
                    borderColor: colors.critical,
                  }}
                  labelStyle={{ color: colors.critical }}
                >
                  Stop Navigation
                </Button>
              )}
            </View>

            {isNavigating && (
              <View style={{
                backgroundColor: colors.resolved,
                padding: 12,
                borderRadius: 6,
                marginTop: 8,
                alignItems: 'center',
              }}>
                <Text style={[styles.body, { fontSize: 12, color: colors.white, fontWeight: 'bold' }]}>
                  🎯 NAVIGATION ACTIVE
                </Text>
                <Text style={[styles.body, { fontSize: 11, color: colors.white }]}>
                  Your location is being tracked by command center
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Evidence & Timeline */}
        <Card style={[styles.card, { marginBottom: 16 }]}>
          <Card.Content style={{ padding: 16 }}>
            <Text style={[styles.heading, { fontSize: 16, marginBottom: 12 }]}>
              📋 Evidence & Timeline
            </Text>

            <Text style={[styles.body, { fontSize: 14, marginBottom: 8 }]}>
              Evidence ({incident.evidence.length} items):
            </Text>
            {incident.evidence.map((item, index) => (
              <Text key={index} style={[styles.body, { fontSize: 12, color: colors.gray700, marginLeft: 16, marginBottom: 4 }]}>
                • {item.type}: {item.description}
              </Text>
            ))}

            <Text style={[styles.body, { fontSize: 14, marginTop: 16, marginBottom: 8 }]}>
              Timeline:
            </Text>
            {incident.timeline.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', marginBottom: 4 }}>
                <Text style={[styles.body, { fontSize: 11, color: colors.gray600, width: 60 }]}>
                  {item.time}
                </Text>
                <Text style={[styles.body, { fontSize: 12, flex: 1 }]}>
                  {item.event}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Contacts */}
        <Card style={[styles.card, { marginBottom: 16 }]}>
          <Card.Content style={{ padding: 16 }}>
            <Text style={[styles.heading, { fontSize: 16, marginBottom: 12 }]}>
              📞 Key Contacts
            </Text>

            {incident.contacts.map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 8,
                  borderBottomWidth: index < incident.contacts.length - 1 ? 1 : 0,
                  borderBottomColor: colors.gray100,
                }}
                onPress={() => Alert.alert('Call Contact', `Call ${contact.name}?`, [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Call', onPress: () => console.log(`Calling ${contact.phone}`) }
                ])}
              >
                <View>
                  <Text style={[styles.body, { fontSize: 14, marginBottom: 2 }]}>
                    {contact.name}
                  </Text>
                  <Text style={[styles.body, { fontSize: 12, color: colors.gray700 }]}>
                    {contact.role}
                  </Text>
                </View>
                <MaterialCommunityIcons name="phone" size={20} color={colors.fmldGreen} />
              </TouchableOpacity>
            ))}
          </Card.Content>
        </Card>

        {/* Status Update */}
        <Card style={[styles.card, { marginBottom: 32 }]}>
          <Card.Content style={{ padding: 16 }}>
            <Text style={[styles.heading, { fontSize: 16, marginBottom: 12 }]}>
              📝 Status Update
            </Text>

            <TextInput
              mode="outlined"
              label="Update status or add notes"
              placeholder="Enter status update for command center..."
              value={statusUpdate}
              onChangeText={setStatusUpdate}
              multiline
              numberOfLines={3}
              style={{ marginBottom: 12 }}
            />

            <Button
              mode="contained"
              onPress={handleUpdateStatus}
              disabled={!statusUpdate.trim()}
              style={{ backgroundColor: colors.fmldGreen }}
            >
              Send Status Update
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Emergency FAB */}
      <FAB
        icon="alert"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: colors.critical,
        }}
        onPress={handleEmergencyAlert}
      />
    </View>
  )
}