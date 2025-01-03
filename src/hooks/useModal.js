import { useState, useCallback } from 'react';

// Funktion zum Umschalten des Modals
export function useModal() {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  return { showModal, handleToggleModal };
}