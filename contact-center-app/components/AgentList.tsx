'use client';

import React from 'react';
import AgentCard from './AgentCard';

export interface Agent {
    id: number;
    name: string;
    status: string;
    waitTime: number;
}

interface AgentListProps {
    agents: Agent[];
}

const AgentList: React.FC<AgentListProps> = ({ agents }) => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            {agents.length > 0 ? (
                agents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                ))
            ) : (
                <p>No hay agentes disponibles.</p>
            )}
        </div>
    );
};

export default AgentList;
