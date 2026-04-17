import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/theme';
import React from 'react';

export default function NewAnomalyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Anomaly</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
});