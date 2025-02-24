'use client';

import React, { createContext, useState } from 'react';
import { Client } from '../components/ClientList';

interface ClientsContextType {
    clients: Client[];
    setClients: React.Dispatch<React.SetStateAction<Client[]>>;
    updateClient: (updatedClient: Client) => void;
}

export const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clients, setClients] = useState<Client[]>([]);

    const updateClient = (updatedClient: Client) => {
        setClients((prevClients) =>
            prevClients.map((client) =>
                client.id === updatedClient.id ? updatedClient : client
            )
        );
    };

    return (
        <ClientsContext.Provider value={{ clients, setClients, updateClient }}>
            {children}
        </ClientsContext.Provider>
    );
};
