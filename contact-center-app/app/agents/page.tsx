'use client';

import React, { useEffect, useState } from 'react';
import AgentList from '../../components/AgentList';
import Filter from '../../components/Filter';
import { useAgents } from '../../hooks/useAgents';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AgentsPage() {
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState(searchParams.get('status') || '');
    const { agents, fetchAgents } = useAgents();

    useEffect(() => {
        fetchAgents(filter);
    }, [filter, fetchAgents]);

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    return (

        <div className="flex items-center justify-center min-h-screen w-full">
            <main className="flex flex-col gap-5 items-center justify-center w-full max-w-lg px-3 sm:p-0">
                <div className='flex justify-between gap-2 w-full'>
                    <h1 className='font-semibold text-2xl w-full'>Agentes</h1>
                    <Link className='bg-white text-black font-medium rounded-md py-1 px-2.5 duration-150' href="/clients">Clientes</Link>
                </div>
                <Filter
                    label="Filtrar por estado"
                    options={['', 'Disponible', 'En llamada', 'En pausa']}
                    value={filter}
                    onChange={handleFilterChange}
                />
                <AgentList agents={agents} />
            </main>
        </div>
    );
}
