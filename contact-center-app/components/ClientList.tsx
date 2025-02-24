'use client';

import React from 'react';
import ClientCard from './ClientCard';

export interface Client {
    id: number;
    name: string;
    waitTime: number;
}

interface ClientListProps {
    clients: Client[];
}

const ClientList: React.FC<ClientListProps> = ({ clients }) => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            {clients.length > 0 ? (
                clients.map((client) => (
                    <ClientCard key={client.id} client={client} />
                ))
            ) : (
                <p>No hay clientes en espera.</p>
            )}
        </div>
    );
};

export default ClientList;
