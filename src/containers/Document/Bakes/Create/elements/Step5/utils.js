export const uniqueMail = (v, allValues) => {
  const { telkomApproval = [], customerApproval = [] } = allValues || {};

  let count = 0;

  [...telkomApproval, ...customerApproval].forEach(({ email }) => {
    if (email === v) count += 1;
  });

  if (count > 1) {
    return "'Email' must be a unique email";
  }

  return undefined;
};

export const uniquePhone = (v, allValues) => {
  const { telkomApproval = [], customerApproval = [] } = allValues || {};

  let count = 0;

  [...telkomApproval, ...customerApproval].forEach(({ phoneNumber }) => {
    if (phoneNumber === v) count += 1;
  });

  if (count > 1) {
    return "'Phone Number' must be a unique phone number";
  }

  return undefined;
};

export const formatPhoneNumber = (value) => {
  if (value === undefined) {
    return '"Phone Number" is required';
  }
  if (!/\+62\d+/.test(value) && typeof value !== 'undefined') {
    return '"Phone Number" must number with +62';
  }
  if (
    !/^(\+62)8[1-9][0-9]{6,9}$/g.test(value) &&
    typeof value !== 'undefined'
  ) {
    return '"Phone Number" is not valid';
  }
  return undefined;
};
