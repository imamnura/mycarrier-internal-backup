import { ACTIONS } from '../../../../constants';
import fetch from '../../../../__old/utils/fetch';
import { SERVICES } from '../../../../__old/configs';
import { getToken } from '../../../../__old/utils/common';

export function getDetailServiceAssuranceNeucloud(id) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.DETAIL_TICKET_NEUCLOUD(id),
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then(({ data }) => {
        dispatch(doneLoadingAction());
        dispatch(setDataServiceAssuranceNeucloud(data));
      })
      .catch(() => {
        dispatch(doneLoadingAction());
        dispatch(setDataServiceAssuranceNeucloud({}));
      });
  };
}

export function updateStatus(id, payload, type, callback) {
  const parameters = {
    Add: {
      success: 'Ticket number successfully added',
    },
    Edit: {
      success: 'Ticket number successfully updated',
    },
    UpdateStatus: {
      success: 'Issue status succesfully updated',
    },
  };

  const { success } = parameters[type];
  return (dispatch) => {
    const options = {
      method: 'PUT',
      url: SERVICES.UPDATE_TICKET_NEUCLOUD(id),
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingSubmitAction());
    fetch(options)
      .then(({ data }) => {
        callback({
          content: success,
          success: true,
        });
        dispatch(setDataServiceAssuranceNeucloud(data));
        dispatch(doneLoadingSubmitAction());
      })
      .catch(({ message }) => {
        dispatch(doneLoadingSubmitAction());
        callback({
          content: message,
          success: false,
        });
      });
  };
}

export function cleanUp() {
  return (dispatch) => {
    dispatch(setDataServiceAssuranceNeucloud({}));
  };
}

function setDataServiceAssuranceNeucloud(data) {
  return { type: ACTIONS.DETAIL_SERVICE_ASSURANCE_NEUCLOUD, data };
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
