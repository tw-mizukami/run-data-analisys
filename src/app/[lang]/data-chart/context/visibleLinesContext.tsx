"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type VisibleLinesState = {
  Data1: boolean;
  Data2: boolean;
  Data3: boolean;
  Data4: boolean;
  Data5: boolean;
  Data6: boolean;
  Data7: boolean;
};

const initialState: VisibleLinesState = {
  Data1: true,
  Data2: true,
  Data3: true,
  Data4: true,
  Data5: true,
  Data6: true,
  Data7: true,
};

const VisibleLinesContext = createContext<{
  states: VisibleLinesState;
  setStates: (key: keyof VisibleLinesState, value: boolean) => Promise<void>;
} | null>(null);

export const VisibleLinesProvider = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) => {
  
  const [states, setStatesInternal] = useState<VisibleLinesState>(initialState);

  useEffect(() => {
    const fetchInitialStates = async () => {
      try {
        const response = await fetch(`/${lang}/data-chart/api/visible-line`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: VisibleLinesState = await response.json();
        setStatesInternal(data);
      } catch (error) {
        console.error("Failed to fetch visible lines state:", error);
      }
    };
    fetchInitialStates();
  }, [lang]);

  const setStates = async (key: keyof VisibleLinesState, value: boolean) => {
    const updatedStates = { ...states, [key]: value };
    setStatesInternal(updatedStates);

    try {
        const response = await fetch(`/${lang}/data-chart/api/visible-line`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStates),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to update visible lines state:", error);
    }
  };

  return (
    <VisibleLinesContext.Provider value={{ states, setStates }}>
      {children}
    </VisibleLinesContext.Provider>
  );
};

export const useVisibleLines = () => {
  const context = useContext(VisibleLinesContext);
  if (!context) {
    throw new Error("useVisibleLines must be used within a VisibleLinesProvider");
  }
  return context;
};
