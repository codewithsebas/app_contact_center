'use client';

import React, { createContext, useState } from 'react';
import { Agent } from '../components/AgentList';

interface AgentsContextType {
    agents: Agent[];
    setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
    updateAgent: (updatedAgent: Agent) => void;
}

export const AgentsContext = createContext<AgentsContextType | undefined>(undefined);

export const AgentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [agents, setAgents] = useState<Agent[]>([]);

    const updateAgent = (updatedAgent: Agent) => {
        setAgents((prevAgents) =>
            prevAgents.map((agent) =>
                agent.id === updatedAgent.id ? updatedAgent : agent
            )
        );
    };

    return (
        <AgentsContext.Provider value={{ agents, setAgents, updateAgent }}>
            {children}
        </AgentsContext.Provider>
    );
};
