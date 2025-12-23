import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import {
  addProductToQuote,
  deleteFollowUp,
  getListActivity,
} from '../../../../_repositories/repositories';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useQueryParams from '@utils/hooks/useQueryParams';
import { useDetailData } from '../../../utils';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';

const useFormFollowUp = (props) => {
  const { variant } = props;
  const {
    query: { id: dashboardId },
  } = useRouter();
  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { queryParams, setQueryParams } = useQueryParams();
  const { data, fetchDetail, prerequisite } = useDetailData();
  const { setDocumentViewer } = useDocumentViewer();

  const tab = queryParams.followUp || 'activities';
  const setTab = (followUp) => setQueryParams({ followUp });

  const [categoryForm, _setCategoryForm] = useState({ open: false });
  const setCategoryForm = (val) => () => _setCategoryForm(val);

  const [pickupProductModal, _pickupProductModal] = useState({ open: false });
  const setPickupProductModal = (val) => () => _pickupProductModal(val);

  const [followUpForm, setFollowUpForm] = useState({
    open: false,
    type: '',
    formProps: { variant: 'add' },
  });

  const [listFollowUp, setListFollowUp] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  const fetchList = async () => {
    setLoadingTable(true);
    try {
      const result = await getListActivity(dashboardId, variant, tab);
      setListFollowUp(result?.data);
      setLoadingTable(false);
    } catch (error) {
      setListFollowUp([]);
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    if (['activities', 'notes', 'attachments'].includes(tab)) {
      fetchList();
    }
  }, [dashboardId, variant, tab]);

  const fetchDelete = (activityData) => async () => {
    const salesType =
      {
        valid: 'lead',
        qualify: 'lead',
        opportunity: 'opportunity',
        quote: 'quote',
      }[data?.status?.toLowerCase()] || 'lead';

    const _payload = {
      interestId: dashboardId,
      salesType,
      sc_activity_id: activityData?.sc_activity_id?.toString() || '',
      sc_note_id: activityData?.sc_note_id?.toString() || '',
      sc_attachment_id: activityData?.sc_attachment_id?.toString() || '',
      sc_product_id: activityData?.sc_product_id?.toString() || '',
      sc_contact_id: activityData?.sc_contact_id?.toString() || '',
    };
    const payload = cleanObject(_payload);

    setLoadingAlert();
    try {
      await deleteFollowUp(payload, tab.toLowerCase());
      await setSuccessAlert({
        message: `${tab} was successfully deleted`,
        // onClose: fetchDetail
      });

      if (['activities', 'notes', 'attachments'].includes(tab)) {
        fetchList();
      } else {
        fetchDetail();
      }
      closeConfirmation();
    } catch (e) {
      setFailedAlert({
        message:
          e.message || `Something went wrong when delete ${tab.toLowerCase()}`,
      });
      closeConfirmation();
    }
  };

  const onDeleteFollowUp = (activityData) => () => {
    setConfirmation({
      message: `Are you sure want to delete this ${tab.toLowerCase()}?`,
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchDelete(activityData) },
      ],
    });
  };

  const onEditFollowUp = (followUpData) => () => {
    let defaultValues;

    if (tab === 'product') {
      defaultValues = {
        autoQuote: followUpData?.autoQuote === 'Y',
        netPrice: followUpData?.netPrice,
        probability: parseInt(followUpData?.probability),
        product: {
          productId: followUpData?.productLine,
          productName: followUpData?.product,
        },
        productLine: followUpData?.productLine,
        quantity: followUpData?.quantity,
        revenue: followUpData?.revenue,
      };
    } else {
      defaultValues = {
        ...followUpData,
        due_date: moment(
          followUpData?.due_date,
          'DD/MM/YYYY hh:mm:ss',
        ).toJSON(),
        document: {
          data: {
            document_url: followUpData?.fileUrl,
            fileName: followUpData?.fileName,
            base64Encode: followUpData?.base64Encode, // waiting data from be
          },
          url: followUpData?.fileUrl,
          fileName: followUpData?.fileName,
        },
      };
    }
    setFollowUpForm({
      formProps: {
        defaultValues,
        id: {
          sc_activity_id: followUpData?.sc_activity_id?.toString() || '',
          sc_note_id: followUpData?.sc_note_id?.toString() || '',
          sc_attachment_id: followUpData?.sc_attachment_id?.toString() || '',
          sc_product_id: followUpData?.sc_product_id?.toString() || '',
          sc_contact_id: followUpData?.sc_contact_id?.toString() || '',
          scLineId: followUpData?.scLineId?.toString() || '',
        },
        variant: 'edit',
      },
      open: true,
      type: tab.toLowerCase(),
    });
  };

  const onPreviewDocument = (data) => (e) => {
    e?.stopPropagation();
    setDocumentViewer(data);
  };

  const onAddProductToQuote = async () => {
    setLoadingAlert();

    try {
      await addProductToQuote(dashboardId);
      await fetchDetail();
      setSuccessAlert({
        message: 'Successfully add product',
      });
    } catch (error) {
      setFailedAlert({
        message: error.message || 'Failed to add product',
      });
    }
  };

  return {
    categoryForm,
    dashboardId,
    data,
    fetchDelete,
    fetchDetail,
    followUpForm,
    onAddProductToQuote,
    onDeleteFollowUp,
    onEditFollowUp,
    onPreviewDocument,
    pickupProductModal,
    setCategoryForm,
    setFollowUpForm,
    setPickupProductModal,
    setTab,
    tab,
    prerequisite,
    listFollowUp,
    loadingTable,
    fetchList,
  };
};

export default useFormFollowUp;
