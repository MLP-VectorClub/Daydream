import { createContext, useContext } from 'react';
import { noop } from 'lodash';

export const LayoutContext = createContext({ disabled: false, setLayoutDisabled: noop });

export const useLayout = () => useContext(LayoutContext);
