import { getAccessToken } from '@utils/common';
import fetch from '@utils/fetch';

export const getOptionsData = (categoryName) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/purchase-order/cndc/category/${categoryName}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};


export const deleteProduct = (orderNumber, productId) => {
  const options = {
    method: 'DELETE',
    url: `/activation/internal/purchase-order/v3/${orderNumber}/orderItem/${productId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options)
}