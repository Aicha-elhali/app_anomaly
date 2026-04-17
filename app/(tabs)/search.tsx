import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/theme';

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.label}>EXPLORE RECORDS</Text>
        <Text style={styles.title}>APOD Search</Text>

        <View style={styles.dateRow}>
          <View style={styles.dateField}>
            <Text style={styles.fieldLabel}>FROM</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="20. Mar 2026"
              placeholderTextColor={COLORS.textMuted}
            />
          </View>
          <View style={styles.dateField}>
            <Text style={styles.fieldLabel}>TO</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="26. Mar 2026"
              placeholderTextColor={COLORS.textMuted}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
  label: {
    color: COLORS.textLabel,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  dateField: {
    flex: 1,
  },
  fieldLabel: {
    color: COLORS.textLabel,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  dateInput: {
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    color: COLORS.text,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: COLORS.purple,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});