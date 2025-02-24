import { Agent } from '../components/AgentList';
import { Client } from '../components/ClientList';

const API_BASE_URL = 'http://localhost:5041/api';

export async function fetchAgentsData(statusFilter: string): Promise<Agent[]> {
  const query = statusFilter ? `?status=${statusFilter}` : '';
  const response = await fetch(`${API_BASE_URL}/agents${query}`);
  if (!response.ok) {
    throw new Error('Error al obtener datos de agentes');
  }
  return response.json();
}

export async function fetchClientsData(waitTimeFilter: string): Promise<Client[]> {
  const query = waitTimeFilter ? `?waitTime=${waitTimeFilter}` : '';
  const response = await fetch(`${API_BASE_URL}/clients${query}`);
  if (!response.ok) {
    throw new Error('Error al obtener datos de clientes');
  }
  return response.json();
}
