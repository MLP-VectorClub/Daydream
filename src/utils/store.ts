import { isClientSide } from 'src/utils/common';

/**
 * @returns The state slice for the current rendering location (server or client)
 */
export const renderingStateSlice = <MS, S extends { client: MS, server: MS }>(state: S): S['client'] | S['server'] =>
  (isClientSide ? state.client : state.server);
