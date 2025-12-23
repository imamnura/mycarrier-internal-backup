import { ACTIONS } from '@constants';
import fetch from '@__old/utils/fetch';
import { SERVICES } from '@__old/configs';
import { getToken } from '@__old/utils/common';

export const getInterestedDetail = (id, callback) => (dispatch) => {
  const options = {
    method: 'GET',
    url: SERVICES.INTERESTED_LIST_DETAIL(id),
    headers: {
      Authorization: getToken(),
    },
  };

  dispatch(loadingAction());
  fetch(options)
    .then(({ data }) => {
      callback();
      dispatch(setInterestedListDetail({ data }));
      dispatch(doneLoadingAction());
    })
    .catch(() => {
      dispatch(doneLoadingAction());
    });
};

export const submitInterestMapping =
  ({ id, data, callback }) =>
  (dispatch) => {
    const options = {
      method: 'PUT',
      url: SERVICES.INTERESTED_LIST_MAPPING_AM(id),
      data: data,
      headers: {
        Authorization: getToken(),
      },
    };

    dispatch(loadingAction());
    fetch(options)
      .then(({ data }) => {
        if (data.status === 'Invalid') {
          callback({
            content: 'Data has been changed to invalid',
            success: true,
          });
        } else {
          callback({
            content: 'Data has been mapping to AM',
            success: true,
          });
        }
        dispatch(setInterestedListDetail({ data }));
        dispatch(doneLoadingAction());
      })
      .catch(() => {
        callback({
          content: 'Failed mapping to AM',
          success: false,
        });
        dispatch(doneLoadingAction());
      });
  };

function setInterestedListDetail(data) {
  return { type: ACTIONS.INTERESTED_LIST_DETAIL, data };
}

function loadingAction() {
  return { type: ACTIONS.LOADING };
}

function doneLoadingAction() {
  return { type: ACTIONS.DONE_LOADING };
}
