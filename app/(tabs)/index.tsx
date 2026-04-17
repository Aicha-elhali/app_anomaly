import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800' }}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>NASA ANOMALY MONITOR</Text>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.description}>
            Review the mission status, recent activity, and the most important anomaly alerts in one place.
          </Text>
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
  imageContainer: {
    padding: 16,
  },
  heroImage: {
    width: '100%',
    height: 230,
    borderRadius: 16,
  },
  content: {
    padding: 16,
  },
  label: {
    color: COLORS.textLabel,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
});