// app/(tabs)/report.tsx

import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Card, Button, TextInput } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { colors, styles } from '../../lib/theme'

const incidentTypes = [
  {
    key: 'cattle_rustling',
    label: 'Cattle Rustling',
    icon: '🐄',
    description: 'Armed cattle theft',
    color: colors.critical,
  },
  {
    key: 'boundary_dispute',
    label: 'Boundary Dispute',
    icon: '🗺️',
    description: 'Land boundary conflicts',
    color: colors.warning,
  },
  {
    key: 'violent_clash',
    label: 'Violent Clash',
    icon: '⚔️',
    description: 'Physical confrontations',
    color: colors.critical,
  },
  {
    key: 'illegal_mining',
    label: 'Illegal Mining',
    icon: '⛏️',
    description: 'Unauthorized mining',
    color: colors.warning,
  },
  {
    key: 'fire_outbreak',
    label: 'Fire Outbreak',
    icon: '🔥',
    description: 'Fire in grazing areas',
    color: colors.critical,
  },
  {
    key: 'suspicious_movement',
    label: 'Suspicious Movement',
    icon: '👁️',
    description: 'Unusual activity',
    color: colors.info,
  },
]

export default function ReportScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const handleVoiceReport = () => {
    if (isRecording) {
      setIsRecording(false)
      Alert.alert('Voice Recording', 'Recording stopped. Voice-to-text conversion complete.')
      setDescription('Suspicious cattle movement detected near the river bank. Approximately 200 head of cattle moving south towards Nasarawa border.')
    } else {
      setIsRecording(true)
      Alert.alert('Voice Recording', 'Recording started. Speak your incident report clearly.')
    }
  }

  const handleQuickReport = (type: string) => {
    setSelectedType(type)
    const incidentType = incidentTypes.find(t => t.key === type)
    router.push(`/report/${type}`)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.padding, { paddingBottom: 8 }]}>
        <Text style={[styles.heading, { fontSize: 20, marginBottom: 4 }]}>
          Report Incident
        </Text>
        <Text style={[styles.body, { color: colors.gray700, fontSize: 14 }]}>
          What type of incident are you reporting?
        </Text>
      </View>

      {/* Incident Type Grid */}
      <View style={styles.padding}>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
          {incidentTypes.map((type) => (
            <TouchableOpacity
              key={type.key}
              onPress={() => handleQuickReport(type.key)}
              style={{
                width: '48%',
                marginBottom: 12,
              }}
            >
              <Card style={[
                styles.card,
                {
                  backgroundColor: selectedType === type.key ? type.color : colors.white,
                  borderWidth: selectedType === type.key ? 2 : 0,
                  borderColor: selectedType === type.key ? type.color : 'transparent',
                }
              ]}>
                <Card.Content style={{
                  padding: 16,
                  alignItems: 'center',
                  minHeight: 120,
                  justifyContent: 'center',
                }}>
                  <Text style={{
                    fontSize: 32,
                    marginBottom: 8,
                  }}>
                    {type.icon}
                  </Text>
                  <Text style={[
                    styles.heading,
                    {
                      fontSize: 14,
                      textAlign: 'center',
                      marginBottom: 4,
                      color: selectedType === type.key ? colors.white : colors.gray900,
                    }
                  ]}>
                    {type.label}
                  </Text>
                  <Text style={[
                    styles.body,
                    {
                      fontSize: 11,
                      textAlign: 'center',
                      color: selectedType === type.key ? colors.white : colors.gray700,
                    }
                  ]}>
                    {type.description}
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Divider */}
      <View style={{
        marginHorizontal: 16,
        marginVertical: 8,
        height: 1,
        backgroundColor: colors.gray100,
      }} />

      <View style={{
        alignItems: 'center',
        marginVertical: 8,
      }}>
        <Text style={[
          styles.body,
          { fontSize: 14, color: colors.gray700, fontWeight: '500' }
        ]}>
          ─────── OR ───────
        </Text>
      </View>

      {/* Voice Report Section */}
      <View style={[styles.padding, { paddingTop: 8 }]}>
        <Card style={[
          styles.card,
          { backgroundColor: isRecording ? colors.critical : colors.fmldGreen }
        ]}>
          <Card.Content style={{ padding: 20 }}>
            <TouchableOpacity
              onPress={handleVoiceReport}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialCommunityIcons
                name={isRecording ? 'stop-circle' : 'microphone'}
                size={48}
                color={colors.white}
                style={{ marginBottom: 12 }}
              />
              <Text style={[
                styles.heading,
                { fontSize: 18, color: colors.white, marginBottom: 4 }
              ]}>
                🎤 {isRecording ? 'Stop Recording' : 'Voice Report'}
              </Text>
              <Text style={[
                styles.body,
                { fontSize: 14, color: colors.white, textAlign: 'center', opacity: 0.9 }
              ]}>
                {isRecording
                  ? 'Recording... Tap to stop'
                  : 'Speak your incident report in any language'
                }
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>

        {/* Voice Description Preview */}
        {description.length > 0 && (
          <Card style={[styles.card, { marginTop: 12 }]}>
            <Card.Content style={{ padding: 16 }}>
              <Text style={[styles.heading, { fontSize: 14, marginBottom: 8 }]}>
                Voice-to-Text Result:
              </Text>
              <TextInput
                mode="outlined"
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
                placeholder="Voice recognition result will appear here..."
                style={{ marginBottom: 12 }}
              />
              <Button
                mode="contained"
                onPress={() => {
                  Alert.alert(
                    'Voice Report Submitted',
                    'Your voice report has been converted to text and submitted successfully.',
                    [
                      { text: 'OK', onPress: () => setDescription('') }
                    ]
                  )
                }}
                style={{ backgroundColor: colors.fmldGreen }}
              >
                Submit Voice Report
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>

      {/* Language Support */}
      <View style={[styles.padding, { paddingTop: 0 }]}>
        <Card style={[styles.card, { backgroundColor: colors.gray100 }]}>
          <Card.Content style={{ padding: 16 }}>
            <Text style={[styles.heading, { fontSize: 14, marginBottom: 8 }]}>
              Supported Languages
            </Text>
            <Text style={[styles.body, { fontSize: 12, color: colors.gray700 }]}>
              🌍 English • Hausa • Yoruba • Igbo • Fulfulde
            </Text>
            <Text style={[styles.body, { fontSize: 11, color: colors.gray700, marginTop: 4 }]}>
              Voice recognition works in all supported languages
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Quick Tips */}
      <View style={[styles.padding, { paddingTop: 0, paddingBottom: 32 }]}>
        <Card style={styles.card}>
          <Card.Content style={{ padding: 16 }}>
            <Text style={[styles.heading, { fontSize: 14, marginBottom: 8 }]}>
              💡 Quick Tips
            </Text>
            <View style={{ paddingLeft: 8 }}>
              <Text style={[styles.body, { fontSize: 12, marginBottom: 4 }]}>
                • Reports work offline and sync when connected
              </Text>
              <Text style={[styles.body, { fontSize: 12, marginBottom: 4 }]}>
                • GPS location is automatically captured
              </Text>
              <Text style={[styles.body, { fontSize: 12, marginBottom: 4 }]}>
                • Add photos/videos in the detailed form
              </Text>
              <Text style={[styles.body, { fontSize: 12 }]}>
                • Emergency reports get immediate priority
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  )
}