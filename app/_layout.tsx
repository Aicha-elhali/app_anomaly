import React from 'react';
import { Stack } from 'expo-router';
import { AnomalyProvider } from '../context/AnomalyContext';

export default function RootLayout() {
  return (
    <AnomalyProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AnomalyProvider>
  );
}