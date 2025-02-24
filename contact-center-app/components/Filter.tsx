'use client';

import React from 'react';

interface FilterProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ label, options, value, onChange }) => {
    return (
        <div className='border-b pb-2 w-full'>
            <label className='flex justify-between items-center'>
                {label}:{' '}
                <select value={value} onChange={(e) => onChange(e.target.value)} className='ms-2 bg-neutral-950 border rounded-md py-1'>
                    {options.map((opt, index) => (
                        <option className='bg-black' key={index} value={opt}>
                            {opt ? opt : 'Todos'}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default Filter;
