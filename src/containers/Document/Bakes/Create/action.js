import { submit, change } from 'redux-form';
import { SERVICES } from '@__old/configs';
import { ACTIONS } from '@constants';
import { getToken } from '@__old/utils/common';
import fetch from '@__old/utils/fetch';

export function getBakesDetail(id, setStep) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.BAKES_DETAIL(id),
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then(({ data }) => {
        if (['telkom approval', 'customer approval'].includes(data?.status))
          setStep(0);
        else setStep((data.formStep || 0) > 4 ? 4 : data.formStep);
        dispatch(setDataBakes(data));
        dispatch(doneLoadingAction());
      })
      .catch(() => {
        dispatch(setDataBakes(null));
        dispatch(doneLoadingAction());
      });
  };
}

export function getTelkomPIC(setOption) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.BAKES_TELKOM_PIC,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingLazyAction());
    fetch(options)
      .then(({ data }) => {
        setOption([
          ...new Set(
            data.map((item) => ({
              value: item.name,
              label: `${item.name} (${item.position})`,
              data: item,
            })),
          ),
        ]);
        dispatch(doneLoadingLazyAction());
      })
      .catch(() => {
        setOption([]);
        dispatch(doneLoadingLazyAction());
      });
  };
}

export function getCompanyList(search, setOption) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.LIST_COMPANY(search),
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingLazyAction());
    fetch(options)
      .then(({ data }) => {
        setOption([
          { value: 'Others', label: 'Add New Customer' },
          ...new Set(
            data.map(({ custAccntName, custAccntNum }) => ({
              value: custAccntName,
              label: custAccntName,
              custAccntNum: custAccntNum,
            })),
          ),
        ]);
        dispatch(doneLoadingLazyAction());
      })
      .catch(() => {
        setOption([{ value: 'Others', label: 'Add New Customer' }]);
        dispatch(doneLoadingLazyAction());
      });
  };
}

export function getServiceOption(setServiceOption) {
  return () => {
    const options = {
      method: 'GET',
      url: SERVICES.BAKES_PRODUCT,
      params: {
        size: 9999,
        sort: 'asc',
        page: 1,
      },
      headers: {
        Authorization: getToken(),
      },
    };
    fetch(options)
      .then(({ data }) => {
        setServiceOption(
          data.map(({ productName, productId }) => ({
            value: productName,
            label: productName,
            data: {
              productId: productId.toString(),
              productName: productName,
            },
          })),
        );
      })
      .catch(() => {
        setServiceOption([]);
      });
  };
}

export function updateStatus(id, data, setAlert) {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      url: SERVICES.BAKES_UPDATE_STATUS(id),
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingSubmitAction());
    fetch(options)
      .then(() => {
        dispatch(doneLoadingSubmitAction());
        setAlert({
          content: 'BAKES successfully submitted',
          success: true,
        });
      })
      .catch(({ message }) => {
        dispatch(doneLoadingSubmitAction());
        setAlert({
          content: message,
          success: false,
        });
      });
  };
}

export function draftSubmit(
  id,
  data,
  success,
  setAlert,
  isNotDraft,
  status,
  setSubmitStatus,
) {
  const payload = {
    ...data,
    data: {
      ...data?.data,
      ...(['telkom approval', 'customer approval'].includes(status)
        ? { bakesId: id }
        : {}),
    },
  };
  return (dispatch) => {
    const options = {
      method: id && !isNotDraft ? 'PUT' : 'POST',
      url:
        id && !isNotDraft
          ? SERVICES.BAKES_DRAFT + `/${id}`
          : SERVICES.BAKES_DRAFT,
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    };
    fetch(options)
      .then(({ data }) => {
        dispatch(setDataBakes(data));
        success(data.bakesId);
        setSubmitStatus(true);
      })
      .catch(({ message }) => {
        setAlert({
          content: message,
          success: false,
        });
        setSubmitStatus(false);
      });
  };
}

export function uploadServiceDoc(data, type, callback) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      url: SERVICES.BAKES_UPLOAD_SERVICE_DOC,
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    callback(true);
    fetch(options)
      .then(({ data }) => {
        dispatch(change('newBakesStep2', type, data));
        callback(false);
      })
      .catch(() => {
        dispatch(change('newBakesStep2', type, {}));
        callback(false);
      });
  };
}

export function removeServiceDoc(data, type) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      url: SERVICES.BAKES_REMOVE_SERVICE_DOC,
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    fetch(options)
      .then(() => {
        dispatch(change('newBakesStep2', type, {}));
      })
      .catch(() => {
        dispatch(change('newBakesStep2', type, {}));
      });
  };
}

export function triggerSubmitStep1() {
  return (dispatch) => dispatch(submit('newBakesStep1'));
}

export function triggerSubmitStep2() {
  return (dispatch) => dispatch(submit('newBakesStep2'));
}

export function triggerSubmitStep3() {
  return (dispatch) => dispatch(submit('newBakesStep3'));
}

export function triggerSubmitStep4() {
  return (dispatch) => dispatch(submit('newBakesStep4'));
}

export function triggerSubmitStep5() {
  return (dispatch) => dispatch(submit('newBakesStep5'));
}

export function resetBakesCreateData() {
  return (dispatch) => dispatch(setDataBakes(null));
}

function setDataBakes(data) {
  return { type: ACTIONS.BAKES_CREATE_DATA, data };
}

function loadingLazyAction() {
  return { type: ACTIONS.LOADING_LAZY };
}

function doneLoadingLazyAction() {
  return { type: ACTIONS.DONE_LOADING_LAZY };
}

function loadingSubmitAction() {
  return { type: ACTIONS.LOADING_SUBMIT };
}

function doneLoadingSubmitAction() {
  return { type: ACTIONS.DONE_LOADING_SUBMIT };
}

function loadingAction() {
  return { type: ACTIONS.LOADING };
}

function doneLoadingAction() {
  return { type: ACTIONS.DONE_LOADING };
}
