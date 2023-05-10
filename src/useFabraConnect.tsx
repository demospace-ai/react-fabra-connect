import { useCallback } from 'react';
import useScript from 'react-script-hook';

declare global {
  interface Window { fabra: FabraConnect; }
}

export interface FabraConnectOptions {
  customTheme?: CustomTheme;
  containerID?: string;
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
  reattach: (containerID: string) => void;
  destroy: () => void;
}

export type UseFabraConnectResponse = {
  open: (linkToken: string) => void;
  close: () => void;
  reattach: (containerID: string) => void;
  destroy: () => void;
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

  const close = useCallback(() => {
    if (window.fabra) {
      window.fabra.close();
    }
  }, []);

  const reattach = useCallback((containerID: string) => {
    if (window.fabra) {
      window.fabra.reattach(containerID);
    }
  }, []);

  const destroy = useCallback(() => {
    if (window.fabra) {
      window.fabra.destroy();
    }
  }, []);

  return {
    open,
    close,
    reattach,
    destroy,
  };
};
