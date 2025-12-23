import { useEffect, useState } from 'react';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import { useForm } from 'react-hook-form';
import {
  updateStatus,
  deleteFilePurchase,
} from '@containers/Document/PurchaseOrder/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useQueryParams from '@utils/hooks/useQueryParams';
import { cleanObject } from '@utils/common';

const useActions = (props) => {
  const { content, setContent } = props;

  const { queryParams } = useQueryParams();
  const { id: orderNumber } = queryParams;

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const [additionalFile, setAdditionalFile] = useState([]);

  const { control, handleSubmit, formState, reset, setValue } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  useEffect(() => {
    //cek fileBakes not empty
    if (content?.data?.documentAttachment?.bakesFile?.length > 0) {
      setValue('bakes', {
        file: {
          path: `./${content?.data?.documentAttachment?.bakesFile?.[0]?.fileName}`,
          relativePath: `./${content?.data?.documentAttachment?.bakesFile?.[0]?.fileName}`,
          name: content?.data?.documentAttachment?.bakesFile?.[0]?.fileName,
          type: 'application/pdf',
        },
        data: {
          fileUrl: content?.data?.documentAttachment?.bakesFile?.[0]?.fileUrl,
          fileName: content?.data?.documentAttachment?.bakesFile?.[0]?.fileName,
        },
        url: content?.data?.documentAttachment?.bakesFile?.[0]?.fileUrl,
        fileName: content?.data?.documentAttachment?.bakesFile?.[0]?.fileName,
      });
    }

    return () => {
      reset();
    };
  }, [content]);

  const onCloseSuccess = () => window.location.reload();

  const uploadDocument = async ({ bakes, purchase, bakesNumber }) => {
    const payload = cleanObject({
      orderNumber,
      bakesNumber: bakesNumber,
      bakesFile: [
        {
          fileName: bakes.data.fileName,
          fileUrl: bakes.data.fileUrl,
        },
      ],
      purchaseOrderDocument: [
        {
          fileName: purchase.data.fileName,
          fileUrl: purchase.data.fileUrl,
        },
      ],
      additionalFile: [...additionalFile],
      productId: content?.productId,
      productFlow: content?.productFlow,
      status: content?.status,
    });

    setLoadingAlert();

    try {
      await updateStatus(orderNumber, payload);
      setSuccessAlert({
        message: 'Ownership change has been successfully approved',
        onClose: onCloseSuccess,
      });
    } catch {
      setFailedAlert({ message: 'Change ownership approval is failed' });
    }
  };

  const onSubmit = (v) => {
    uploadDocument(v);
    closeConfirmation();
  };

  const onClose = () => {
    setContent({ ...content, open: false });
    closeConfirmation();
  };

  const handleUpdateStatus = (values) => {
    const confirmation = {
      message: content?.confirmation,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: () => {
            onSubmit(values);
            setContent({ ...content, open: false });
          },
        },
      ],
    };

    setConfirmation(confirmation);
  };

  const onAddFileAdditional = async (data) => {
    const fileData = data?.data;
    let remappedProduct = [];

    if (additionalFile.length > 0) {
      const isAxist = additionalFile.some(
        ({ fileName }) => fileName === fileData?.fileName,
      );

      if (isAxist) {
        setFailedAlert({ message: 'File document already exists' });
        return;
      }
    }
    remappedProduct.push(fileData, ...additionalFile);
    setAdditionalFile(remappedProduct);
  };

  const fetchDeleteAdditionalFile = (fileName) => async () => {
    closeConfirmation();
    setLoadingAlert();
    try {
      const { success } = await deleteFilePurchase(fileName);
      if (success) {
        setSuccessAlert({ message: 'Document successfully deleted' });
        setAdditionalFile(
          additionalFile.filter((v) => v?.fileName !== fileName),
        );
      }
    } catch (error) {
      setFailedAlert({ message: error?.message });
    }
  };

  const onDeleteAdditionalFile = (fileName) => () => {
    setConfirmation({
      message: 'Are you sure want to delete this document?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: fetchDeleteAdditionalFile(fileName) },
      ],
    });
  };

  return {
    control,
    formState,
    handleSubmit,
    handleUpdateStatus,
    onClose,
    onSubmit,
    onAddFileAdditional,
    additionalFile,
    onDeleteAdditionalFile,
  };
};

export default useActions;
