import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/theme';
import PageHeader from '../../components/PageHeader';

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
          <PageHeader label="NASA ANOMALY MONITOR" title="Home" />
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
    height: 250,
    borderRadius: 16,
  },
  content: {
    padding: 16,
  },
  description: {
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 22,
  },
});