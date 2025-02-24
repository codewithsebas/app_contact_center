'use client';

import { useCallback, useContext } from 'react';
import { ClientsContext } from '../contexts/ClientsContext';
import { Client } from '../components/ClientList';
import { fetchClientsData } from '../services/api';

export function useClients() {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error('useClients debe usarse dentro de ClientsProvider');
  }
  const { clients, setClients } = context;

  const fetchClients = useCallback(async (waitTimeFilter: string) => {
    try {
      const data: Client[] = await fetchClientsData(waitTimeFilter);
      setClients(data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  }, [setClients]);

  return { clients, fetchClients };
}
