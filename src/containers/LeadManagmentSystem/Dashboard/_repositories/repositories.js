import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

// List
export const getListLeadManagementSystem = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/explore/v4/cart',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDownloadLeadManagementSystem = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/explore/v5/cart/download',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSummaryLeadManagementSystem = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/explore/v4/cart/product-graph',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getLeadValidSummary = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/explore/v4/cart/product-graph-valid',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSource = () => {
  const options = {
    method: 'GET',
    url: '/explore/v3/cart/source',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

// Detail

export const getDetail = (id, params) => {
  const options = {
    params,
    method: 'GET',
    url: `/explore/v4/cart/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getListAM = (params) => {
  const options = {
    params,
    method: 'GET',
    url: '/explore/v4/starclick-user',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getListCompany = ({ search, size, page }) => {
  const options = {
    params: {
      size,
      page,
      search,
    },
    method: 'GET',
    url: '/explore/v4/starclick-ca-pagination',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getListContact = ({ search, size, page }) => {
  const options = {
    params: {
      size,
      page,
      search,
    },
    method: 'GET',
    url: '/explore/v4/cart/customers',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const checkScIntegrationStatus = () => {
  const options = {
    method: 'GET',
    url: `/explore/v3/cart/sc-integration-status`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const updateStatus = (data, id, to) => {
  const url = {
    myc: `/explore/v4/cart/${id}`,
    sc: `/explore/v4/starclick-update-lead/${id}`,
  }[to];

  const options = {
    data,
    method: 'PUT',
    url,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const submitFollowUp = (data, type, variant) => {
  const url = {
    activities: `/explore/v4/starclick-activity`,
    notes: `/explore/v4/starclick-note`,
    attachments: `/explore/v4/starclick-attachment`,
    product: `/explore/v4/starclick-product`,
    contact: `/explore/v4/starclick-contact`,
  }[type];

  const options = {
    data,
    method: variant === 'add' ? 'POST' : 'PUT',
    url,
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
    url: '/explore/v4/file-generate-base64',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const deleteFollowUp = (data, type) => {
  const url = {
    activities: `/explore/v4/starclick-activity`,
    notes: `/explore/v4/starclick-note`,
    attachments: `/explore/v4/starclick-attachment`,
    product: `/explore/v4/starclick-product`,
    contact: `/explore/v4/starclick-contact`,
  }[type];

  const options = {
    data,
    method: 'DELETE',
    url,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

// export const assignSalesTeam = (data, id ) => {
//   const options = {
//     data,
//     method: 'PUT',
//     url: `/explore/v4/cart/${id}`,
//     headers: { Authorization: getAccessToken() }
//   };
//   return fetch(options);
// };

export const reAssignSalesTeam = (data, id) => {
  const options = {
    data,
    method: 'PUT',
    url: `/explore/v4/cart/reassign/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

// Create
export const getOptionsProduct = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/explore/v2/product?useAtDropdown=true&relatedType=banner',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postCreateLead = (opt) => {
  const options = {
    ...opt,
    method: 'POST',
    url: '/explore/v4/cart',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

// #v2
// export const updateStatusLead = (id, status, invalidReason) => {
export const updateStatusLead = (id, status, payload) => {
  let url = `/explore/v4/starclick-update-lead/${id}`;

  if (['valid', 'invalid'].includes(status)) {
    url = `/explore/v4/cart/${id}`;
  }

  const options = {
    data: {
      status,
      ...payload,
      // reason: invalidReason
    },
    method: 'PUT',
    url: url,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getOptionPickProduct = (payload) => {
  const options = {
    params: payload,
    method: 'GET',
    url: '/explore/v4/starclick-product/all',
    headers: {
      Authorization: getAccessToken(),
    },
    withCancel: true,
  };

  return fetch(options);
};

export const getListDetailStage = (dashboardId, type) => {
  const url = {
    quote: `/explore/v4/cart/quote/${dashboardId}`,
    agreement: `/explore/v4/cart/agreement/${dashboardId}`,
  }[type];

  const options = {
    method: 'GET',
    url,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getListLineItems = (id, status) => {
  const url = {
    Quote: `/explore/v4/cart/line-item/${id}`,
    Order: `/explore/v4/cart/order-line-item/${id}`,
  }[status];
  const options = {
    method: 'GET',
    url,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getQuoteHeader = (scQuoteId) => {
  const options = {
    method: 'GET',
    url: `/explore/v4/cart/quote-header/detail/${scQuoteId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getPrerequisite = (id) => {
  const options = {
    method: 'GET',
    url: `/explore/v4/cart/prerequisite/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getOrderList = (dashboardId) => {
  const options = {
    method: 'GET',
    // url: `/explore/v4/cart/order/4150`,
    url: `/explore/v4/cart/order/${dashboardId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getOrderHeader = (orderId) => {
  const options = {
    method: 'GET',
    url: `/explore/v4/cart/quote-order-header/detail/${orderId}`,
    // url: `/explore/v4/cart/quote-order-header/detail/2-9963491026`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const updateToOrder = (data) => {
  const options = {
    data,
    method: 'POST',
    url: '/explore/v4/cart/agreement',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const addProductToQuote = (interestId) => {
  const options = {
    method: 'POST',
    url: `/explore/v4/add-quote/${interestId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getListActivity = (dashboardId, variant, tab) => {
  const url = {
    activities: `/explore/v4/cart/starclick-activity?interestId=${dashboardId}&status=${variant}`,
    notes: `/explore/v4/cart/starclick-note?interestId=${dashboardId}&status=${variant}`,
    attachments: `/explore/v4/cart/starclick-attachment?interestId=${dashboardId}&status=${variant}`,
  }[tab];

  const options = {
    method: 'GET',
    url,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getAgreementDetail = (agreementNumber) => {
  const options = {
    method: 'GET',
    url: `/explore/v4/cart/agreement-detail/${agreementNumber}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};
