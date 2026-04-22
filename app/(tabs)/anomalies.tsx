import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/theme';
import { useAnomalies } from '../../context/AnomalyContext';

export default function MyAnomaliesScreen() {
  const { anomalies } = useAnomalies();

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.label}>ASSIGNED TO YOU</Text>
          <Text style={styles.title}>My Anomalies</Text>

          {anomalies.length === 0 ? (
            <Text style={styles.emptyText}>No anomalies saved yet.</Text>
          ) : (
            anomalies.map((anomaly) => ( 
              <View key={anomaly.id} style={styles.card}>
                {anomaly.image && (
                  <Image source={{ uri: anomaly.image }} style={styles.cardImage} />
                )}
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{anomaly.name}</Text>
                  <Text style={styles.cardDescription}>{anomaly.description}</Text>
                  <Text style={styles.cardDate}>{anomaly.createdAt}</Text>
                </View>
              </View>
            ))
          )}
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
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 14,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 6,
  },
  cardDate: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
});