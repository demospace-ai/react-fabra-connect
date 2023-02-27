import { useCallback } from 'react';
import useScript from 'react-script-hook';

declare global {
  interface Window { fabra: any; }
}

export const useFabraConnect = (): { open: (linkToken: string) => void; close: () => void; } => {
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