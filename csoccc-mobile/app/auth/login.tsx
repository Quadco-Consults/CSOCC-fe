// app/auth/login.tsx

import React, { useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { TextInput, Button, Card } from 'react-native-paper'
import { router } from 'expo-router'
import { colors, styles } from '../../lib/theme'

export default function LoginScreen() {
  const [officerId, setOfficerId] = useState('')
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!officerId.trim() || !pin.trim()) {
      Alert.alert('Error', 'Please enter both Officer ID and PIN')
      return
    }

    setLoading(true)

    // Simulate authentication
    setTimeout(() => {
      if (officerId.toLowerCase() === 'officer123' && pin === '1234') {
        setLoading(false)
        router.replace('/(tabs)')
      } else {
        setLoading(false)
        Alert.alert('Authentication Failed', 'Invalid Officer ID or PIN')
      }
    }, 1500)
  }

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Hotline',
      'Call CSOCCC Emergency Hotline (199)?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling 199...') },
      ]
    )
  }

  return (
    <ScrollView style={[styles.container]} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}
      <View style={{
        backgroundColor: colors.fmldGreen,
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
      }}>
        {/* Logo */}
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: colors.white,
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 16,
        }}>
          <Text style={{ fontSize: 24, color: colors.fmldGreen }}>🇳🇬</Text>
        </View>

        <Text style={[
          styles.heading,
          { fontSize: 24, color: colors.white, marginBottom: 8 }
        ]}>
          CSOCCC Field App
        </Text>

        <Text style={[
          styles.body,
          { fontSize: 14, color: colors.fmldCream, textAlign: 'center' }
        ]}>
          Federal Ministry of Livestock Development{'\n'}
          Secure Field Reporting System
        </Text>
      </View>

      {/* Login Form */}
      <View style={{ flex: 1, padding: 20 }}>
        <Card style={{ marginTop: -20, marginBottom: 20 }}>
          <Card.Content style={{ padding: 24 }}>
            <Text style={[
              styles.heading,
              { fontSize: 20, marginBottom: 20, textAlign: 'center' }
            ]}>
              Field Officer Login
            </Text>

            {/* Officer ID Input */}
            <TextInput
              label="Officer ID"
              value={officerId}
              onChangeText={setOfficerId}
              mode="outlined"
              style={{ marginBottom: 16 }}
              left={<TextInput.Icon icon="account-badge" />}
              autoCapitalize="none"
              placeholder="Enter your officer ID"
            />

            {/* PIN Input */}
            <TextInput
              label="PIN / Password"
              value={pin}
              onChangeText={setPin}
              mode="outlined"
              secureTextEntry
              style={{ marginBottom: 24 }}
              left={<TextInput.Icon icon="lock" />}
              placeholder="Enter your PIN"
              keyboardType="numeric"
            />

            {/* Login Button */}
            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={{
                paddingVertical: 8,
                marginBottom: 16,
                backgroundColor: colors.fmldGreen,
              }}
              labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
            >
              {loading ? 'Authenticating...' : 'Login'}
            </Button>

            {/* Biometrics Option (Mock) */}
            <Button
              mode="outlined"
              onPress={() => Alert.alert('Biometric Login', 'Feature coming soon')}
              style={{ marginBottom: 16 }}
              icon="fingerprint"
            >
              Use Biometrics 👆
            </Button>

            {/* Demo Credentials */}
            <View style={{
              backgroundColor: colors.gray100,
              padding: 12,
              borderRadius: 6,
              marginBottom: 16,
            }}>
              <Text style={[styles.body, { fontSize: 12, color: colors.gray700, textAlign: 'center' }]}>
                Demo Credentials:{'\n'}
                Officer ID: officer123 | PIN: 1234
              </Text>
            </View>

            {/* Help Text */}
            <Text style={[
              styles.body,
              { fontSize: 12, color: colors.gray700, textAlign: 'center' }
            ]}>
              Forgot PIN? Contact your system administrator
            </Text>
          </Card.Content>
        </Card>

        {/* Emergency Button */}
        <Card style={{ marginBottom: 20 }}>
          <Card.Content style={{ padding: 16 }}>
            <Button
              mode="contained"
              onPress={handleEmergencyCall}
              style={[styles.emergencyButton, { marginBottom: 8 }]}
              labelStyle={{ fontSize: 18, fontWeight: 'bold', color: colors.white }}
              icon="phone-alert"
            >
              🚨 EMERGENCY HOTLINE 199
            </Button>
            <Text style={[
              styles.body,
              { fontSize: 12, color: colors.gray700, textAlign: 'center' }
            ]}>
              Available 24/7 • Free nationwide • Multi-language support
            </Text>
          </Card.Content>
        </Card>

        {/* Footer */}
        <View style={{ alignItems: 'center', paddingBottom: 20 }}>
          <Text style={[
            styles.body,
            { fontSize: 12, color: colors.gray700, textAlign: 'center' }
          ]}>
            🇳🇬 An official app of the Federal Republic of Nigeria{'\n'}
            Secure • Verified • Trusted
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}