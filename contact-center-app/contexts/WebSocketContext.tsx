'use client';

import React, { createContext, useEffect, useRef } from 'react';
import { AgentsContext } from './AgentsContext';
import { ClientsContext } from './ClientsContext';
import { Agent } from '../components/AgentList';
import { Client } from '../components/ClientList';

interface WebSocketContextType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage?: (message: any) => void;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ws = useRef<WebSocket | null>(null);
    const agentsContext = React.useContext(AgentsContext);
    const clientsContext = React.useContext(ClientsContext);

    useEffect(() => {
        ws.current = new WebSocket('http://localhost:5041/ws');

        ws.current.onopen = () => {
            console.log('Conexión WebSocket establecida.');
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'agent' && agentsContext) {
                agentsContext.updateAgent(data.payload as Agent);
            } else if (data.type === 'client' && clientsContext) {
                clientsContext.updateClient(data.payload as Client);
            }
        };

        ws.current.onclose = () => {
            console.log('Conexión WebSocket cerrada.');
        };

        return () => {
            ws.current?.close();
        };
    }, [agentsContext, clientsContext]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sendMessage = (message: any) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        }
    };

    return (
        <WebSocketContext.Provider value={{ sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};
