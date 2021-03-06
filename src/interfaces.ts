import { IIdentifier, IKey, VerifiableCredential } from "@veramo/core";
import { ManagedPrivateKey } from "@veramo/key-manager";
import {
  SnapDIDStore,
  SnapKeyStore,
  SnapVCStore,
  SnapPrivateKeyStore,
} from "./veramo/plugins/snapDataStore/snapDataStore";

/**
 * MetaMask Wallet interface
 */
export interface Wallet {
  registerApiRequestHandler: (origin: unknown) => unknown;
  registerRpcMessageHandler: (origin: unknown) => unknown;
  request: (origin: any) => unknown;
  send(options: { method: string; params: unknown[] }): unknown;
  getAppKey(): Promise<string>;
}

/**
 * MetaMask State
 */
export interface State {
  /**
   * Other objects created by other Snaps
   */
  [snapStates: string]: any;
  /**
   * SSI Snap Object
   */
  ssiSnapState: SSISnapState;
}

/**
 * SSI Snap State
 */
export interface SSISnapStateRaw {
  /**
   * MetaMask Address: SSIAccountState object
   */
  [address: string]: SSIAccountState;
}

export type SSISnapState = SSISnapStateRaw & {
  /**
   * Configuration for SSISnap
   */
  config: SSISnapConfig;
};

export interface SSISnapConfig {
  /**
   * Type of store, 'snap' by default
   */
  store: string;
  /**
   * Infura token, used by Veramo agent.
   */
  infuraToken: string;
}

/**
 * SSI Snap State for a MetaMask address
 */
export interface SSIAccountState {
  /**
   * Store for {@link SnapPrivateKeyStore}
   */
  snapPrivateKeyStore: Record<string, ManagedPrivateKey>;
  /**
   * Store for {@link SnapKeyStore}
   */
  snapKeyStore: Record<string, IKey>;
  /**
   * Store for {@link SnapDIDStore}
   */
  identifiers: Record<string, IIdentifier>;
  /**
   * Store for {@link SnapVCStore}
   */
  vcs: VerifiableCredential[];
}

export interface Response {
  error?: string;
  data?: any;
}
