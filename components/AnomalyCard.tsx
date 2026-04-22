import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/theme';

type AnomalyCardProps = {
  name: string;
  description: string;
  image: string | null;
  createdAt: string;
  onDelete?: () => void;
};

export default function AnomalyCard({ name, description, image, createdAt, onDelete }: AnomalyCardProps) {
  return (
    <View style={styles.card}>
      {image && (
        <Image source={{ uri: image }} style={styles.cardImage} />
      )}
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{name}</Text>
          {onDelete && (
            <TouchableOpacity onPress={onDelete}>
              <Ionicons name="trash-outline" size={20} color="#E74C3C" />
            </TouchableOpacity>
          )}
        </View>
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
    height: 200,
  },
  cardContent: {
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
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