import { useCallback } from 'react';
import useScript from 'react-script-hook';

declare global {
  interface Window { fabra: FabraConnect; }
}

export interface FabraConnect {
  open: (linkToken: string) => void;
  close: () => void;
}

export type UseFabraConnectResponse = {
  open: (linkToken: string) => void;
  close: () => void;
};

export const useFabraConnect = (): UseFabraConnectResponse => {
  useScript({
    src: 'https://connect.fabra.io/initialize.js',
    checkForExisting: true,
  });

  const open = useCallback((linkToken: string) => {
    if (window.fabra) {
      window.fabra.open(linkToken);
    } else {

    }
  }, []);

  const close = () => {
    window.fabra.close();
  };

  return { open, close };
};