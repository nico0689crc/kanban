'use client';

import { useMemo } from "react";
import { SettingsValueProps } from "../types";
import { SettingsContext } from "./settings-context";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const STORAGE_KEY = "settings_kanban";

type SettingsProviderProps = {
  children: React.ReactNode,
  defaultSettings: SettingsValueProps
}

export const SettingsProvider = ({ children , defaultSettings } : SettingsProviderProps) => {
  const { state, update } = useLocalStorage(STORAGE_KEY, defaultSettings);
  
  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update
    }),
    [state, update]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}