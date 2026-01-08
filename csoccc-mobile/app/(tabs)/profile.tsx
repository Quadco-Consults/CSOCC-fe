// app/(tabs)/profile.tsx

import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Card, Button, List, Switch } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { colors, styles } from '../../lib/theme'

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const [locationEnabled, setLocationEnabled] = React.useState(true)
  const [offlineMode, setOfflineMode] = React.useState(false)

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            router.replace('/auth/login')
          },
        },
      ]
    )
  }

  const profileStats = [
    { label: 'Incidents Reported', value: '23', icon: 'file-document-edit' },
    { label: 'Cases Resolved', value: '18', icon: 'check-circle' },
    { label: 'Days Active', value: '45', icon: 'calendar-clock' },
    { label: 'Response Rate', value: '96%', icon: 'speedometer' },
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={[
        styles.padding,
        {
          backgroundColor: colors.fmldGreen,
          paddingTop: 32,
          paddingBottom: 24,
        }
      ]}>
        <View style={{ alignItems: 'center' }}>
          {/* Profile Avatar */}
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <Text style={{
              fontSize: 32,
              color: colors.fmldGreen,
              fontWeight: 'bold',
            }}>
              A
            </Text>
          </View>

          <Text style={[
            styles.heading,
            { fontSize: 24, color: colors.white, marginBottom: 4 }
          ]}>
            Officer Adamu Ibrahim
          </Text>

          <Text style={[
            styles.body,
            { fontSize: 14, color: colors.fmldCream, marginBottom: 2 }
          ]}>
            Field Officer • Badge #FO-2024-089
          </Text>

          <Text style={[
            styles.body,
            { fontSize: 12, color: colors.fmldCream }
          ]}>
            Zone: Benue State • Rank: Senior Officer
          </Text>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={[styles.padding, { paddingTop: 8 }]}>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
          {profileStats.map((stat, index) => (
            <View
              key={index}
              style={{
                width: '48%',
                marginBottom: 12,
              }}
            >
              <Card style={styles.card}>
                <Card.Content style={{
                  padding: 16,
                  alignItems: 'center',
                }}>
                  <MaterialCommunityIcons
                    name={stat.icon as any}
                    size={24}
                    color={colors.fmldGreen}
                    style={{ marginBottom: 8 }}
                  />
                  <Text style={[
                    styles.heading,
                    { fontSize: 20, marginBottom: 4 }
                  ]}>
                    {stat.value}
                  </Text>
                  <Text style={[
                    styles.body,
                    { fontSize: 11, color: colors.gray700, textAlign: 'center' }
                  ]}>
                    {stat.label}
                  </Text>
                </Card.Content>
              </Card>
            </View>
          ))}
        </View>
      </View>

      {/* Settings Section */}
      <View style={[styles.padding, { paddingTop: 0 }]}>
        <Text style={[styles.heading, { fontSize: 18, marginBottom: 12 }]}>
          App Settings
        </Text>

        <Card style={styles.card}>
          <List.Item
            title="Push Notifications"
            description="Receive incident alerts and updates"
            left={(props) => <List.Icon {...props} icon="bell" color={colors.fmldGreen} />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                color={colors.fmldGreen}
              />
            )}
          />

          <List.Item
            title="Location Services"
            description="Auto-capture GPS for incident reports"
            left={(props) => <List.Icon {...props} icon="map-marker" color={colors.fmldGreen} />}
            right={() => (
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                color={colors.fmldGreen}
              />
            )}
          />

          <List.Item
            title="Offline Mode"
            description="Queue reports when no internet"
            left={(props) => <List.Icon {...props} icon="wifi-off" color={colors.fmldGreen} />}
            right={() => (
              <Switch
                value={offlineMode}
                onValueChange={setOfflineMode}
                color={colors.fmldGreen}
              />
            )}
          />
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={[styles.padding, { paddingTop: 0 }]}>
        <Text style={[styles.heading, { fontSize: 18, marginBottom: 12 }]}>
          Quick Actions
        </Text>

        <Card style={styles.card}>
          <List.Item
            title="Update Profile"
            description="Edit your officer information"
            left={(props) => <List.Icon {...props} icon="account-edit" color={colors.fmldGreen} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Update Profile', 'Feature coming soon')}
          />

          <List.Item
            title="Change PIN"
            description="Update your security PIN"
            left={(props) => <List.Icon {...props} icon="lock-reset" color={colors.fmldGreen} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Change PIN', 'Feature coming soon')}
          />

          <List.Item
            title="Sync Data"
            description="Upload pending reports"
            left={(props) => <List.Icon {...props} icon="sync" color={colors.fmldGreen} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {
              Alert.alert('Data Sync', 'All reports synchronized successfully')
            }}
          />

          <List.Item
            title="Help & Support"
            description="User manual and contact support"
            left={(props) => <List.Icon {...props} icon="help-circle" color={colors.fmldGreen} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Help & Support', 'Contact: support@fmld.gov.ng')}
          />
        </Card>
      </View>

      {/* System Information */}
      <View style={[styles.padding, { paddingTop: 0 }]}>
        <Text style={[styles.heading, { fontSize: 18, marginBottom: 12 }]}>
          System Information
        </Text>

        <Card style={styles.card}>
          <Card.Content style={{ padding: 16 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}>
              <Text style={[styles.body, { color: colors.gray700 }]}>App Version</Text>
              <Text style={[styles.body]}>1.0.0</Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}>
              <Text style={[styles.body, { color: colors.gray700 }]}>Device ID</Text>
              <Text style={[styles.body]}>NGO-FMLD-2024</Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}>
              <Text style={[styles.body, { color: colors.gray700 }]}>Last Sync</Text>
              <Text style={[styles.body]}>2 minutes ago</Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Text style={[styles.body, { color: colors.gray700 }]}>Network Status</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.resolved,
                  marginRight: 6,
                }} />
                <Text style={[styles.body, { color: colors.resolved }]}>Online</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Emergency Contact */}
      <View style={[styles.padding, { paddingTop: 0 }]}>
        <Card style={[styles.card, { backgroundColor: colors.gray100 }]}>
          <Card.Content style={{ padding: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.heading, { fontSize: 16, marginBottom: 8 }]}>
                Emergency Contact
              </Text>
              <TouchableOpacity
                onPress={() => Alert.alert('Emergency Call', 'Calling CSOCCC Hotline 199...')}
                style={{
                  backgroundColor: colors.critical,
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <Text style={[
                  styles.heading,
                  { fontSize: 16, color: colors.white }
                ]}>
                  📞 Call 199
                </Text>
              </TouchableOpacity>
              <Text style={[
                styles.body,
                { fontSize: 12, color: colors.gray700, textAlign: 'center' }
              ]}>
                CSOCCC Emergency Hotline • Available 24/7
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Logout Button */}
      <View style={[styles.padding, { paddingTop: 0, paddingBottom: 32 }]}>
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={{
            borderColor: colors.critical,
            paddingVertical: 8,
          }}
          labelStyle={{ color: colors.critical, fontWeight: 'bold' }}
          icon="logout"
        >
          Logout
        </Button>
      </View>

      {/* Footer */}
      <View style={{ alignItems: 'center', paddingBottom: 32 }}>
        <Text style={[
          styles.body,
          { fontSize: 12, color: colors.gray700, textAlign: 'center' }
        ]}>
          🇳🇬 Federal Ministry of Livestock Development{'\n'}
          Serving Nigeria with Pride and Dedication
        </Text>
      </View>
    </ScrollView>
  )
}