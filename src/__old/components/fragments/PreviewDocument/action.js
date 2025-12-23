import { getToken } from '../../../utils/common';
import fetch from '../../../utils/fetch';

export function generateFile(data, endpoint, setFile) {
  const options = {
    method: 'POST',
    url: endpoint,
    data,
    headers: {
      Authorization: getToken(),
    },
  };
  fetch(options)
    .then(({ data: { documentUrl } }) => {
      setFile(documentUrl);
    })
    .catch(() => {
      setFile(null);
    });
}

export function generatePreviewFile(data, endpoint, setFile) {
  const options = {
    method: 'POST',
    url: endpoint,
    data,
    headers: {
      Authorization: getToken(),
    },
  };
  fetch(options)
    .then(({ data: { fileUrl } }) => {
      setFile(fileUrl);
    })
    .catch(() => {
      setFile(null);
    });
}
