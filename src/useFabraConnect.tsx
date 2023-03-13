import { useCallback } from 'react';
import useScript from 'react-script-hook';

declare global {
  interface Window { fabra: FabraConnect; }
}

export interface FabraConnectOptions {
  customTheme?: CustomTheme;
}

export interface CustomTheme {
  colors?: {
    primary?: {
      base?: string; // Primary theme color
      hover?: string; // Color when hovering over primary buttons
      text?: string; // Text color on top of the primary color
    };
  };
}

export interface FabraConnect {
  initialize: (options?: FabraConnectOptions) => Promise<void>;
  open: (linkToken: string) => void;
  close: () => void;
}


export type UseFabraConnectResponse = {
  open: (linkToken: string) => void;
  close: () => void;
};

export const useFabraConnect = (options?: FabraConnectOptions): UseFabraConnectResponse => {
  const initFabra = useCallback(async () => {
    await window.fabra.initialize(
      options,
    );
  }, [options]);

  useScript({
    src: 'https://connect.fabra.io/initialize.js',
    checkForExisting: true,
    onload: () => {
      initFabra();
    }
  });

  const open = useCallback((linkToken: string) => {
    if (window.fabra) {
      window.fabra.open(linkToken);
    }
  }, []);

  const close = () => {
    window.fabra.close();
  };

  return {
    open,
    close,
  };
};