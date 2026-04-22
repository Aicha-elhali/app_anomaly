import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/theme';
import PageHeader from '../../components/PageHeader';
import AnomalyCard from '../../components/AnomalyCard';
import { useAnomalies } from '../../context/AnomalyContext';

export default function MyAnomaliesScreen() {
  const { anomalies } = useAnomalies();

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.content}>
          <PageHeader label="ASSIGNED TO YOU" title="My Anomalies" />

          {anomalies.length === 0 ? (
            <Text style={styles.emptyText}>No anomalies saved yet.</Text>
          ) : (
            anomalies.map((anomaly) => (
              <AnomalyCard
                key={anomaly.id}
                name={anomaly.name}
                description={anomaly.description}
                image={anomaly.image}
                createdAt={anomaly.createdAt}
              />
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
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
  },
});