'use client';

import React, { useEffect, useState } from 'react';
import ClientList from '../../components/ClientList';
import Filter from '../../components/Filter';
import { useClients } from '../../hooks/useClients';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ClientsPage() {
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState(searchParams.get('waitTime') || '');
    const { clients, fetchClients } = useClients();

    useEffect(() => {
        fetchClients(filter);
    }, [filter, fetchClients]);

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <main className="flex flex-col gap-5 items-center justify-center w-full max-w-lg px-3 sm:p-0">
                <div className='flex justify-between gap-2 w-full'>
                    <h1 className='font-semibold text-2xl w-full'>Clientes en Espera</h1>
                    <Link className='bg-white text-black font-medium rounded-md py-1 px-2.5 duration-150' href="/agents">Agentes</Link>
                </div>
                <Filter
                    label="Filtrar por tiempo de espera"
                    options={['', 'short', 'medium', 'long']}
                    value={filter}
                    onChange={handleFilterChange}
                />
                <ClientList clients={clients} />
            </main>
        </div>
    );
}
