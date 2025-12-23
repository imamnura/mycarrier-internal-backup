import { SERVICES } from '../configs';
import { ACTIONS } from '../../constants';
import { getToken } from './common';
import fetch from './fetch';

export function getListActivateCustomer(params) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.LIST_CUSTOMER_ACTIVATE(params),
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then(({ data }) => {
        dispatch(doneLoadingAction());
        dispatch(setDataListActivateCustomer(data));
      })
      .catch(() => {
        dispatch(doneLoadingAction());
        dispatch(setDataListActivateCustomer([]));
      });
  };
}

export function getListOperatorType() {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.LIST_OPERATOR_TYPE,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then(({ data }) => {
        dispatch(doneLoadingAction());
        dispatch(setDataListOperatorType(data));
      })
      .catch(() => {
        dispatch(doneLoadingAction());
        dispatch(setDataListOperatorType([]));
      });
  };
}

export function getListGPCustomer() {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.LIST_CUSTOMER_GP,
      params: {
        size: 999,
      },
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then(({ data }) => {
        dispatch(doneLoadingAction());
        dispatch(setDataListGPCustomer(data));
      })
      .catch(() => {
        dispatch(doneLoadingAction());
        dispatch(setDataListGPCustomer([]));
      });
  };
}

function setDataListActivateCustomer(data) {
  return { type: ACTIONS.LIST_ACTIVATE_CUSTOMER, data };
}

function setDataListOperatorType(data) {
  return { type: ACTIONS.LIST_OPERATOR_TYPE, data };
}

function setDataListGPCustomer(data) {
  return { type: ACTIONS.LIST_CUSTOMER_GP, data };
}

function loadingAction() {
  return { type: ACTIONS.LOADING };
}

function doneLoadingAction() {
  return { type: ACTIONS.DONE_LOADING };
}
