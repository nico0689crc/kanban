'use client';

import { useMemo } from "react";
import { SettingsValueProps } from "../types";
import { SettingsContext } from "./SettingsContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEY_SETTINGS } from '@/config-global';

type SettingsProviderProps = {
  children: React.ReactNode,
  defaultSettings: SettingsValueProps
}

export const SettingsProvider = ({ children , defaultSettings } : SettingsProviderProps) => {
  const { state, update } = useLocalStorage(STORAGE_KEY_SETTINGS, defaultSettings);
  
  const memoizedValue = useMemo(() => ({
    ...state,
    onUpdate: update
  }), [state, update]);

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}