import fetch from '../../../utils/fetch';
import { SERVICES } from '../../../configs';
import { getToken } from '../../../utils/common';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncValidate = (values) => {
  return sleep(1000).then(() => {
    const options = {
      method: 'GET',
      params: {
        search: values.ticketId,
      },
      url: SERVICES.SEARCH_TICKET_NUMBER,
      headers: {
        Authorization: getToken(),
      },
    };
    return fetch(options)
      .then(() => {
        return Promise.resolve();
      })
      .catch(({ message }) => {
        throw { ticketId: message };
      });
  });
};

export default asyncValidate;
