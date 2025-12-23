import { useState } from 'react';

function useModalService() {
  const [modalServiceMode, setModalServiceMode] = useState('add');
  const [showModalService, setShowModalService] = useState(false);
  const [modalProductConfig, setModalProductConfig] = useState();

  return {
    modalServiceMode,
    showModalService,
    setModalServiceMode,
    setShowModalService,
    modalProductConfig,
    setModalProductConfig,
  };
}

export default useModalService;
