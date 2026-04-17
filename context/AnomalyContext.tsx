import React, { createContext, useContext, useState } from 'react';

type Anomaly = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  createdAt: string;
};

// Define what the context provides
type AnomalyContextType = {
  anomalies: Anomaly[];
  addAnomaly: (name: string, description: string, image: string | null) => void;
};

// Create the context
const AnomalyContext = createContext<AnomalyContextType>({
  anomalies: [],
  addAnomaly: () => {},
});

// Custom hook for easy access
export const useAnomalies = () => useContext(AnomalyContext);

// Provider component that wraps the app
export function AnomalyProvider({ children }: { children: React.ReactNode }) {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);

  const addAnomaly = (name: string, description: string, image: string | null) => {
    const newAnomaly: Anomaly = {
      id: Date.now(),
      name,
      description,
      image,
      createdAt: new Date().toLocaleString(),
    };
    setAnomalies(prev => [newAnomaly, ...prev]);
  };

  return (
    <AnomalyContext.Provider value={{ anomalies, addAnomaly }}>
      {children}
    </AnomalyContext.Provider>
  );
}