import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import COLORS from '../constants/theme';

type AnomalyCardProps = {
  name: string;
  description: string;
  image: string | null;
  createdAt: string;
};

export default function AnomalyCard({ name, description, image, createdAt }: AnomalyCardProps) {
  return (
    <View style={styles.card}>
      {image && (
        <Image source={{ uri: image }} style={styles.cardImage} />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        <Text style={styles.cardDate}>{createdAt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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