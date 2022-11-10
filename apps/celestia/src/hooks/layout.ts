import { createContext, useContext } from 'react';
import { noop } from 'lodash';

export interface LayoutContextValue {
  disabled: boolean;
  setLayoutDisabled: (disabled: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue>({
  disabled: false,
  setLayoutDisabled: noop,
});

export const LayoutContextProvider = LayoutContext.Provider;
export const useLayout = () => useContext(LayoutContext);
