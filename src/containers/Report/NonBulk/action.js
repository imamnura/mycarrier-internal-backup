import { ACTIONS } from '@constants';
import fetch from '@__old/utils/fetch';
import { SERVICES } from '@__old/configs';
import { getToken } from '@__old/utils/common';
import { dialog } from '@fragments/DownloadAuthorization/dialog-bridge';

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
      url: SERVICES.GRAPH_LBA,
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
          setGraphLBA({
            data: data.detail || [],
            params: { chartType, reportTime, reportType },
          }),
        );
      })
      .catch(() => {
        dispatch(setGraphLBA({ data: [], params: {} }));
        dispatch(doneLoadingAction());
      });
  };
}

export function resetGraphData() {
  return (dispatch) => {
    dispatch(setGraphLBA({ data: [], params: {} }));
  };
}

export function downloadReporting(params, callback) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.DOWNLOAD_LBA_REPORT,
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

function setGraphLBA(data) {
  return { type: ACTIONS.GRAPH_LBA, data };
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
