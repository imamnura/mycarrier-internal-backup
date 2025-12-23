import {
  fetchApproveTicket,
  postUploadCloseTicket,
  rejectTicket,
} from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
// import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { array, object, string } from 'yup';

const useActionCdnaas = ({ fetchDetail }) => {
  const router = useRouter();
  const {
    query: { id: referenceId },
  } = router;

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  // const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const [modalBaseAction, setModalBaseAction] = useState(null);
  const [modalValidate, setModalValidate] = useState(false);
  const [modalReport, setModalReport] = useState(false);
  const [modalSolve, setModalSolve] = useState(false);

  const fetchUpdateTicket = async (values, utils) => {
    setLoadingAlert();

    const payload = cleanObject({
      action: utils?.action === 'reject' ? '' : utils?.action,
      referenceId,
      ...values,
      evidence:
        utils?.action === 'return'
          ? values?.evidence &&
            values?.evidence?.map(({ data: { fileName, fileUrl } }) => ({
              fileName,
              fileUrl,
            }))
          : '',
    });

    const action =
      utils?.action === 'reject' ? rejectTicket : fetchApproveTicket;

    try {
      await action(payload);
      setSuccessAlert({
        message: utils.success,
        onClose: fetchDetail,
      });
    } catch (err) {
      setFailedAlert({
        message:
          err?.message ||
          utils?.errorMessage ||
          `Failed to Update CDNaaS ticket`,
      });
    }
  };

  // const onEscalate = () => {
  //   const confirmation = {
  //     message: 'Are you sure want to escalate this issue?',
  //     action: [
  //       { children: 'No', variant: 'ghost', onClick: closeConfirmation },
  //       {
  //         children: 'Yes',
  //         onClick: () => {
  //           fetchUpdateTicket(
  //             {},
  //             {
  //               success: 'Ticket succesfully escalated',
  //               errorMessage: 'Failed to escalate this ticket',
  //               action: 'escalate',
  //             },
  //           );
  //           closeConfirmation();
  //         },
  //       },
  //     ],
  //   };

  //   setConfirmation(confirmation);
  // };

  const actionSchema = {
    reject: {
      schema: [
        {
          name: 'note',
          label: 'Please describe the reason..',
          maxLength: 1000,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        note: string().required().label('Note'),
      },
      open: true,
      caption:
        'Once you rejected this, it will be process and data will be sent to customer automatically.',
      action: 'reject',
      success: 'CDNaaS ticket successfully rejected',
      errorMessage: 'Failed to reject ticket',
      title: 'Please give note of reject',
      confirmation: 'Are you sure want to reject this ticket?',
    },
    escalate: {
      schema: [
        {
          name: 'note',
          label: 'Please describe the note..',
          maxLength: 1000,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        note: string().required().label('Note'),
      },
      open: true,
      caption:
        'Once you give the note, it will be process and data will be sent to customer automatically.',
      action: 'escalate',
      success: 'Ticket succesfully escalated',
      errorMessage: 'Failed to escalate this ticket',
      title: 'Please give note of escalate',
      confirmation: 'Are you sure want to escalate this issue?',
    },

    return: {
      schema: [
        {
          type: 'textArea',
          name: 'noteForInternal',
          label: 'Note For Internal',
          placeholder: 'Input note for internal',
          required: true,
          rows: 3,
        },
        {
          type: 'textArea',
          name: 'noteForCustomer',
          label: 'Note for Customer',
          placeholder: 'Input note for customer',
          rows: 3,
          required: true,
        },
        {
          name: 'evidence',
          // required: true,
          required: false,
          label: 'Evidence',
          fetcher: postUploadCloseTicket,
          placeholder: 'Click here to upload file',
          type: 'file',
          maxFile: 5,
          helperText:
            'File in .jpg and .png only, up to 5 files with max. 1MB/file',
          maxSize: 1048576,
          accept: ['.jpg', '.jpeg', '.png'],
        },
      ],
      validation: {
        noteForInternal: string().required().label('Note Internal'),
        noteForCustomer: string().required().label('Note Customer'),
        evidence: array()
          .of(object())
          .min(1, 'At least one evidence file is required')
          // .required('Evidence is a required field')
          .optional()
          .label('Evidence'),
      },
      open: true,
      action: 'return',
      success: 'Ticket succesfully returned',
      errorMessage: 'Failed to give note & return ticket',
      title: 'Return',
      confirmation: 'Are you sure want to return this ticket?',
    },
  };

  const onReject = () => setModalBaseAction(actionSchema.reject);
  const onReturn = () => setModalBaseAction(actionSchema.return);
  const onEscalate = () => setModalBaseAction(actionSchema.escalate);

  const onSolve = () => setModalSolve(true);
  const onValidate = () => setModalValidate(true);
  const onReport = () => setModalReport(true);

  return {
    modalReport,
    setModalReport,
    onReport,
    modalValidate,
    setModalValidate,
    onValidate,
    modalBaseAction,
    onReject,
    onSolve,
    onEscalate,
    setModalBaseAction,
    fetchUpdateTicket,
    onReturn,
    modalSolve,
    setModalSolve,
  };
};

export default useActionCdnaas;
