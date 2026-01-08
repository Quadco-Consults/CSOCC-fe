// lib/theme.ts

import { MD3LightTheme } from 'react-native-paper'

export const colors = {
  // FMLD Primary Colors
  fmldGreen: '#008751',
  fmldGreenDark: '#006B40',
  fmldGreenLight: '#00A86B',
  fmldGold: '#C9A227',
  fmldCream: '#F5F5DC',

  // Status Colors
  critical: '#DC2626',
  warning: '#F59E0B',
  resolved: '#10B981',
  info: '#3B82F6',

  // Neutral Colors
  gray900: '#1A1A2E',
  gray800: '#16213E',
  gray700: '#0F3460',
  gray100: '#F8F9FA',
  white: '#FFFFFF',
}

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.fmldGreen,
    primaryContainer: colors.fmldGreenLight,
    secondary: colors.fmldGold,
    surface: colors.white,
    background: colors.gray100,
    error: colors.critical,
    onPrimary: colors.white,
    onSurface: colors.gray900,
  },
}

export const styles = {
  // Typography
  heading: {
    fontFamily: 'System',
    fontWeight: 'bold' as const,
  },
  body: {
    fontFamily: 'System',
    fontWeight: 'normal' as const,
  },

  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.gray100,
  },
  padding: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  // Emergency button
  emergencyButton: {
    backgroundColor: colors.critical,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
}