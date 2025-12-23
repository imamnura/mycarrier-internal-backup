import { postFileBasoWithQr } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useState } from 'react';

const useAction = (props) => {
  const {
    setStep,
    onClose,
    content,
    orderNumber,
    signatures,
    // form
    onCloseSuccess,
  } = props;
  const [approved, setApproved] = useState(false);

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();

  const handleApproved = () => {
    setApproved(!approved);
  };

  const fetchFileBasoWithQr = async () => {
    setLoadingAlert();
    const pageContainer = document.getElementById(
      `page-container-${signatures.page}`,
    );
    if (!pageContainer) return;
    const rect = pageContainer.getBoundingClientRect();
    const wrapper = document.getElementById('wrapper-doc');
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const offsetLeft = Math.round((wrapperRect.width - rect.width) / 2);

    const normalizePadding = 16 * (signatures.page - 1);
    const normalizeHeight = rect.height * (signatures.page - 1);

    try {
      const payload = cleanObject({
        // ...form,
        orderNumber,
        baso: content?.baso,
        qrCode: {
          ...content?.qrCode,
          height: signatures?.height,
          width: signatures?.height,
          page: signatures.page - 1,
          approvedAt: `Approved at ${signatures?.approved}`,
          coordinate: {
            x: Math.round(signatures?.x - offsetLeft),
            y: Math.round(
              (signatures?.y || 0) - normalizePadding - normalizeHeight - 24,
            ),
          },
        },
      });

      await postFileBasoWithQr(payload);
      setSuccessAlert({
        message: 'Document successfully approved',
        onClose: () => {
          onClose();
          onCloseSuccess();
        },
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    } finally {
      closeConfirmation();
    }
  };

  const onSubmit = () => {
    setConfirmation({
      message: 'Are you sure want to approve this document?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchFileBasoWithQr },
      ],
    });
  };

  const onBackStep = () => {
    setStep(1);
  };

  const isSubmitDisabled = () => {
    return !approved;
  };

  return {
    approved,
    onClose,
    handleApproved,
    onBackStep,
    onSubmit,
    isSubmitDisabled,
  };
};

export default useAction;
