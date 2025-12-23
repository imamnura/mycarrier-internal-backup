import { ACTIONS } from '../../../constants';
import fetch from '../../../__old/utils/fetch';
import { AUTH, SERVICES } from '../../../__old/configs';

export function getApprovalBakes(id, setData) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.BAKES_APPROVAL_DETAIL(id),
      headers: {
        Authorization: AUTH.BASIC,
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then(({ data }) => {
        const approver = data.telkomApproval;
        const normalize = {
          ...data,
          isLastReviewer:
            approver.length > 1
              ? Boolean(approver[approver.length - 2].note)
              : true,
        };
        setData(normalize);
        dispatch(doneLoadingAction());
      })
      .catch(() => {
        dispatch(doneLoadingAction());
        setData(null);
      });
  };
}

export function updateStatus(id, data, setAlert, setData) {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      url: SERVICES.BAKES_APPROVAL_UPDATE_STATUS(id),
      data,
      headers: {
        Authorization: AUTH.BASIC,
      },
    };
    dispatch(loadingSubmitAction());
    fetch(options)
      .then(({ data: resData }) => {
        dispatch(doneLoadingSubmitAction());
        if (data.status === 'telkom approval') {
          setData({ ...resData, telkomApprovalStepStatus: true });
        } else {
          setData(resData);
        }
        setAlert({
          title: `New BAKES request successfully ${
            data.status === 'telkom approval' ? 'approved' : data.status
          }`,
          success: true,
        });
      })
      .catch(() => {
        dispatch(doneLoadingSubmitAction());
        setAlert({
          title: 'Failed to update status',
          success: false,
        });
      });
  };
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
