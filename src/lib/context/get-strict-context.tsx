import React from "react";

export interface StrictContextProviderProps<T> {
  value: T;
  children: React.ReactNode;
}

export type StrictContextProvider<T> = React.FC<StrictContextProviderProps<T>>;

export type StrictContextHook<T> = () => T;

function getStrictContext<T>(
  name?: string
): [StrictContextProvider<T>, StrictContextHook<T>] {
  const Context = React.createContext<T | undefined>(undefined);

  const Provider: StrictContextProvider<T> = ({ value, children }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  const useSafeContext: StrictContextHook<T> = () => {
    const ctx = React.useContext(Context);
    if (ctx === undefined) {
      throw new Error(`useContext must be used within ${name ?? "a Provider"}`);
    }
    return ctx;
  };

  return [Provider, useSafeContext];
}

export { getStrictContext };
