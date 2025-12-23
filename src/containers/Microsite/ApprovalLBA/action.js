import { ACTIONS } from '../../../constants';
import fetch from '../../../__old/utils/fetch';
import { SERVICES } from '../../../__old/configs';
import generateToken from '../../../__old/utils/generateToken';

export function getApprovalLBA(id) {
  return (dispatch) => {
    dispatch(loadingAction());
    generateToken((accessToken) => {
      const options = {
        method: 'GET',
        url: SERVICES.APPROVAL_LBA(id),
        headers: {
          Authorization: accessToken,
        },
      };
      dispatch(loadingAction());
      fetch(options)
        .then(({ data }) => {
          dispatch(doneLoadingAction());
          dispatch(setDataApprovalLBA({ ...data, status: 'Customer Request' }));
        })
        .catch(() => {
          dispatch(doneLoadingAction());
          dispatch(setDataApprovalLBA({}));
        });
    });
  };
}

export function updateStatus({ id, payload, callback }) {
  return (dispatch) => {
    dispatch(loadingAction());
    generateToken((accessToken) => {
      const options = {
        method: 'put',
        url: SERVICES.APPROVAL_LBA(id),
        data: payload,
        headers: {
          Authorization: accessToken,
        },
      };
      dispatch(loadingSubmitAction());
      dispatch(doneLoadingAction());
      fetch(options)
        .then(() => {
          dispatch(doneLoadingSubmitAction());
          callback({
            content: 'LBA request successfully approve',
            success: true,
          });
        })
        .catch(() => {
          dispatch(doneLoadingSubmitAction());
          callback({
            content: 'Failed to Update Data',
            success: false,
          });
        });
    });
  };
}

export function changeData(data) {
  return (dispatch) => dispatch(setDataApprovalLBA(data));
}

function setDataApprovalLBA(data) {
  return { type: ACTIONS.APPROVAL_LBA, data };
}

function loadingAction() {
  return { type: ACTIONS.LOADING };
}

function doneLoadingAction() {
  return { type: ACTIONS.DONE_LOADING };
}

function loadingSubmitAction() {
  return { type: ACTIONS.LOADING_SUBMIT };
}

function doneLoadingSubmitAction() {
  return { type: ACTIONS.DONE_LOADING_SUBMIT };
}
