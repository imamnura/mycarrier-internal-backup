// context/DialogContext.jsx
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import DownloadAuthorization from '.';
import { setDialogApi } from './dialog-bridge';

const DialogContext = createContext(null);

export function ForbiddenProvider({ children }) {
  const [dialogState, setDialogState] = useState({ open: false, message: '' });

  const showDialog = useCallback((message = 'Forbidden download') => {
    setDialogState({ open: true, message });
  }, []);

  const hideDialog = useCallback(() => {
    setDialogState({ open: false, message: '' });
  }, []);

  // Register global (non-React) API for axios/util files
  useEffect(() => {
    setDialogApi({ show: showDialog, hide: hideDialog });
  }, [showDialog, hideDialog]);

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      {dialogState.open && (
        <DownloadAuthorization
          defaultOpen={dialogState.open}
          message={dialogState.message}
          onClose={hideDialog}
        />
      )}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used within a DialogProvider');
  return ctx;
}
