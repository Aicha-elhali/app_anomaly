import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/theme';

type ApodResult = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: string;
};

export default function SearchScreen() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [results, setResults] = useState<ApodResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!fromDate.trim() || !toDate.trim()) {
      Alert.alert('Error', 'Please enter both dates (YYYY-MM-DD).');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${fromDate}&end_date=${toDate}`
      );
      const data = await response.json();

      if (data.error) {
        Alert.alert('Error', data.error.message);
        setResults([]);
      } else {
        // Filter out videos, only keep images
        const imageResults = data.filter((item: ApodResult) => item.media_type === 'image');
        setResults(imageResults);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data. Check your dates and try again.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.label}>EXPLORE RECORDS</Text>
          <Text style={styles.title}>APOD Search</Text>

          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <Text style={styles.fieldLabel}>FROM</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="2026-03-20"
                placeholderTextColor={COLORS.textMuted}
                value={fromDate}
                onChangeText={setFromDate}
              />
            </View>
            <View style={styles.dateField}>
              <Text style={styles.fieldLabel}>TO</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="2026-03-26"
                placeholderTextColor={COLORS.textMuted}
                value={toDate}
                onChangeText={setToDate}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>

          {loading && (
            <ActivityIndicator size="large" color={COLORS.accent} style={styles.loader} />
          )}

          {results.map((item) => (
            <View key={item.date} style={styles.resultCard}>
              <Image source={{ uri: item.url }} style={styles.resultImage} />
              <View style={styles.resultContent}>
                <Text style={styles.resultDate}>{item.date}</Text>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultDescription} numberOfLines={3}>
                  {item.explanation}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    marginBottom: 24,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  loader: {
    marginVertical: 20,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  resultImage: {
    width: 100,
    height: 100,
  },
  resultContent: {
    flex: 1,
    padding: 10,
  },
  resultDate: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginBottom: 2,
  },
  resultTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultDescription: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
});