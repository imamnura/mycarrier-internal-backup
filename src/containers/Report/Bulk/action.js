import { ACTIONS } from '@constants';
import fetch from '@__old/utils/fetch';
import { SERVICES } from '@__old/configs';
import { getToken } from '@__old/utils/common';

export function getDataChart(data) {
  const {
    custAccntNum,
    reportTime,
    reportType,
    startDate,
    endDate,
    chartType,
  } = data;
  const params = {
    custAccntNum,
    reportTime,
    reportType,
    startDate,
    endDate,
  };

  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.GRAPH_SENDER,
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
          setGraphSenderID({
            data:
              reportType === 'deliveryTime'
                ? data.average || []
                : data.detail || [],
            params: { chartType, reportTime, reportType },
          }),
        );
      })
      .catch(() => {
        dispatch(setGraphSenderID({ data: [], params: {} }));
        dispatch(doneLoadingAction());
      });
  };
}

export function resetGraphData() {
  return (dispatch) => {
    dispatch(setGraphSenderID({ data: [], params: {} }));
  };
}

export function downloadReporting(params, callback) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.DOWNLOAD_SENDER_REPORT,
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
      .catch(({ message }) => {
        callback({
          content: message,
          success: false,
        });
        dispatch(doneLoadingSubmitAction());
      });
  };
}

function setGraphSenderID(data) {
  return { type: ACTIONS.GRAPH_SENDER_ID, data };
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
