'use client';

import React from 'react';
import { Agent } from './AgentList';
import { formatSeconds } from '@/utils/helpers';

interface AgentCardProps {
    agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
    return (
        <div className='border rounded-md p-3 bg-white/5 hover:bg-white/10 duration-150'>
            <h3 className='font-semibold'>{agent.name}</h3>
            <p>Estado: {agent.status}</p>
            <p className='font-light text-gray-300'>Tiempo en espera: <span className='text-white font-medium'>{formatSeconds(agent.waitTime)}</span> segundos</p>
        </div>
    );
};

export default AgentCard;
