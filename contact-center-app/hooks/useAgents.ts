'use client';

import { useCallback, useContext } from 'react';
import { AgentsContext } from '../contexts/AgentsContext';
import { Agent } from '../components/AgentList';
import { fetchAgentsData } from '../services/api';

export function useAgents() {
  const context = useContext(AgentsContext);
  if (!context) {
    throw new Error('useAgents debe usarse dentro de AgentsProvider');
  }
  const { agents, setAgents } = context;

  const fetchAgents = useCallback(async (statusFilter: string) => {
    try {
      const data: Agent[] = await fetchAgentsData(statusFilter);
      setAgents(data);
    } catch (error) {
      console.error('Error al obtener agentes:', error);
    }
  }, [setAgents]);

  return { agents, fetchAgents };
}
