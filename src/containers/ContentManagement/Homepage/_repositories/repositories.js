import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';
import { create_UUID } from '@utils/text';

export const getList = (opt, tab) => {
  const url = {
    bannerHero: `/explore/v5/banner`,
    brochure: `/explore/v2/media`,
    popup: '/explore/v1/popup-banner',
  }[tab];

  const options = {
    ...opt,
    method: 'GET',
    url,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

//Brochure
export const fetchSubmitBrochure = (data, method, id) => {
  const options = {
    data,
    method,
    url: id ? `/explore/v2/media/${id}` : '/explore/v2/media',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getUrlMedia = () => (file) => {
  let data = new FormData();
  let fileImage = file;

  const nameImage = file.name.replace(/\s+/g, '-');
  fileImage = new File([file], nameImage, { type: file.type });

  data.append('mediaPath', fileImage);
  data.append('mediaId', create_UUID(true));
  data.append('mediaName', file.name);

  const options = {
    method: 'POST',
    url: '/explore/v1/media',
    data,
    headers: { Authorization: getAccessToken() },
  };

  return fetch(options);
};

export const deleteMedia = (mediaId) => {
  const options = {
    method: 'DELETE',
    url: `/explore/v1/media/${mediaId}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getDetailBrochure = (id) => {
  const options = {
    method: 'GET',
    url: `/explore/v2/media/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const deleteBrochure = (id) => {
  const options = {
    method: 'DELETE',
    url: `/explore/v2/media/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const fetchSubmitContent = ({ data, method, id }) => {
  const options = {
    data,
    method,
    url: id ? `/explore/v4/banner/${id}` : '/explore/v4/banner',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const translateText = ({ params, data }) => {
  const options = {
    method: 'POST',
    url: `/explore/v1/translate`,
    params,
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const saveTranslate = ({ localizations, data }) => {
  let newData = [];

  localizations.map((lang) => {
    switch (lang.language) {
      case 'id':
        newData.push({
          ...lang,
          id: create_UUID(true),
          title: data[0], //titleid
          description: data[1], //descriptionid
        });
        break;
      case 'en':
        newData.push({
          ...lang,
          id: create_UUID(true),
          title: data[2], //titleen
          description: data[3], //descriptionen
        });
        break;
      default:
        break;
    }
  });

  return newData;
};

export const getDetailBanner = (id) => {
  const options = {
    method: 'GET',
    url: `/explore/v5/banner/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getListProduct = (opt) => {
  const options = {
    ...opt, //product v1
    method: 'GET',
    // url: '/explore/v5/product?useAtDropdown=true&relatedType=banner', //product v2
    url: `/explore/v2/product`, //product v1
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getSlugByCatId = (catId) => {
  const options = {
    method: 'GET',
    url: `/explore/v5/product/slug/${catId}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const updateShowHide = ({ id, data }) => {
  const options = {
    method: 'PUT',
    url: `/explore/v4/banner/${id}`,
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const deleteContent = (id) => {
  const options = {
    params: {
      type: 'banner',
    },
    method: 'DELETE',
    url: `/explore/v5/banner/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const checkValidationUnique = ({ data, type, action, id }) => {
  const options = {
    method: 'POST',
    url:
      action === 'update'
        ? `/explore/v1/validation?type=${type}&action=${action}&id=${id}`
        : `/explore/v1/validation?type=${type}&action=${action}`,
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const fetchReorder = ({ type, data }) => {
  const options = {
    method: 'PUT',
    url: `/explore/v1/reorder?type=${type}`,
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

// Pop Up

export const getDetailPopUp = (id) => {
  const options = {
    method: 'GET',
    url: `/explore/v1/popup-banner/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const deletePopUp = (id) => {
  const options = {
    method: 'DELETE',
    url: `/explore/v1/popup-banner/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export function updatePopUp(id, payload) {
  const otherOptions = {
    true: {
      method: 'PUT',
      url: `/explore/v1/popup-banner/${id}`,
    },
    false: {
      method: 'POST',
      url: `/explore/v1/popup-banner`,
    },
  }[!!id];

  const options = {
    ...otherOptions,
    data: payload,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
}

export const postUploadFile = (file) => {
  const data = new FormData();
  data.append('media', file);
  data.append('type', 'popup');
  data.append('name', file?.name);
  data.append('description', file?.name);

  const options = {
    data,
    method: 'POST',
    url: '/explore/v2/media',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const postBanner = ({ params, data, method }) => {
  const options = {
    method,
    url: `/explore/v5/banner`,
    params,
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};
