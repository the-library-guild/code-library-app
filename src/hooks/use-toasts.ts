import React from 'react';

import { useToast, UseToastOptions } from '@chakra-ui/react';

export function useToasts() {
  const toast = useToast();

  return React.useMemo(() => {
    const showToast = (options: UseToastOptions | undefined) => {
      toast({
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        variant: 'solid',
        ...options,
      });
    };
    const showError = (options: UseToastOptions | undefined) => {
      showToast({ ...options, status: 'error' });
    };
    const showWarning = (options: UseToastOptions | undefined) => {
      showToast({ ...options, status: 'warning' });
    };
    const showSuccess = (options: UseToastOptions | undefined) => {
      showToast({ ...options, status: 'success' });
    };
    const showInfo = (options: UseToastOptions | undefined) => {
      showToast({ ...options, status: 'info' });
    };
    return {
      showToast,
      toastControls: toast,
      showError,
      showWarning,
      showSuccess,
      showInfo,
    };
  }, [toast]);
}
