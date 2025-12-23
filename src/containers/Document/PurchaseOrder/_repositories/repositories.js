import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';
import { IS_CDNAAS } from '@constants/env';

export const getListPurchaseOrder = (opt) => {
  const options = {
    ...opt,
    withCancel: true,
    method: 'GET',
    url: '/activation/internal/purchase-order/v2',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFilterCustomerOptions = () => {
  const options = {
    method: 'GET',
    url: '/activation/internal/purchase-order/customer-filtered',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFilterProductOptions = () => {
  const options = {
    method: 'GET',
    url: '/activation/internal/purchase-order/product-filtered',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetail = (id) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/purchase-order/v3/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListBillingInformation = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `activation/internal/purchase-order/v2/billing`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const downloadBillingData = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'activation/internal/purchase-order/v2/billing/download',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export function updateStatus(id, payload) {
  const options = {
    method: 'PUT',
    url: `/activation/internal/purchase-order/v3/${id}`,
    data: payload,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
}

export function getOptionBakes(params) {
  const options = {
    method: 'GET',
    url: `/activation/internal/purchase-order/all-bakes`,
    params,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
}

export function getProducts(id) {
  let url = `/activation/internal/purchase-order/v3/${id}/packages`;
  if (id === IS_CDNAAS) {
    url = url + '/with-attributes';
  }
  const options = {
    method: 'GET',
    url,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
}

export const uploadFile = (payload, setProgress) => {
  const options = {
    data: payload,
    method: 'POST',
    url: `/activation/purchase-order/upload-file`,
    headers: {
      Authorization: getAccessToken(),
    },
    onUploadProgress: (data) => {
      setProgress(Math.round((100 * data.loaded) / data.total));
    },
  };
  return fetch(options);
};

export const getListAM = (params) => {
  const options = {
    params: {
      ...params,
    },
    method: 'GET',
    url: '/activation/internal/purchase-order/cndc/managers',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getListPICInternal = (params) => {
  const options = {
    params: {
      ...params,
    },
    method: 'GET',
    url: '/activation/internal/purchase-order/v2/cndc/managers',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

//service-accounts | billing-accounts | agree-master
export const getOptionsOrderNeucentrix = (params, type) => {
  const options = {
    params,
    method: 'GET',
    url: `/activation/internal/purchase-order/cndc/${type}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const postUploadFile = (file) => {
  const data = new FormData();
  data.append('file', file);
  const options = {
    data,
    method: 'POST',
    url: '/activation/purchase-order/upload-file',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getListCustomers = ({ params, ...opt }) => {
  const options = {
    ...opt,
    params,
    method: 'GET',
    url: '/activation/internal/purchase-order/v2/customers',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListPICCustomers = ({ params, ...opt }) => {
  const options = {
    ...opt,
    params,
    method: 'GET',
    url: '/activation/internal/purchase-order/v2/pic-customer',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListCategory = (params) => {
  const options = {
    params: {
      ...params,
    },
    method: 'GET',
    url: '/activation/purchase-order/v2/category',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getDropdownOption = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListProduct = (params) => {
  const options = {
    params: {
      ...params,
    },
    method: 'GET',
    url: '/activation/internal/purchase-order/v2/product',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const postPurchaseOrder = (payload) => {
  const options = {
    data: payload,
    method: 'POST',
    url: `/activation/internal/purchase-order/v2`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSummaryBilling = (params) => {
  const options = {
    params: {
      ...params,
    },
    method: 'GET',
    url: `/activation/internal/purchase-order/v2/billing/summary`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListProductChildSCOne = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'activation/internal/purchase-order/v3/scone/product-child',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getAttributeProductSCOne = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'activation/internal/purchase-order/v3/scone/product-attribute',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListProductGrandchildSCOne = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: 'activation/internal/purchase-order/v3/scone/product-grand-child',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const sendReminder = (payload) => {
  const options = {
    data: payload,
    method: 'POST',
    url: 'activation/internal/purchase-order/v2/reminder-notification',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const checkConstraints = (payload) => {
  const options = {
    data: payload,
    method: 'POST',
    url: 'activation/internal/purchase-order/v3/scone/check-constraints',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailHistoryOfTariffCalculator = (id) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/tariff-calculator/v2/history/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postQrSign = (payload) => {
  const options = {
    data: payload,
    method: 'POST',
    url: `/activation/internal/purchase-order/v2/baso-qr`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postFileBasoWithQr = (payload) => {
  const options = {
    data: payload,
    method: 'POST',
    url: `/activation/internal/purchase-order/v3/baso-qr/signed`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOptionsListRoot = (opt) => {
  const options = {
    method: 'GET',
    url: `activation/internal/purchase-order/v3/${opt.productId}/roots`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const deleteFilePurchase = (fileName) => {
  const options = {
    method: 'DELETE',
    url: `/activation/purchase-order/remove-file/${fileName}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
