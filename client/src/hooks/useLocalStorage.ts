'use client'

import { useState, useCallback, useEffect } from "react";

export const useLocalStorage = (key: string, initialState: any) => {
  const restored = getStorage(key);  
  const [state, setState] = useState(restored ?? initialState);

  useEffect(
    () => {
      const restored = getStorage(key);

      if (restored) {
        setState((prevValue: any) => ({
          ...prevValue,
          ...restored,
        }));
      }
    },
    [key, initialState]
  );

  const updateState = useCallback(
    (updatedValue: any) => {
      setState((prevState: any) => {
        setStorage(key, {
          ...prevState,
          ...updatedValue
        });

        return {
          ...prevState,
          ...updatedValue
        }
      });
    },
    [key]
  );

  const update = useCallback(
    (name: string, updatedValue: any) => {
      updateState({
        [name]: updatedValue
      });
    },
    [updateState]
  );

  return {
    state,
    update
  }
}

export const setStorage = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export const getStorage = (key: string) => {
  let value = null;

  try {
    const result = window.localStorage.getItem(key);
    
    if (result) {
      value = JSON.parse(result);
    }

    return value;
  } catch (error) {
    console.log(error);
  }
}

export const removeStorage = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
}