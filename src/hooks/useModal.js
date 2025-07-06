import { useState, useCallback } from 'react';

export function useModal(initialState = false) {
  const [visible, setVisible] = useState(initialState);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const toggleModal = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  return {
    visible,
    openModal,
    closeModal,
    toggleModal,
  };
}
