import { useCallback, useState } from 'react';
import useScript from 'react-script-hook';

declare global {
  interface Window { fabra: FabraConnect; }
}

export interface CustomTheme {
  colors?: {
    primary: {
      base: string; // Primary theme color
      hover: string; // Color when hovering over primary buttons
      text: string; // Text color on top of the primary color
    }
  }
}

export interface FabraConnect {
  initialize: ({  customTheme} : {  customTheme?: CustomTheme }) => Promise<void>;
  open: (linkToken: string) => void;
  close: () => void;
}


export type UseFabraConnectResponse = {
  open: (linkToken: string, customTheme?: CustomTheme) => void;
  close: () => void;
};

export const useFabraConnect = ({ linkToken, customTheme } :{ linkToken: string, customTheme?: CustomTheme}): UseFabraConnectResponse => {
  const [isFabraReady, setIsFabraReady] = useState<boolean>(false)

  const initFabra = useCallback(async () => {
    await window.fabra.initialize({
      customTheme,
    });
    
    setIsFabraReady(true);
  }, [linkToken, customTheme])


  useScript({
    src: 'https://connect.fabra.io/initialize.js',
    checkForExisting: true,
    onload: () => {
      initFabra()
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
    // isReady: isFabraReady, // Can expose this if needed for loading states. Plaid does this for example.
  };
};