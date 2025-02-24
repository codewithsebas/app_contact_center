'use client';

import { useContext } from 'react';
import { WebSocketContext } from '../contexts/WebSocketContext';

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket debe usarse dentro de WebSocketProvider');
  }
  return context;
}
