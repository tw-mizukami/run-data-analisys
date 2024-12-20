"use client"

import { createContext, useContext, useEffect, useState } from "react";

export type YAxisScale = {
    Data1: { Min: number; Max: number };
    Data2: { Min: number; Max: number };
    Data3: { Min: number; Max: number };
    Data4: { Min: number; Max: number };
    Data5: { Min: number; Max: number };
    Data6: { Min: number; Max: number };
    Data7: { Min: number; Max: number };
};

const initialState: YAxisScale = {
    Data1: { Min: 0, Max: 100 },
    Data2: { Min: 0, Max: 100 },
    Data3: { Min: 0, Max: 100 },
    Data4: { Min: 0, Max: 100 },
    Data5: { Min: 0, Max: 100 },
    Data6: { Min: 0, Max: 100 },
    Data7: { Min: 0, Max: 100 },
};

const YAxisScaleContext = createContext<{
    scale: YAxisScale;
    setScales: (key: keyof YAxisScale, value: { Min: number; Max: number }) => Promise<void>;
} | null>(null);

export const YAxisScaleProvider = ({
    children,
    lang,
}: {
    children: React.ReactNode;
    lang: string;
}) => {
    
    const [scale, setScaleInternal] = useState<YAxisScale>(initialState);

    useEffect(() => {
        const fetchInitialScale = async () => {
            try {
                const response = await fetch(`/${lang}/data-chart/api/yaxis-scale`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data: YAxisScale = await response.json();
                setScaleInternal(data);
            } catch (error) {
                console.error("Failed to fetch YAxis Scale", error);
            }
        };
        fetchInitialScale();
        
    }, [lang]);

    const setScales = async (key: keyof YAxisScale, value: { Min: number; Max: number }) => {
        const updatedScale = { ...scale, [key]: value };
        setScaleInternal(updatedScale);

        try {
            const response = await fetch(`/${lang}/data-chart/api/yaxis-scale`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedScale),
            });
            if (!response.ok) {
                throw new Error(`Http error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to update Yaxis scale state:", error);
        }
    };

    return (
        <YAxisScaleContext.Provider value={{ scale, setScales }}>
            {children}
        </YAxisScaleContext.Provider>
    );
};

export const useYAxisScale = () => {
    const context = useContext(YAxisScaleContext);
    if (!context) {
        throw new Error("useYAxisScale must be used within a YAxisScaleProvider")
    }
}