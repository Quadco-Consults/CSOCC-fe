// app/index.tsx (Splash/Loading Screen)

import React, { useEffect } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import { router } from 'expo-router'
import { colors, styles } from '../lib/theme'

export default function IndexScreen() {
  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      // Check if user is authenticated
      const isAuthenticated = false // This would come from storage/auth state

      if (isAuthenticated) {
        router.replace('/(tabs)')
      } else {
        router.replace('/auth/login')
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: colors.fmldGreen,
        justifyContent: 'center',
        alignItems: 'center',
      }
    ]}>
      {/* FMLD Logo Placeholder */}
      <View style={{
        width: 120,
        height: 120,
        backgroundColor: colors.white,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
      }}>
        <Text style={{
          fontSize: 32,
          color: colors.fmldGreen,
        }}>🇳🇬</Text>
      </View>

      {/* App Title */}
      <Text style={[
        styles.heading,
        {
          fontSize: 28,
          color: colors.white,
          marginBottom: 8,
          textAlign: 'center',
        }
      ]}>
        CSOCCC
      </Text>

      <Text style={[
        styles.body,
        {
          fontSize: 16,
          color: colors.fmldCream,
          marginBottom: 8,
          textAlign: 'center',
        }
      ]}>
        Field Reporting App
      </Text>

      <Text style={[
        styles.body,
        {
          fontSize: 14,
          color: colors.fmldCream,
          marginBottom: 40,
          textAlign: 'center',
        }
      ]}>
        Federal Ministry of Livestock Development
      </Text>

      {/* Loading Indicator */}
      <ActivityIndicator size="large" color={colors.white} />

      {/* Version */}
      <Text style={[
        styles.body,
        {
          position: 'absolute',
          bottom: 32,
          fontSize: 12,
          color: colors.fmldCream,
        }
      ]}>
        Version 1.0.0
      </Text>
    </View>
  )
}