import { ACTIONS } from '../../../../constants';
import fetch from '../../../utils/fetch';
import { SERVICES } from '../../../configs';
import { getToken } from '../../../utils/common';

export const submitAmMapping =
  ({ userId, data, callback }) =>
  (dispatch) => {
    const options = {
      method: 'PUT',
      url: SERVICES.AM_MAPPING_UPDATE(userId),
      data: data,
      headers: {
        Authorization: getToken(),
      },
    };

    dispatch(loadingAction());
    fetch(options)
      .then(() => {
        callback(false);
        dispatch(doneLoadingAction());
      })
      .catch(() => {
        dispatch(doneLoadingAction());
      });
  };

export const searchAMMappingCustomer = () => (dispatch) => {
  const options = {
    method: 'GET',
    url: `${SERVICES.AM_MAPPING_CUSTOMER}?segment=mycarrier&nipnas=&custAccntNum=&name=`,
    headers: {
      Authorization: getToken(),
    },
  };

  dispatch(loadingAction());
  fetch(options)
    .then(({ data }) => {
      dispatch(setCustomerSearch(data));
      dispatch(doneLoadingAction());
    })
    .catch(() => {
      dispatch(doneLoadingAction());
    });
};

function setCustomerSearch(data) {
  return { type: ACTIONS.LIST_AM_MAPPING_CUSTOMER, data };
}

function loadingAction() {
  return { type: ACTIONS.LOADING };
}

function doneLoadingAction() {
  return { type: ACTIONS.DONE_LOADING };
}
