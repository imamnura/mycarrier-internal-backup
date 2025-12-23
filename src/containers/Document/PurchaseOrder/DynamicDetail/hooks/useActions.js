import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetail,
  updateStatus,
  sendReminder,
  getListPICInternal,
} from '@containers/Document/PurchaseOrder/_repositories/repositories';
import {
  cleanObject,
  getFileInformation,
  isHaveAccess,
  isPreviewable,
} from '@utils/common';
import useQueryParams from '@utils/hooks/useQueryParams';
import actionsTrial from './Trial/useActions';
import actionsTrialSmarthand from './Trial/Smarthand/useActions';
import actionsTrialNeucloud from './Trial/Neucloud/useActions';
import actionsFABProduct from './NewOrder/FAB/Product/useActions';
import actionsFABProductWithoutBaso from './NewOrder/FAB/ProductWithoutBaso/useActions';
import actionsFABSolution from './NewOrder/FAB/Solution/useActions';
import actionsFABSolutionWithoutAccess from './NewOrder/FAB/SolutionWithoutAccess/useActions';
import actionsNCXIntegration from './NewOrder/NCX/Integration/useActions';
import actionsNCXProduct from './NewOrder/NCX/Product/useActions';
import actionsMsight from './NewOrder/Others/Msight/useActions';
import actionsNeucloud from './NewOrder/Others/Neucloud/useActions';
import actionsModifyDisconnect from './ModifyDisconnect/useActions';
import { currencyToNumber } from '@utils/parser';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { useRouter } from 'next/router';

const useAction = (props) => {
  const { feature } = props;

  const { queryParams } = useQueryParams();
  const { id: orderNumber } = queryParams;
  const router = useRouter();

  const { setFailedAlert, setLoadingAlert, setSuccessAlert, onCloseAlert } =
    usePopupAlert();

  const { setDocumentViewer } = useDocumentViewer();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const [modalUploadBaso, setModalUploadBaso] = useState(null);
  const [modalBasoApproval, setModalBasoApproval] = useState(null);
  const [modalDiscount, setModalDiscount] = useState(null);
  const [modalBakes, setModalBakes] = useState(null);
  const [modalUploadEvidence, setModalUploadEvidence] = useState(null);
  const [progress, setProgress] = useState(null);
  const [modalPartner, setModalPartner] = useState(null);
  const [showOptionsPICSegment, setShowOptionsPICSegment] = useState(false);
  const [dataPICInternal, setDataPICInternal] = useState([]);
  const [modalDocumentOwnership, setModalDocumentOwnership] = useState(null);

  const orderId = data?.orderInformation?.orderId;
  const orderType = data?.orderInformation?.orderType?.toLowerCase();
  const productFlow = data?.productFlow?.toLowerCase();
  const productName = data?.orderInformation?.product?.toLowerCase();

  const onCloseSuccess = () => () => fetchDetail(orderId);
  const onClickContactHelpdesk = () => {
    const whatsAppHelpDesk = '6282188885448';
    const messageHelpDesk = `PO saya untuk customer ${data?.orderInformation?.customer} tidak bisa diproses karena partnerID tidak ditemukan. Mohon bantuan untuk diproses lebih lanjut`;
    const encodedMessage = encodeURIComponent(messageHelpDesk);

    window.open(
      `https://wa.me/${whatsAppHelpDesk}?text=${encodedMessage}`,
      '_blank',
    );
    onCloseAlert();
  };

  const fetchDetail = async (id) => {
    setLoading(true);
    try {
      const { data: res } = await getDetail(id);

      setData(res);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchPICInternal = async (type) => {
    const payload = {
      type,
      size: 1000,
    };
    try {
      const { data } = await getListPICInternal(payload);
      setDataPICInternal(data);
    } catch (error) {
      setDataPICInternal([]);
    }
  };

  const fetchUpdateStatus = async (values, content) => {
    const payload = cleanObject({
      ...values,
      accountBalance: currencyToNumber(values?.accountBalance) + '',
      status: content?.status,
      statusOrderItem: content?.statusOrderItem,
      productFlow: data?.productFlow,
      productId: data?.productId,
    });

    try {
      setLoadingAlert();
      await updateStatus(orderNumber, payload);
      setSuccessAlert({
        message: content?.success,
        onClose: onCloseSuccess(),
      });
    } catch (e) {
      if (e?.message.toLowerCase().includes('partner id')) {
        setFailedAlert({
          variant: 'noResult',
          message: e?.message,
          customAction: [
            {
              label: 'Cancel',
              onClick: onCloseAlert,
              variant: 'ghost',
              mr: 8,
            },
            {
              label: 'Contact Helpdesk',
              onClick: onClickContactHelpdesk,
            },
          ],
        });
      } else {
        setFailedAlert({
          message: e?.message ?? 'Failed to Update Data',
        });
      }
    }
  };

  useEffect(() => {
    if (orderNumber) {
      if (isHaveAccess(feature, 'read_detail')) {
        fetchDetail(orderNumber);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
  }, [orderNumber]);

  useEffect(() => {
    if (
      data?.status === 'delivery approval' ||
      data?.status === 'segment approval'
    ) {
      const type =
        data?.status === 'delivery approval'
          ? 'delivery manager'
          : 'segment manager';
      fetchPICInternal(type);
    }
  }, [data]);

  const onPreviewWorklog =
    ({ fileName, fileUrl }) =>
    () => {
      const { name, extension } = getFileInformation(fileUrl);

      if (isPreviewable(extension)) {
        setDocumentViewer({
          title: fileName || name,
          url: fileUrl,
        });
      } else {
        window.open(fileUrl);
      }
    };

  const [timeLeftDone, _setTimeLeftDone] = useState(false);

  const setTimeLeftDone = () => {
    _setTimeLeftDone(true);
  };

  const selectActions = () => {
    const actionsProps = {
      ...props,
      data,
      fetchUpdateStatus,
      setModalBakes,
      setModalDiscount,
      setModalUploadBaso,
      setModalUpdateStatus,
      setModalUploadEvidence,
      setModalPartner,
      fetchSendReminder,
      timeLeftDone,
      setTimeLeftDone,
      showOptionsPICSegment,
      setShowOptionsPICSegment,
      dataPICInternal,
      modalDocumentOwnership,
      setModalDocumentOwnership,
    };

    const actionsMapping = {
      trial: {
        others: {
          'smart hand neucentrix': actionsTrialSmarthand,
          'neucloud elastica': actionsTrialNeucloud,
          others: actionsTrial,
        },
      },
      'new order': {
        'fabd product': {
          others: actionsFABProduct,
        },
        'fabd product (without baso)': { others: actionsFABProductWithoutBaso },
        'fabd solution': { others: actionsFABSolution },
        'fabd solution (without partner access)': {
          others: actionsFABSolutionWithoutAccess,
        },
        'ncx product': { others: actionsNCXProduct },
        'ncx product integration': { others: actionsNCXIntegration },
        others: {
          msight: actionsMsight,
          'neucloud elastica': actionsNeucloud,
        },
      },
      'change ownership': {
        'fabd product': {
          others: actionsFABProduct,
        },
        'fabd product (without baso)': { others: actionsFABProductWithoutBaso },
        'fabd solution': { others: actionsFABSolution },
        'fabd solution (without partner access)': {
          others: actionsFABSolutionWithoutAccess,
        },
        'ncx product': { others: actionsNCXProduct },
        'ncx product integration': { others: actionsNCXIntegration },
        others: {
          msight: actionsMsight,
          'neucloud elastica': actionsNeucloud,
        },
      },
      disconnect: {
        others: {
          others: actionsModifyDisconnect,
        },
      },
      modify: {
        others: {
          others: actionsModifyDisconnect,
        },
      },
    };

    const orderTypeMapping =
      actionsMapping[orderType] ?? actionsMapping['others'];
    if (orderTypeMapping) {
      const productFlowMapping =
        orderTypeMapping[productFlow] ?? orderTypeMapping['others'];
      if (productFlowMapping) {
        const productNameMapping =
          productFlowMapping[productName] ?? productFlowMapping['others'];
        if (productNameMapping) {
          return productNameMapping(actionsProps);
        }
      }
    }
    return { action: () => [] };
  };

  const fetchSendReminder = async () => {
    try {
      setLoadingAlert();
      const { success, message } = await sendReminder({ orderNumber });
      success &&
        setSuccessAlert({
          message: message ?? 'Reminder successfully Sent!',
          onClose: () => router.reload(),
        });
    } catch (e) {
      setFailedAlert({
        message: e?.message ?? 'Failed to Send Reminder',
      });
    }
  };

  return {
    orderNumber,
    data,
    loading,
    modalUpdateStatus,
    fetchUpdateStatus,
    setModalUpdateStatus,
    modalUploadBaso,
    setModalUploadBaso,
    modalBasoApproval,
    setModalBasoApproval,
    setProgress,
    progress,
    modalDiscount,
    setModalDiscount,
    modalUploadEvidence,
    setModalUploadEvidence,
    modalBakes,
    setModalBakes,
    ...selectActions(),
    modalPartner,
    setModalPartner,
    onPreviewWorklog,
    fetchSendReminder,
    timeLeftDone,
    setTimeLeftDone,
    onCloseSuccess,
    router,
    modalDocumentOwnership,
    setModalDocumentOwnership,
  };
};

export default useAction;
