import fetch from '@__old/utils/fetch';
import { SERVICES } from '@__old/configs';
import { getToken } from '@__old/utils/common';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncValidate = (values, dispatch, props, currentFieldName) => {
  const { asyncErrors } = props || {};
  const fieldMatch = currentFieldName?.match(
    /(telkomApproval|customerApproval)\[(\d)\]/,
  );
  if (fieldMatch && values?.approvalType === 'digital') {
    if (Number(fieldMatch[2]) === Number(values[fieldMatch[1]]?.length - 1)) {
      return sleep(1000).then(() => {
        const options = {
          method: 'GET',
          params: {
            search: values[fieldMatch[1]][fieldMatch[2]].email,
          },
          url: SERVICES.BAKES_EMAIL_VERIFICATION_PERURI,
          headers: {
            Authorization: getToken(),
          },
        };
        return fetch(options)
          .then(() => {
            // Resolve if validation is successful
            return Promise.resolve();
          })
          .catch(({ message }) => {
            // Create an error object with the correct structure
            let error;
            if (!asyncErrors) {
              error = {
                [fieldMatch[1]]: {
                  [fieldMatch[2]]: {
                    email: message,
                  },
                },
              };
            } else {
              error = {
                ...asyncErrors,
                [fieldMatch[1]]: {
                  ...asyncErrors[fieldMatch[1]],
                  [fieldMatch[2]]: {
                    email: message,
                  },
                },
              };
            }

            // Reject with the error object to propagate the error to the corresponding field
            throw error;
          });
      });
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
};

export default asyncValidate;
