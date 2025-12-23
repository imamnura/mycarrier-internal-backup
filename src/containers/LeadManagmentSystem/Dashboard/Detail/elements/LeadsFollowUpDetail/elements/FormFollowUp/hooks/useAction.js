import { useMemo } from 'react';
import Activity from '../elements/Activity';
import Attachment from '../elements/Attachment';
import Note from '../elements/Note';
import Contact from '../elements/Contact';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { cleanObject } from '@utils/common';
import { pickMessageFollowUp } from '../utils';
import { submitFollowUp } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';
import Product from '../elements/Product';

const useAction = (props) => {
  const {
    categoryForm,
    dashboardId,
    fetchDetail,
    followUpForm,
    onCloseCategory,
    setFollowUpForm,
    status,
    fetchList,
    tab,
  } = props;

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const onSubmitCategory = (category) => {
    onCloseCategory();
    setFollowUpForm({
      open: true,
      type: category,
      formProps: { variant: 'add' },
    });
  };

  const Empty = () => null;

  const Form = useMemo(() => {
    const res = {
      activities: Activity,
      notes: Note,
      attachments: Attachment,
      contact: Contact,
      product: Product,
    }[followUpForm.type];

    // const Empty = () => null;

    return res || Empty;
  }, [followUpForm.type]);

  const onCloseFollowUp = () =>
    setFollowUpForm({ open: false, type: '', formProps: { variant: 'add' } });

  const fetchSubmit = (params) => async () => {
    setLoadingAlert();

    let salesType = 'lead';

    if (['product', 'contact'].includes(followUpForm.type)) {
      salesType = '';
    } else if (status?.toLowerCase() === 'opportunity') {
      salesType = 'opportunity';
    } else if (status?.toLowerCase() === 'quote') {
      salesType = 'quote';
    }

    const _payload = {
      interestId: dashboardId,
      salesType,
      ...params,
      ...followUpForm.formProps.id, // edit only
    };

    const payload = cleanObject(_payload);

    try {
      const result = await submitFollowUp(
        payload,
        followUpForm.type,
        followUpForm.formProps.variant,
      );
      const { success } = result;

      if (success) {
        setSuccessAlert({
          message: pickMessageFollowUp(
            followUpForm.type,
            followUpForm.formProps.variant,
          ).successMessage,
        });
        // fetchDetail();
        if (['activities', 'notes', 'attachments'].includes(tab)) {
          fetchList();
        } else {
          fetchDetail();
        }
      }

      onCloseCategory();
      setFollowUpForm({ open: false, type: '', formProps: { variant: 'add' } });
      closeConfirmation();
    } catch (e) {
      setFailedAlert({
        message:
          typeof e.message === 'string'
            ? e.message
            : `Something went wrong when ${
                followUpForm.formProps.variant === 'edit' ? 'update' : 'add'
              } ${followUpForm.type}`,
      });
      onCloseCategory();
      setFollowUpForm({ open: false, type: '', formProps: { variant: 'add' } });
      closeConfirmation();
    }
  };

  const onSubmitFollowUp = (value) => {
    setConfirmation({
      message: pickMessageFollowUp(
        followUpForm.type,
        followUpForm.formProps.variant,
      ).confirmMessage,
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchSubmit(value) },
      ],
    });
  };

  return {
    categoryForm,
    followUpForm,
    Form,
    onCloseCategory,
    onCloseFollowUp,
    onSubmitCategory,
    onSubmitFollowUp,
    status,
    fetchSubmit,
    Empty,
  };
};

export default useAction;
