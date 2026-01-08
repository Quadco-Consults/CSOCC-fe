// app/(tabs)/incidents.tsx

import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Card, Badge, Button, Searchbar } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { colors, styles } from '../../lib/theme'
import { navigationService, IncidentLocation } from '../../lib/navigation'

const mockIncidents = [
  {
    id: 'INC-2024-047',
    type: 'Cattle Rustling',
    status: 'En Route',
    priority: 'critical',
    location: 'Agatu, Benue State',
    coordinates: { latitude: 7.7322, longitude: 8.5391 },
    description: 'Armed cattle theft reported. Approximately 50 cattle stolen.',
    assignedTime: '2 hours ago',
    reportedBy: 'Community Leader',
    icon: '🐄',
  },
  {
    id: 'INC-2024-052',
    type: 'Boundary Dispute',
    status: 'Assigned',
    priority: 'warning',
    location: 'Jos South, Plateau',
    coordinates: { latitude: 9.8965, longitude: 8.8583 },
    description: 'Land boundary dispute escalating between farmers and herders.',
    assignedTime: '45 minutes ago',
    reportedBy: 'Local Chief',
    icon: '🗺️',
  },
  {
    id: 'INC-2024-048',
    type: 'Fire Outbreak',
    status: 'Resolved',
    priority: 'resolved',
    location: 'Kachia, Kaduna',
    coordinates: { latitude: 10.0667, longitude: 7.9167 },
    description: 'Grassland fire contained. No livestock casualties.',
    assignedTime: '1 day ago',
    reportedBy: 'Ranger Station',
    icon: '🔥',
  },
  {
    id: 'INC-2024-045',
    type: 'Suspicious Movement',
    status: 'On Scene',
    priority: 'warning',
    location: 'Jalingo, Taraba',
    coordinates: { latitude: 8.8833, longitude: 11.35 },
    description: 'Large herd movement outside normal migration patterns.',
    assignedTime: '3 hours ago',
    reportedBy: 'Field Observer',
    icon: '👁️',
  },
]

export default function IncidentsScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all')

  const filteredIncidents = mockIncidents.filter(incident => {
    const matchesSearch = incident.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filter === 'all' ||
                         (filter === 'active' && incident.status !== 'Resolved') ||
                         (filter === 'resolved' && incident.status === 'Resolved')

    return matchesSearch && matchesFilter
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return colors.critical
      case 'warning': return colors.warning
      case 'resolved': return colors.resolved
      default: return colors.info
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

  const handleNavigateToIncident = async (incident: any) => {
    try {
      const incidentLocation: IncidentLocation = {
        latitude: incident.coordinates.latitude,
        longitude: incident.coordinates.longitude,
        address: incident.location,
        incidentId: incident.id,
        priority: incident.priority === 'resolved' ? 'low' : incident.priority
      }

      Alert.alert(
        '🗺️ Navigate to Incident',
        `Start navigation to ${incident.type} at ${incident.location}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Plan Route',
            onPress: async () => {
              const route = await navigationService.planRouteToIncident(incidentLocation)
              if (route) {
                Alert.alert(
                  'Route Information',
                  navigationService.formatRouteInfo(route),
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Start Navigation',
                      onPress: () => navigationService.openExternalNavigation(incidentLocation)
                    }
                  ]
                )
              }
            }
          },
          {
            text: 'Navigate Now',
            onPress: () => navigationService.openExternalNavigation(incidentLocation)
          }
        ]
      )
    } catch (error) {
      Alert.alert('Navigation Error', 'Failed to start navigation. Please try again.')
    }
  }

  const renderIncidentCard = (incident: any) => (
    <TouchableOpacity
      key={incident.id}
      onPress={() => router.push(`/incident/${incident.id}`)}
    >
      <Card style={[styles.card, { marginBottom: 12 }]}>
        <Card.Content style={{ padding: 16 }}>
          {/* Header Row */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 8,
          }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 20, marginRight: 8 }}>{incident.icon}</Text>
                <Text style={[styles.heading, { fontSize: 14 }]}>
                  {incident.id}
                </Text>
              </View>
              <Text style={[styles.body, { fontSize: 16, marginBottom: 2 }]}>
                {incident.type}
              </Text>
              <Text style={[styles.body, { fontSize: 12, color: colors.gray700 }]}>
                📍 {incident.location}
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Badge
                size={16}
                style={{
                  backgroundColor: getPriorityColor(incident.priority),
                  marginBottom: 4,
                }}
              >
                {incident.priority}
              </Badge>
              <Text style={[styles.body, { fontSize: 11, color: colors.gray700 }]}>
                {incident.assignedTime}
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text style={[
            styles.body,
            { fontSize: 13, color: colors.gray700, marginBottom: 12, lineHeight: 18 }
          ]}>
            {incident.description}
          </Text>

          {/* Footer Row */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View>
              <Badge
                size={14}
                style={{ backgroundColor: getStatusColor(incident.status) }}
              >
                Status: {incident.status}
              </Badge>
              <Text style={[
                styles.body,
                { fontSize: 11, color: colors.gray700, marginTop: 2 }
              ]}>
                Reported by: {incident.reportedBy}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              {incident.status !== 'Resolved' && (
                <>
                  <Button
                    mode="contained"
                    compact
                    style={{ backgroundColor: colors.fmldGreen }}
                    onPress={() => handleNavigateToIncident(incident)}
                  >
                    Navigate
                  </Button>
                  <Button
                    mode="outlined"
                    compact
                    onPress={() => router.push(`/incident/${incident.id}`)}
                  >
                    Update
                  </Button>
                </>
              )}
              {incident.status === 'Resolved' && (
                <Button
                  mode="outlined"
                  compact
                  onPress={() => router.push(`/incident/${incident.id}`)}
                >
                  View Report
                </Button>
              )}
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Search and Filters */}
      <View style={[styles.padding, { paddingBottom: 8 }]}>
        <Searchbar
          placeholder="Search incidents..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ marginBottom: 12, backgroundColor: colors.white }}
        />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          {['all', 'active', 'resolved'].map((filterType) => (
            <TouchableOpacity
              key={filterType}
              onPress={() => setFilter(filterType as any)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: filter === filterType ? colors.fmldGreen : colors.gray100,
              }}
            >
              <Text style={[
                styles.body,
                {
                  fontSize: 12,
                  color: filter === filterType ? colors.white : colors.gray700,
                  fontWeight: filter === filterType ? 'bold' : 'normal',
                }
              ]}>
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)} ({
                  filterType === 'all' ? mockIncidents.length :
                  filterType === 'active' ? mockIncidents.filter(i => i.status !== 'Resolved').length :
                  mockIncidents.filter(i => i.status === 'Resolved').length
                })
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Stats Row */}
      <View style={[styles.padding, { paddingTop: 0, paddingBottom: 8 }]}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={[styles.card, { flex: 1, alignItems: 'center', paddingVertical: 12 }]}>
            <Text style={[styles.heading, { fontSize: 18, color: colors.critical }]}>
              {mockIncidents.filter(i => i.priority === 'critical').length}
            </Text>
            <Text style={[styles.body, { fontSize: 11, color: colors.gray700 }]}>
              Critical
            </Text>
          </View>
          <View style={[styles.card, { flex: 1, alignItems: 'center', paddingVertical: 12 }]}>
            <Text style={[styles.heading, { fontSize: 18, color: colors.warning }]}>
              {mockIncidents.filter(i => i.priority === 'warning').length}
            </Text>
            <Text style={[styles.body, { fontSize: 11, color: colors.gray700 }]}>
              Warning
            </Text>
          </View>
          <View style={[styles.card, { flex: 1, alignItems: 'center', paddingVertical: 12 }]}>
            <Text style={[styles.heading, { fontSize: 18, color: colors.resolved }]}>
              {mockIncidents.filter(i => i.status === 'Resolved').length}
            </Text>
            <Text style={[styles.body, { fontSize: 11, color: colors.gray700 }]}>
              Resolved
            </Text>
          </View>
        </View>
      </View>

      {/* Incidents List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.padding, { paddingTop: 0 }]}
        showsVerticalScrollIndicator={false}
      >
        {filteredIncidents.length === 0 ? (
          <Card style={styles.card}>
            <Card.Content style={{ padding: 32, alignItems: 'center' }}>
              <Text style={{ fontSize: 48, marginBottom: 16 }}>🔍</Text>
              <Text style={[styles.heading, { fontSize: 16, marginBottom: 8 }]}>
                No Incidents Found
              </Text>
              <Text style={[styles.body, { color: colors.gray700, textAlign: 'center' }]}>
                {searchQuery
                  ? 'No incidents match your search criteria'
                  : `No ${filter === 'all' ? '' : filter + ' '}incidents assigned to you`
                }
              </Text>
            </Card.Content>
          </Card>
        ) : (
          filteredIncidents.map(renderIncidentCard)
        )}

        {/* Bottom spacing */}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  )
}