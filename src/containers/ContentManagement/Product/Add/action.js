/* eslint-disable max-len */
import { ACTIONS } from '@constants';
import fetch from '@__old/utils/fetch';
import { SERVICES } from '@__old/configs';
import { getToken } from '@__old/utils/common';

import { replacer, create_UUID } from './utils';

export const reset = () => (dispatch) => {
  dispatch({ type: ACTIONS.RESET });
};

export const addProduct =
  ({ body, callback, redirect, method, id }) =>
  (dispatch) => {
    const message = method === 'POST' ? 'Added' : 'Updated';
    const options = {
      method,
      url: SERVICES.CREATE_PRODUCT + id,
      data: body,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingSubmitAction());
    fetch(options)
      .then(() => {
        callback({
          content: `Product has been ${message}`,
          success: true,
          redirect,
        });
        dispatch(doneLoadingSubmitAction());
      })
      .catch((err) => {
        callback({
          content:
            typeof err.message === 'string'
              ? err.message
              : `Failed to ${message} Product`,
          success: false,
        });
        dispatch(doneLoadingSubmitAction());
      });
  };

export const getProduct =
  ({ id, callback }) =>
  (dispatch) => {
    const options = {
      method: 'GET',
      // url: `${SERVICES.CREATE_PRODUCT}/${id}`,
      url: `${SERVICES.DETAIL_PRODUCT}/${id}`,
      headers: {
        Authorization: getToken(),
      },
    };

    dispatch(loadingAction());
    fetch(options)
      .then(({ data }) => {
        const filterBaseLang = data.localizations.filter(
          (s) => s.baseLanguage === true,
        );
        const baseLang = filterBaseLang[0].metaData.map((item) => item);

        const filterTranslateLang = data.localizations.filter(
          (s) => s.baseLanguage === false,
        );
        let translateLang = [];

        let labelBaseLang = '';
        let valueBaseLang = '';
        let labelTranslateLang = '';
        let valueTranslateLang = '';

        //check if there is a base language
        if (filterBaseLang.length > 0) {
          labelBaseLang =
            filterBaseLang[0].language === 'en'
              ? 'Inggris'
              : 'Bahasa Indonesia';
          valueBaseLang = filterBaseLang[0].language;
        }

        //check if there is a translate language
        if (filterTranslateLang.length > 0) {
          const remappingTranslateLang = filterTranslateLang[0].metaData.map(
            (item) => item,
          );
          translateLang = remappingTranslateLang;

          labelTranslateLang =
            filterTranslateLang[0].language === 'en'
              ? 'Inggris'
              : 'Bahasa Indonesia';
          valueTranslateLang = filterTranslateLang[0].language;
        } else {
          if (valueBaseLang === 'en') {
            labelTranslateLang = 'Bahasa Indonesia';
            valueTranslateLang = 'id';
          } else {
            labelTranslateLang = 'Inggris';
            valueTranslateLang = 'en';
          }
        }

        const setLocalizations = data.localizations;

        const setListLanguage = [
          {
            id: '1',
            lang: labelBaseLang,
            value: valueBaseLang,
          },
          {
            id: '2',
            lang: labelTranslateLang,
            value: valueTranslateLang,
          },
        ];

        dispatch({ type: ACTIONS.PRODUCT_BASE_LANGUAGE, data: baseLang });
        dispatch({
          type: ACTIONS.PRODUCT_TRANSLATE_LANGUAGE,
          data: translateLang,
        });
        dispatch({
          type: ACTIONS.PRODUCT_LOCALIZATIONS,
          data: setLocalizations,
        });
        dispatch({
          type: ACTIONS.PRODUCT_LIST_LANGUAGE,
          data: setListLanguage,
        });

        dispatch(updateProduct(data));
        dispatch(createSection(baseLang));
        dispatch(doneLoadingAction());

        callback();
      })
      .catch(() => {
        dispatch(doneLoadingAction());
      });
  };

export const getCategoryProduct =
  (lev, query, setLoadingCategory) => (dispatch) => {
    const options = {
      method: 'GET',
      url: SERVICES.PRODUCT_CATEGORY + query,
      headers: {
        Authorization: getToken(),
      },
    };

    dispatch(loadingAction());
    fetch(options)
      .then(({ data }) => {
        if (lev === 'level 0') {
          dispatch(updateCategory(data));
          dispatch(updateCategory1([]));
          dispatch(updateCategory2([]));
        }
        if (lev === 'level 1') {
          dispatch(updateCategory1(data));
          dispatch(updateCategory2([]));
        }
        if (lev === 'level 2') {
          dispatch(updateCategory2(data));
        }

        dispatch(doneLoadingAction());
        setLoadingCategory && setLoadingCategory(lev);
      })
      .catch(() => {
        dispatch(doneLoadingAction());
        setLoadingCategory && setLoadingCategory(lev);
      });
  };

export const getUrlMedia =
  ({ data, callback, id }) =>
  (dispatch) => {
    const options = {
      method: 'POST',
      url: SERVICES.MEDIA,
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then(({ data }) => {
        dispatch(uploadMedia(data));
        callback(data, id);
        dispatch(doneLoadingAction());
      })
      .catch(() => {
        dispatch(doneLoadingAction());
      });
  };

export const deleteMedia = (data) => (dispatch) => {
  const options = {
    method: 'DELETE',
    url: SERVICES.MEDIA + data,
    headers: {
      Authorization: getToken(),
    },
  };
  dispatch(loadingAction());
  fetch(options)
    .then(() => {
      dispatch(doneLoadingAction());
    })
    .catch(() => {
      dispatch(doneLoadingAction());
    });
};

export const translateAll =
  ({ baseLanguage, fromLanguage, toLanguage, callback }) =>
  (dispatch) => {
    const options = {
      method: 'POST',
      url: `${SERVICES.TRANSLATE_IN_PRODUCT}?from=${fromLanguage}&to=${toLanguage}`,
      data: baseLanguage,
      headers: {
        Authorization: getToken(),
      },
    };

    dispatch(loadingAction());
    fetch(options)
      .then((data) => {
        const baseLang = {
          id: create_UUID(true),
          language: fromLanguage,
          baseLanguage: true,
          metaData: baseLanguage,
        };

        const transLang = {
          id: create_UUID(true),
          language: toLanguage,
          baseLanguage: false,
          metaData: data.data[toLanguage],
        };

        const remapping = [{ ...baseLang }, { ...transLang }];

        dispatch({ type: ACTIONS.PRODUCT_BASE_LANGUAGE, data: baseLanguage });
        dispatch({
          type: ACTIONS.PRODUCT_TRANSLATE_LANGUAGE,
          data: data.data[toLanguage],
        });
        dispatch({ type: ACTIONS.PRODUCT_LOCALIZATIONS, data: remapping });

        callback(data);
        dispatch(doneLoadingAction());
      })
      .catch((error) => {
        callback(error);
        dispatch(doneLoadingAction());
      });
  };

export const setUpdateProduct = (product) => (dispatch) => {
  dispatch(updateProduct(product));
};

export const createSection = (page) => (dispatch) => {
  dispatch(updateSection(page));
};

export const updateSectionPage = (page) => (dispatch) => {
  dispatch(updateSection(page));
};

export const setUpdateSection = (page, block) => (dispatch) => {
  let index = page.findIndex((el) => el._uid === block._uid);
  dispatch(updateSection(replacer(page, index, block)));
};

export const deleteSection = (page, block) => (dispatch) => {
  let deleteResult = [...page].filter((item) => item._uid !== block._uid);
  dispatch(updateSection(deleteResult));
};

export const setSection = (data) => (dispatch) => {
  return dispatch({ type: ACTIONS.PRODUCT_MANAGEMENT_ADD_SECTION, data });
};

function updateProduct(data) {
  return { type: ACTIONS.PRODUCT_MANAGEMENT_ADD, data };
}

function uploadMedia(data) {
  return { type: ACTIONS.PRODUCT_MANAGEMENT_MEDIA, data };
}

function updateCategory(data) {
  return { type: ACTIONS.PRODUCT_MANAGEMENT_CATEGORY, data };
}

function updateCategory1(data) {
  return { type: ACTIONS.PRODUCT_MANAGEMENT_CATEGORY1, data };
}

function updateCategory2(data) {
  return { type: ACTIONS.PRODUCT_MANAGEMENT_CATEGORY2, data };
}

function updateSection(data) {
  return { type: ACTIONS.PRODUCT_MANAGEMENT_SECTION, data };
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

export const validateSection = (data) => (dispatch) => {
  dispatch(updateValidate(data));
};

export const deleteValidate = (data, id) => (dispatch) => {
  let deleteResult = [...data].filter((item) => item._id !== id);
  dispatch(updateValidate(deleteResult));
};

function updateValidate(data) {
  return { type: ACTIONS.PRODUCT_MANAGEMENT_PAGE_VALID, data };
}
