import * as React from 'react';
import { createContext, useReducer } from 'react';
import { initialState, AppState, reducers } from './state';
import { wrapAsync } from './wrapAsync';

type AppContextProviderProps = {
  children: React.ReactNode; // 👈️ added type for children
};

export interface AppContextState {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export const AppContext = createContext<AppContextState>({
  state: initialState,
  dispatch: (func: any, ...args: any) => undefined,
});

export const AppContextProvider: React.FC<AppContextProviderProps> = (
  props
) => {
  const [store, dispatch] = useReducer(reducers, initialState);

  return (
    <AppContext.Provider
      value={{
        state: store,
        dispatch: wrapAsync(dispatch),
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
