import React, { createContext, useContext, useState } from 'react';

type Anomaly = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  createdAt: string;
};

type AnomalyContextType = {
  anomalies: Anomaly[];
  addAnomaly: (name: string, description: string, image: string | null) => void;
  deleteAnomaly: (id: number) => void;
};

const AnomalyContext = createContext<AnomalyContextType>({
  anomalies: [],
  addAnomaly: () => {},
  deleteAnomaly: () => {},
});

export const useAnomalies = () => useContext(AnomalyContext);

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

  const deleteAnomaly = (id: number) => {
    setAnomalies(prev => prev.filter(anomaly => anomaly.id !== id));
  };

  return (
    <AnomalyContext.Provider value={{ anomalies, addAnomaly, deleteAnomaly }}>
      {children}
    </AnomalyContext.Provider>
  );
}