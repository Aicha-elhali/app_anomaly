import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/theme';
import PageHeader from '../../components/PageHeader';
import ActionButton from '../../components/ActionButton';
import InputField from '../../components/InputField';
import { useAnomalies } from '../../context/AnomalyContext';

type ApodResult = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  copyright?: string;
};

export default function SearchScreen() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [results, setResults] = useState<ApodResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ApodResult | null>(null);
  const { addAnomaly } = useAnomalies();

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
        const imageResults = data.filter((item: ApodResult) => item.media_type === 'image');
        setResults(imageResults);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data. Check your dates and try again.');
    }
    setLoading(false);
  };

  const handleSaveToAnomalies = (item: ApodResult) => {
    addAnomaly(item.title, item.explanation, item.url);
    setSelectedItem(null);
    Alert.alert('Success', 'Saved to My Anomalies!');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.content}>
          <PageHeader label="EXPLORE RECORDS" title="APOD Search" />

          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <InputField label="FROM" placeholder="2026-03-20" value={fromDate} onChangeText={setFromDate} />
            </View>
            <View style={styles.dateField}>
              <InputField label="TO" placeholder="2026-03-26" value={toDate} onChangeText={setToDate} />
            </View>
          </View>

          <View style={styles.searchButtonWrapper}>
            <ActionButton label="Search" onPress={handleSearch} />
          </View>

          {loading && (
            <ActivityIndicator size="large" color={COLORS.accent} style={styles.loader} />
          )}

          {results.map((item) => (
            <TouchableOpacity
              key={item.date}
              style={styles.resultCard}
              onPress={() => setSelectedItem(item)}
            >
              <Image source={{ uri: item.url }} style={styles.resultImage} />
              <View style={styles.resultContent}>
                <Text style={styles.resultDate}>{item.date}</Text>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultDescription} numberOfLines={3}>
                  {item.explanation}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={selectedItem !== null}
        animationType="slide"
        transparent={false}
      >
        <SafeAreaView style={styles.modalScreen}>
          <ScrollView>
            {selectedItem && (
              <View>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalDate}>{selectedItem.date}</Text>
                  <TouchableOpacity onPress={() => setSelectedItem(null)}>
                    <Ionicons name="close-circle" size={28} color={COLORS.textMuted} />
                  </TouchableOpacity>
                </View>

                <Image source={{ uri: selectedItem.url }} style={styles.modalImage} />

                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                  {selectedItem.copyright && (
                    <Text style={styles.modalCopyright}>© {selectedItem.copyright}</Text>
                  )}
                  <Text style={styles.modalDescription}>{selectedItem.explanation}</Text>

                  <ActionButton label="Save to My Anomalies" onPress={() => handleSaveToAnomalies(selectedItem)} />
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateField: {
    flex: 1,
  },
  searchButtonWrapper: {
    marginBottom: 24,
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
  modalScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  modalDate: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  modalImage: {
    width: '100%',
    height: 250,
  },
  modalContent: {
    padding: 16,
  },
  modalTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalCopyright: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginBottom: 12,
  },
  modalDescription: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
});