import { ACTIONS } from '../constants';

export const setAlert =
  ({ content, success, loading, eventClose, ...others }) =>
  (dispatch) => {
    const onClose = () => {
      dispatch({
        type: ACTIONS.POPUP_ALERT,
        data: {
          content: '',
          success,
          loading,
        },
      });

      if (eventClose) {
        eventClose();
      }
    };

    dispatch({
      type: ACTIONS.POPUP_ALERT,
      data: {
        content,
        success,
        loading,
        onClose,
        ...others,
      },
    });
  };
