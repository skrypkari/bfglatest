// context/DataProvider.tsx
'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Определение интерфейса для данных
interface DataContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Создание контекста
const DataContext = createContext<DataContextType | undefined>(undefined);

// Создание провайдера
const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <DataContext.Provider value={{ open, setOpen }}>
            {children}
        </DataContext.Provider>
    );
};

const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export { DataProvider, useData };
