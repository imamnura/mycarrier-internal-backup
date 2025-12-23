import { ACTIONS } from '@constants';
import fetch from '@__old/utils/fetch';
import { SERVICES } from '@__old/configs';
import { getToken } from '@__old/utils/common';
import { dialog } from '@fragments/DownloadAuthorization/dialog-bridge';

export function getDataChart(data) {
  const { customer, reportTime, operator, chartType } = data;
  const params = {
    customer,
    reportTime,
    operator,
    // startDate,
    // endDate
  };

  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.GRAPH_SMSC,
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then(({ data }) => {
        dispatch(doneLoadingAction());
        dispatch(
          setGraphSMSC({
            data: data || [],
            params: { chartType, reportTime, operator },
          }),
        );
      })
      .catch(() => {
        dispatch(setGraphSMSC({ data: [], params: {} }));
        dispatch(doneLoadingAction());
      });
  };
}

export function resetGraphData() {
  return (dispatch) => {
    dispatch(setGraphSMSC({ data: [], params: {} }));
  };
}

export function downloadReporting(params, callback) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.DOWNLOAD_SMSC_REPORT,
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingSubmitAction());
    fetch(options)
      .then(({ data }) => {
        callback({
          content: 'File successfully downloaded',
          success: true,
        });
        window.open(data, '_blank');
        dispatch(doneLoadingSubmitAction());
      })
      .catch(({ code, message }) => {
        if (code === 403) {
          dialog.show('Forbidden download');
          dispatch(doneLoadingSubmitAction());
          return;
        }

        callback({
          content: message,
          success: false,
        });
        dispatch(doneLoadingSubmitAction());
      });
  };
}

export function getListCustomerSMSC() {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.LIST_CUSTOMER_SMSC,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then(({ data }) => {
        dispatch(doneLoadingAction());
        dispatch(setDataListCustomerSMSC(data));
      })
      .catch(() => {
        dispatch(doneLoadingAction());
        dispatch(setDataListCustomerSMSC([]));
      });
  };
}

function setGraphSMSC(data) {
  return { type: ACTIONS.GRAPH_SMSC, data };
}

function setDataListCustomerSMSC(data) {
  return { type: ACTIONS.LIST_CUSTOMER_SMSC, data };
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
