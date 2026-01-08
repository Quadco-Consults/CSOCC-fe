// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../lib/theme'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.fmldGreen,
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.gray100,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colors.fmldGreen,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'CSOCCC Field Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          headerTitle: 'Quick Report',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document-edit" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="incidents"
        options={{
          title: 'My Tasks',
          headerTitle: 'Assigned Incidents',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'Officer Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}