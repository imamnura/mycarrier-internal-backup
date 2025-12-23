import { ACTIONS } from '@constants';
import fetch from '@__old/utils/fetch';
import { SERVICES } from '@__old/configs';
import { getToken } from '@__old/utils/common';

export const getInterestedGraph = (data) => (dispatch) => {
  const { reportTime, status, source, startDate, endDate } = data;
  let params = {
    reportTime,
    status,
    source,
    startDate,
    endDate,
  };

  const options = {
    method: 'GET',
    url: SERVICES.GRAPH_STATUS_INTERESTED_LIST,
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
        setInteresteGraph({
          data: data || [],
          params: { reportTime, status, source, startDate, endDate },
        }),
      );
    })
    .catch(() => {
      dispatch(setInteresteGraph({ data: [], params: {} }));
      dispatch(doneLoadingAction());
    });
};

export const getInterestedGraphProduct = (data) => (dispatch) => {
  const { source, status, product, startDate, endDate } = data;
  const params = {
    source,
    status,
    product,
    startDate,
    endDate,
  };

  const options = {
    method: 'GET',
    url: SERVICES.GRAPH_PRODUCT_INTERESTED_LIST,
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
        setInteresteGraphProduct({
          data: data || [],
          params: { source, status, product, startDate, endDate },
        }),
      );
    })
    .catch(() => {
      dispatch(setInteresteGraphProduct({ data: [], params: {} }));
      dispatch(doneLoadingAction());
    });
};

export const getInterestedGraphAM = (data) => (dispatch) => {
  const { filter, search } = data;
  const params = {
    search,
    name: filter,
  };

  const options = {
    method: 'GET',
    url: SERVICES.GRAPH_AM_INTERESTED_LIST,
    params,
    headers: {
      Authorization: getToken(),
    },
  };

  dispatch(loadingAction());
  fetch(options)
    .then(({ data, meta }) => {
      dispatch(doneLoadingAction());
      dispatch(
        setInteresteGraphAM({
          data: data,
          meta: meta ? meta : {},
        }),
      );
    })
    .catch(() => {
      dispatch(setInteresteGraphAM({ data: [], meta: {} }));
      dispatch(doneLoadingAction());
    });
};

export const getInterestedGraphSegment = (data) => (dispatch) => {
  const { filter, search } = data;
  const params = {
    search,
    segment: filter,
  };

  const options = {
    method: 'GET',
    url: SERVICES.GRAPH_SEGMENT_INTERESTED_LIST,
    params,
    headers: {
      Authorization: getToken(),
    },
  };

  dispatch(loadingAction());
  fetch(options)
    .then(({ data, meta }) => {
      dispatch(doneLoadingAction());
      dispatch(
        setInteresteGraphSegment({
          data: data,
          meta: meta ? meta : {},
        }),
      );
    })
    .catch(() => {
      dispatch(setInteresteGraphSegment({ data: [], meta: {} }));
      dispatch(doneLoadingAction());
    });
};

export const getProduct = () => (dispatch) => {
  const options = {
    method: 'GET',
    url: `${SERVICES.LIST_PRODUCT}`,
    headers: { Authorization: getToken() },
  };

  dispatch(loadingAction());
  fetch(options)
    .then((data) => {
      dispatch({ type: ACTIONS.LIST_PRODUCT, data: data.data });
      dispatch(doneLoadingAction());
    })
    .catch(() => {
      dispatch({ type: ACTIONS.LIST_PRODUCT, data: [] });
      dispatch(doneLoadingAction());
    });
};

export const getSource = () => (dispatch) => {
  const options = {
    method: 'GET',
    url: `${SERVICES.LIST_SOURCE}`,
    headers: { Authorization: getToken() },
  };

  dispatch(loadingAction());
  fetch(options)
    .then((data) => {
      dispatch({ type: ACTIONS.LIST_SOURCE, data: data.data });
      dispatch(doneLoadingAction());
    })
    .catch(() => {
      dispatch({ type: ACTIONS.LIST_SOURCE, data: [] });
      dispatch(doneLoadingAction());
    });
};

export const getAMValid = () => (dispatch) => {
  const options = {
    method: 'GET',
    url: `${SERVICES.LIST_AM_VALID}`,
    headers: { Authorization: getToken() },
  };

  dispatch(loadingAction());
  fetch(options)
    .then((data) => {
      dispatch({ type: ACTIONS.LIST_AM_VALID, data: data.data });
      dispatch(doneLoadingAction());
    })
    .catch(() => {
      dispatch({ type: ACTIONS.LIST_AM_VALID, data: [] });
      dispatch(doneLoadingAction());
    });
};

export const getSegmentValid = () => (dispatch) => {
  const options = {
    method: 'GET',
    url: `${SERVICES.LIST_SEGMENT_VALID}`,
    headers: { Authorization: getToken() },
  };

  dispatch(loadingAction());
  fetch(options)
    .then((data) => {
      dispatch({ type: ACTIONS.LIST_SEGMENT_VALID, data: data.data });
      dispatch(doneLoadingAction());
    })
    .catch(() => {
      dispatch({ type: ACTIONS.LIST_SEGMENT_VALID, data: [] });
      dispatch(doneLoadingAction());
    });
};

function setInteresteGraph(data) {
  return { type: ACTIONS.INTERESTED_GRAPH_STATUS, data };
}

function setInteresteGraphProduct(data) {
  return { type: ACTIONS.INTERESTED_GRAPH_PRODUCT, data };
}

function setInteresteGraphAM(data) {
  return { type: ACTIONS.INTERESTED_GRAPH_AM, data };
}

function setInteresteGraphSegment(data) {
  return { type: ACTIONS.INTERESTED_GRAPH_SEGMENT, data };
}

function loadingAction() {
  return { type: ACTIONS.LOADING };
}

function doneLoadingAction() {
  return { type: ACTIONS.DONE_LOADING };
}
