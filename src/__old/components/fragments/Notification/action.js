import { ACTIONS } from '../../../../constants';
import fetch from '../../../utils/fetch';
import { getToken, noop, isRole } from '../../../utils/common';
import { SERVICES } from '../../../configs';

export function getNotification({ oldData = [], page = 1, callback }) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: isRole('am')
        ? SERVICES.LIST_NOTIFICATION_AM
        : SERVICES.LIST_NOTIFICATION,
      params: {
        page,
        size: 10,
      },
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then(({ data, meta }) => {
        const hasMore = meta.page >= meta.totalPage ? false : true;
        const normalize = {
          data: [...oldData, ...data],
          hasMore,
          meta: meta,
        };

        callback({ page: parseInt(meta.page) + 1 });
        dispatch(doneLoadingAction());
        dispatch(setDataNotification(normalize));
      })
      .catch(() => {
        dispatch(doneLoadingAction());
        dispatch(setDataNotification({ data: [], meta: {}, hasMore: false }));
      });
  };
}

export function readNotification({ id, data }) {
  const listData = [...data.data];
  return (dispatch) => {
    const options = {
      method: 'PUT',
      url: SERVICES.UPDATE_NOTIFICATION(id),
      headers: {
        Authorization: getToken(),
      },
    };
    fetch(options)
      .then(() => {
        const updatedData = [...listData];
        const index = updatedData.findIndex(
          (item) => item.notificationId === id,
        );

        updatedData[index] = {
          ...updatedData[index],
          isRead: true,
        };

        const resData = {
          data: updatedData,
          meta: {
            ...data.meta,
            // count:
          },
          hasMore: true,
        };

        dispatch(setDataNotification(resData));
      })
      .catch();
  };
}

export function clickNotification() {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      url: SERVICES.CLICK_NOTIFICATION_ACTIVATE,
      headers: {
        Authorization: getToken(),
      },
    };
    fetch(options)
      .then(() => {
        getNotification({ oldData: [], page: 1, callback: noop })(dispatch);
      })
      .catch();
  };
}

function setDataNotification(data) {
  return { type: ACTIONS.NOTIFICATION, data };
}

function loadingAction() {
  return { type: ACTIONS.LOADING_NOTIFICATION };
}

function doneLoadingAction() {
  return { type: ACTIONS.DONE_LOADING_NOTIFICATION };
}
