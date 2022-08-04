import { IS_CLIENT_SIDE } from 'src/config';

/**
 * @returns The state slice for the current rendering location (server or client)
 */
export const renderingStateSlice = <MirroredState>(state: { client?: MirroredState; server: MirroredState }): MirroredState =>
  IS_CLIENT_SIDE && state.client ? state.client : state.server;
