"use client";

import { createContext, useContext, useState } from "react";

const ModeContext = createContext();

export function ModeProvider({ children }) {
  const [mode, setMode] = useState("offshore");
  const [simulationMode, setSimulationMode] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const value = {
    mode,
    setMode,
    simulationMode,
    setSimulationMode,
    demoMode,
    setDemoMode,
  };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}
