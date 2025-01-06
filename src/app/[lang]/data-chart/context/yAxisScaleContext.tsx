"use client"

import { createContext, useContext, useEffect, useState } from "react";

export type YAxisScale = {
    Data1: { min: number; max: number; isAuto: boolean; sliderMin: number; sliderMax: number; sliderStep: number }
    Data2: { min: number; max: number; isAuto: boolean; sliderMin: number; sliderMax: number; sliderStep: number }
    Data3: { min: number; max: number; isAuto: boolean; sliderMin: number; sliderMax: number; sliderStep: number }
    Data4: { min: number; max: number; isAuto: boolean; sliderMin: number; sliderMax: number; sliderStep: number }
    Data5: { min: number; max: number; isAuto: boolean; sliderMin: number; sliderMax: number; sliderStep: number }
    Data6: { min: number; max: number; isAuto: boolean; sliderMin: number; sliderMax: number; sliderStep: number }
    Data7: { min: number; max: number; isAuto: boolean; sliderMin: number; sliderMax: number; sliderStep: number }
    Data8: { min: number; max: number; isAuto: boolean; sliderMin: number; sliderMax: number; sliderStep: number }
};

const initialState: YAxisScale = {
    Data1: { min: 0, max: 10000, isAuto: true, sliderMin: 0, sliderMax: 20000, sliderStep: 1000 },
    Data2: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
    Data3: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
    Data4: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
    Data5: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
    Data6: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
    Data7: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
    Data8: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
};

const YAxisScaleContext = createContext<{
    scale: YAxisScale;
    setScales: (key: keyof YAxisScale, isAuto: boolean, value?: { min: number; max: number }) => Promise<void>;
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
        
    }, []);

    const setScales = async (key: keyof YAxisScale, isAuto: boolean, value?: { min: number; max: number }) => {
        const updatedScale = {
        ...scale,
        [key]: {
            ...scale[key], // 既存のプロパティを保持
            isAuto,
            ...(value || {}),
        },
    };
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
    return context;
}