'use client';

import React from 'react';
import { Client } from './ClientList';
import { formatSeconds } from '@/utils/helpers';

interface ClientCardProps {
    client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
    return (
        <div className='border rounded-md p-3 bg-white/5 hover:bg-white/10 duration-150'>
            <h3 className='font-semibold'>{client.name}</h3>
            <p className='font-light text-gray-300'>Tiempo en espera: <span className='text-white font-medium'>{formatSeconds(client.waitTime)}</span> segundos</p>
        </div>
    );
};

export default ClientCard;
