import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';
import { key } from '@configs/index';

export const getListBillsAndPaymentManagement = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/mycarrier-quotation/internal/invoice/v1/company-notification',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailBillsAndPaymentManagement = (bpNumber) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/internal/invoice/v1/company-notification/${bpNumber}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListInvoice = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/internal/invoice/v1/invoice-list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListClaim = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/internal/invoice/v1/claim',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListReconciliation = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/internal/reconciliation/v1/list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListDunning = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/dunning/v1/list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOptionsTypeDunning = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/dunning/v1/constant',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOptionsStatusDunning = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/dunning/v1/constant?type=dunning-status',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const generateInvoice = (invoiceNumber) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/invoice/v1/generate-invoice/${invoiceNumber}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const refreshInvoice = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/mycarrier-quotation/invoice/v1/update/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postSendInvoice = (data) => {
  const options = {
    data,
    method: 'POST',
    // url: 'mycarrier-quotation/internal/invoice/v1/send-notification',
    url: '/mycarrier-quotation/dunning/v3/create',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postPicProfile = (data) => {
  const options = {
    data,
    method: 'POST',
    url: 'mycarrier-quotation/internal/invoice/v1/pic',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const putPicProfile = (data) => {
  const options = {
    data,
    method: 'PUT',
    url: 'mycarrier-quotation/internal/invoice/v1/pic',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const deletePicProfile = (data) => {
  const options = {
    data,
    method: 'DELETE',
    url: 'mycarrier-quotation/internal/invoice/v1/pic',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailInvoice = ({ invoiceNumber, bpNumber }) => {
  const options = {
    params: { bpNumber },
    method: 'GET',
    url: `/mycarrier-quotation/invoice/v1/detail/${invoiceNumber}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postUploadInvoiceAttachment = ({
  bpNumber,
  invoiceNumber,
  type,
  file,
}) => {
  const data = new FormData();
  data.append('file', file);
  data.append('bpNumber', bpNumber);
  data.append('invoiceNumber', invoiceNumber);
  data.append('type', type);
  const options = {
    data,
    method: 'POST',
    url: 'mycarrier-quotation/internal/invoice/v1/upload-file',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const deleteInvoiceAttachment = (data) => {
  const options = {
    data,
    method: 'DELETE',
    url: 'mycarrier-quotation/internal/invoice/v1/delete-file',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailClaim = (claimId) => {
  const options = {
    method: 'GET',
    url: `mycarrier-quotation/internal/invoice/v1/claim/${claimId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const putStatusClaim = ({ claimId, data }) => {
  const options = {
    data,
    method: 'PUT',
    url: `mycarrier-quotation/internal/invoice/v1/claim/status/${claimId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postUploadClaimEvidence = (claimId) => (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('claimId', claimId);

  const options = {
    data,
    method: 'POST',
    url: 'mycarrier-quotation/internal/invoice/v1/claim/upload-file',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getPeriodUpdated = ({ params }) => {
  const options = {
    params,
    method: 'GET',
    url: 'mycarrier-quotation/invoice/v1/mdashboard/fetch-current-period-bill',
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};

export const getInvoiceSummary = ({ params }) => {
  const options = {
    params,
    method: 'GET',
    url: 'mycarrier-quotation/invoice/v1/ibss/summary',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListInvoiceSummary = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/invoice/v1/ibss/list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDownloadListInvoiceSummary = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/invoice/v1/ibss/download',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getTemplateBillingReminder = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/internal/invoice/v1/reminder-template',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const submitBillingReminder = (opt) => {
  const options = {
    ...opt,
    method: 'PUT',
    url: '/mycarrier-quotation/internal/invoice/v1/reminder',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailApprovalBillingReminder = (hash) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/internal/invoice/v1/reminder/detail/without-login/${hash}`,
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};

export const putApprovalBillingReminder = (opt) => {
  const options = {
    ...opt,
    method: 'PUT',
    url: '/mycarrier-quotation/invoice/v1/approve-reminder',
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};

export const putReturnBillingReminder = (opt) => {
  const options = {
    ...opt,
    method: 'PUT',
    url: '/mycarrier-quotation/invoice/v1/return-reminder',
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};

export const getListCustomer = (params, withCancel = false) => {
  const options = {
    params,
    withCancel,
    method: 'GET',
    url: '/users-management/v2/pic-customer',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postUploadBillingReminder = (reminderId) => (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('type', 'reminder-attachment');
  data.append('id', reminderId);

  const options = {
    data,
    method: 'POST',
    url: 'mycarrier-quotation/general/v1/upload-file',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const deleteBillingReminderAttachment = (data) => {
  const options = {
    data,
    method: 'DELETE',
    url: 'mycarrier-quotation/general/v1/delete-file',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const reBundlingDocument = (data) => {
  const options = {
    data,
    method: 'PUT',
    url: 'mycarrier-quotation/invoice/v1/rebundling',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const refreshDocument = (data) => {
  const options = {
    data,
    method: 'POST',
    url: 'mycarrier-quotation/invoice/v1/reset-invoice',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailDraftBillingReminder = (reminderId) => {
  const options = {
    method: 'GET',
    url: `mycarrier-quotation/internal/invoice/v1/reminder/detail/${reminderId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postDraftBillingReminder = (id, data) => {
  const options = {
    data,
    method: id ? 'PUT' : 'POST',
    url: 'mycarrier-quotation/internal/invoice/v1/reminder',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postPaymentHistoryFile = (data) => {
  const options = {
    data,
    method: 'POST',
    url: 'mycarrier-quotation/internal/invoice/v1/payment-history/upload',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getPaymentHistoryList = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/internal/invoice/v1/payment-history/list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postAttachmentPaymentHistory = (data) => {
  const options = {
    data,
    method: 'POST',
    url: '/mycarrier-quotation/general/v1/upload-file',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postSendPaymentHistory = (data) => {
  const options = {
    data,
    method: 'POST',
    url: 'mycarrier-quotation/internal/invoice/v1/payment-history/send',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSummaryReminderLetter = (params) => {
  const options = {
    params,
    method: 'GET',
    url: 'mycarrier-quotation/invoice/v1/reminder-letter/summary',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListSummaryReminderLetter = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/invoice/v1/reminder-letter/list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDownloadSummaryReminderLetter = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/invoice/v1/reminder-letter/download',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSummaryThanksLetter = (params) => {
  const options = {
    params,
    method: 'GET',
    url: 'mycarrier-quotation/invoice/v1/thanks-letter/summary',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListSummaryThanksLetter = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/invoice/v1/thanks-letter/list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDownloadSummaryThanksLetter = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/invoice/v1/thanks-letter/download',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getInvoicePaymentHistory = (invoiceNumber) => {
  const options = {
    method: 'GET',
    url: `mycarrier-quotation/invoice/v1/history-payment/${invoiceNumber}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getPaymentDocumentFormulaInfo = () => {
  const options = {
    method: 'GET',
    url: 'mycarrier-quotation/internal/invoice/v1/payment-history/formula-last-update',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postUploadCustomerLogo = (data) => {
  const options = {
    method: 'POST',
    url: 'mycarrier-quotation/internal/invoice/v1/company-notification/upload-icon',
    data,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const deleteUploadIcon = (data) => {
  const options = {
    method: 'DELETE',
    url: '/mycarrier-quotation/internal/invoice/v1/company-notification/delete-icon',
    data,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postUploadIcon = (data) => {
  const options = {
    method: 'POST',
    url: 'mycarrier-quotation/general/v2/upload-file',
    data,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOsBalance = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'mycarrier-quotation/internal/invoice/v3/download-outstanding-balance',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const putGenerateBillingReminder = (data) => {
  const options = {
    data,
    method: 'PUT',
    url: '/mycarrier-quotation/dunning/v3/generate',
  };
  return fetch(options);
};
