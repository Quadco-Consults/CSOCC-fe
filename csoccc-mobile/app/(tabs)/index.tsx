// app/(tabs)/index.tsx (Home Dashboard)

import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Card, Button, Badge } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { colors, styles } from '../../lib/theme'
import { navigationService, IncidentLocation } from '../../lib/navigation'

export default function HomeScreen() {
  const handleEmergencyAlert = () => {
    Alert.alert(
      '🚨 EMERGENCY ALERT',
      'This will immediately send your GPS location and alert the command center. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'SEND ALERT',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Emergency Alert Sent', 'Command Center has been notified of your location')
          },
        },
      ]
    )
  }

  const mockAssignedIncidents = [
    {
      id: 'INC-2024-047',
      type: 'Cattle Rustling',
      status: 'En Route',
      location: 'Agatu, Benue State',
      coordinates: { latitude: 7.7322, longitude: 8.5391 },
      assignedTime: '2 hours ago',
      priority: 'critical',
      icon: '🐄',
    },
    {
      id: 'INC-2024-052',
      type: 'Boundary Dispute',
      status: 'Assigned',
      location: 'Jos South, Plateau',
      coordinates: { latitude: 9.8965, longitude: 8.8583 },
      assignedTime: '45 minutes ago',
      priority: 'warning',
      icon: '🗺️',
    },
  ]

  const handleNavigateToIncident = async (incident: any) => {
    try {
      const incidentLocation: IncidentLocation = {
        latitude: incident.coordinates.latitude,
        longitude: incident.coordinates.longitude,
        address: incident.location,
        incidentId: incident.id,
        priority: incident.priority
      }

      const success = await navigationService.openExternalNavigation(incidentLocation)
      if (success) {
        Alert.alert(
          'Navigation Started',
          `Navigation to ${incident.type} has been started. Stay safe and maintain radio contact.`
        )
      }
    } catch (error) {
      Alert.alert('Navigation Error', 'Failed to start navigation. Please try again.')
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return colors.critical
      case 'warning': return colors.warning
      default: return colors.resolved
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Header */}
      <View style={[styles.padding, { paddingBottom: 8 }]}>
        <Text style={[styles.heading, { fontSize: 20, marginBottom: 4 }]}>
          Welcome, Officer Adamu
        </Text>
        <Text style={[styles.body, { color: colors.gray700, fontSize: 14 }]}>
          Zone: Benue State • Status: Active
        </Text>
      </View>

      {/* Emergency Alert Button */}
      <View style={[styles.padding, { paddingTop: 0 }]}>
        <TouchableOpacity
          onPress={handleEmergencyAlert}
          style={[
            styles.emergencyButton,
            {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <MaterialCommunityIcons
            name="alert-octagon"
            size={32}
            color={colors.white}
            style={{ marginRight: 12 }}
          />
          <View>
            <Text style={[
              styles.heading,
              { fontSize: 18, color: colors.white, marginBottom: 4 }
            ]}>
              🚨 EMERGENCY ALERT
            </Text>
            <Text style={[
              styles.body,
              { fontSize: 12, color: colors.white, opacity: 0.9 }
            ]}>
              TAP TO REPORT • Sends GPS immediately
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={[styles.padding, { paddingTop: 0 }]}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <View style={[styles.card, { flex: 1, marginRight: 8, alignItems: 'center' }]}>
            <Text style={[styles.heading, { fontSize: 24, color: colors.fmldGreen }]}>2</Text>
            <Text style={[styles.body, { fontSize: 12, color: colors.gray700 }]}>Active Tasks</Text>
          </View>

          <View style={[styles.card, { flex: 1, marginLeft: 8, alignItems: 'center' }]}>
            <Text style={[styles.heading, { fontSize: 24, color: colors.resolved }]}>15</Text>
            <Text style={[styles.body, { fontSize: 12, color: colors.gray700 }]}>Completed</Text>
          </View>
        </View>
      </View>

      {/* Active Tasks */}
      <View style={styles.padding}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}>
          <Text style={[styles.heading, { fontSize: 18 }]}>
            Your Active Tasks
          </Text>
          <Badge size={20} style={{ backgroundColor: colors.critical }}>
            {mockAssignedIncidents.length}
          </Badge>
        </View>

        {mockAssignedIncidents.map((incident) => (
          <Card key={incident.id} style={[styles.card, { marginBottom: 12 }]}>
            <Card.Content style={{ padding: 16 }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 8,
              }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontSize: 20, marginRight: 8 }}>{incident.icon}</Text>
                    <Badge
                      size={16}
                      style={{
                        backgroundColor: getPriorityColor(incident.priority),
                        marginRight: 8,
                      }}
                    >
                      {incident.priority}
                    </Badge>
                    <Text style={[styles.body, { fontSize: 12, color: colors.gray700 }]}>
                      {incident.assignedTime}
                    </Text>
                  </View>

                  <Text style={[styles.heading, { fontSize: 14, marginBottom: 2 }]}>
                    {incident.id}
                  </Text>
                  <Text style={[styles.body, { fontSize: 14, marginBottom: 4 }]}>
                    {incident.type}
                  </Text>
                  <Text style={[styles.body, { fontSize: 12, color: colors.gray700 }]}>
                    📍 {incident.location}
                  </Text>
                </View>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12,
              }}>
                <Badge
                  size={16}
                  style={{
                    backgroundColor: incident.status === 'En Route' ? colors.warning : colors.info,
                  }}
                >
                  Status: {incident.status}
                </Badge>
              </View>

              <View style={{
                flexDirection: 'row',
                marginTop: 12,
                gap: 8,
              }}>
                <Button
                  mode="contained"
                  compact
                  style={{ flex: 1, backgroundColor: colors.fmldGreen }}
                  onPress={() => handleNavigateToIncident(incident)}
                >
                  Navigate
                </Button>
                <Button
                  mode="outlined"
                  compact
                  style={{ flex: 1 }}
                  onPress={() => router.push(`/incident/${incident.id}`)}
                >
                  Update
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}

        {mockAssignedIncidents.length === 0 && (
          <Card style={styles.card}>
            <Card.Content style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 32, marginBottom: 8 }}>✅</Text>
              <Text style={[styles.heading, { fontSize: 16, marginBottom: 4 }]}>
                All Caught Up!
              </Text>
              <Text style={[styles.body, { color: colors.gray700, textAlign: 'center' }]}>
                No active tasks assigned. Ready for new assignments.
              </Text>
            </Card.Content>
          </Card>
        )}
      </View>

      {/* Quick Actions */}
      <View style={[styles.padding, { paddingTop: 0 }]}>
        <Text style={[styles.heading, { fontSize: 18, marginBottom: 12 }]}>
          Quick Actions
        </Text>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <TouchableOpacity
            style={[
              styles.card,
              { flex: 1, marginRight: 8, alignItems: 'center', paddingVertical: 20 }
            ]}
            onPress={() => router.push('/report')}
          >
            <Text style={{ fontSize: 32, marginBottom: 8 }}>📝</Text>
            <Text style={[styles.body, { fontSize: 12, textAlign: 'center' }]}>
              Quick Report
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.card,
              { flex: 1, marginLeft: 8, alignItems: 'center', paddingVertical: 20 }
            ]}
            onPress={() => router.push('/(tabs)/incidents')}
          >
            <Text style={{ fontSize: 32, marginBottom: 8 }}>📋</Text>
            <Text style={[styles.body, { fontSize: 12, textAlign: 'center' }]}>
              My Tasks
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* System Status */}
      <View style={[styles.padding, { paddingTop: 0, paddingBottom: 32 }]}>
        <Card style={styles.card}>
          <Card.Content style={{ padding: 16 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <View>
                <Text style={[styles.heading, { fontSize: 14, marginBottom: 2 }]}>
                  System Status
                </Text>
                <Text style={[styles.body, { fontSize: 12, color: colors.gray700 }]}>
                  All systems operational
                </Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.resolved,
                  marginRight: 6,
                }} />
                <Text style={[styles.body, { fontSize: 12, color: colors.resolved }]}>
                  Online
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  )
}