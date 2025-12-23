import { ACTIONS } from '@constants';
import fetch from '@__old/utils/fetch';
import { SERVICES } from '@__old/configs';
import { getToken } from '@__old/utils/common';

export const deleteListCustomer =
  ({ id, data, callback }) =>
  (dispatch) => {
    const options = {
      method: 'PUT',
      // url: SERVICES.AM_MAPPING_LIST_CUSTOMER(id),
      url: SERVICES.AM_MAPPING_UPDATE(id),
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    callback({
      content: 'Please wait',
      secondaryContent: 'loading...',
      actions: [],
      done: false,
    });
    dispatch(loadingAction());
    fetch(options)
      .then(() => {
        callback({
          content: 'Success',
          secondaryContent: 'Data has been hidden',
          actions: [],
          done: true,
        });
        dispatch(doneLoadingAction());
      })
      .catch(() => {
        callback({
          content: 'Failed',
          secondaryContent: 'Something wrong, Failed to hide data',
          actions: [],
          done: true,
        });
        dispatch(doneLoadingAction());
      });
  };

export const getAMMappingProfile = (userId) => (dispatch) => {
  const options = {
    method: 'GET',
    url: `${SERVICES.AM_MAPPING_USER}?role=account_manager&nameApp=mycarrier&userId=${userId}`,
    headers: {
      Authorization: getToken(),
    },
  };

  dispatch(loadingAction());
  fetch(options)
    .then(({ data }) => {
      dispatch(setAmMappingDetail({ data, detail: data[0].metaData }));
      dispatch(doneLoadingAction());
    })
    .catch(() => {
      dispatch(doneLoadingAction());
    });
};

export const getListCustomer =
  ({ params, id, callback }) =>
  (dispatch) => {
    const options = {
      method: 'GET',
      // url: SERVICES.AM_MAPPING_LIST_CUSTOMER(id),
      url: `${SERVICES.AM_MAPPING_USER}?role=account_manager&nameApp=mycarrier&userId=${id}`,
      params,
      headers: {
        Authorization: getToken(),
      },
    };

    dispatch(params.page === 1 ? loadingAction() : loadingLazyAction());
    fetch(options)
      .then(({ data, meta }) => {
        dispatch(setAmListCustomer({ data: data[0].metaData.ccHandled, meta }));
        dispatch(doneLoadingLazyAction());
        dispatch(doneLoadingAction());
        callback(params.page < meta.totalPage);
      })
      .catch(() => {
        callback(false);
        dispatch(setAmListCustomer({ data: [], meta: [] }));
        dispatch(doneLoadingLazyAction());
        dispatch(doneLoadingAction());
      });
  };

function setAmListCustomer(data) {
  return { type: ACTIONS.AM_LIST_CUSTOMER, data };
}

function setAmMappingDetail(data) {
  return { type: ACTIONS.AM_PROFILE, data };
}

function loadingAction() {
  return { type: ACTIONS.LOADING };
}

function doneLoadingAction() {
  return { type: ACTIONS.DONE_LOADING };
}

function loadingLazyAction() {
  return { type: ACTIONS.LOADING_LAZY };
}

function doneLoadingLazyAction() {
  return { type: ACTIONS.DONE_LOADING_LAZY };
}
