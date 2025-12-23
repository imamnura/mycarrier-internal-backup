import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

// LIST
export const getListUserManagement = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/users-management/v2?nameApp=mycarrier',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getOptionsSegment = () => {
  const options = {
    headers: {
      Authorization: getAccessToken(),
    },
    method: 'GET',
    url: '/users-management/v2/segment',
  };

  return fetch(options);
};

export const getOptionsRoleType = () => {
  const options = {
    headers: {
      Authorization: getAccessToken(),
    },
    method: 'GET',
    url: '/users-management/v2/role',
  };

  return fetch(options);
};

export const getDownloadUserManagement = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/users-management/v2/download',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getDetailUserManagement = (userId) => {
  const options = {
    headers: {
      Authorization: getAccessToken(),
    },
    method: 'GET',
    url: `/users-management/v2/${userId}`,
  };

  return fetch(options);
};

export const getOptionsCompanyName = (params) => {
  const options = {
    params: {
      segment: 'mycarrier',
      preAccount: 'false',
      ...params,
    },
    withCancel: true,
    method: 'GET',
    url: '/users-management/v2/customer-account',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getOptionsRole = (params) => {
  const options = {
    headers: {
      Authorization: getAccessToken(),
    },
    method: 'GET',
    params,
    url: '/users-management/v2/role',
  };

  return fetch(options);
};

export const getPreviewPrivilege = (roleId, params) => {
  const options = {
    headers: {
      Authorization: getAccessToken(),
    },
    method: 'GET',
    params,
    url: `/users-management/v2/role/preview-privilege/${roleId}`,
  };

  return fetch(options);
};

export const getLdapProfile = (params) => {
  const options = {
    headers: {
      Authorization: getAccessToken(),
    },
    method: 'GET',
    params,
    url: '/users-management/v2/ldap-profile',
  };

  return fetch(options);
};

export const postCreateUser = (data) => {
  const options = {
    data,
    headers: {
      Authorization: getAccessToken(),
    },
    method: 'POST',
    url: '/users-management/v2/request-user',
  };

  return fetch(options);
};

export const putApprovalUser = (data) => {
  const options = {
    data,
    headers: {
      Authorization: getAccessToken(),
    },
    method: 'PUT',
    url: '/users-management/v2/auth/approval-user',
  };
  return fetch(options);
};

export const putUpdateUser = (userId, data) => {
  const options = {
    data,
    headers: {
      Authorization: getAccessToken(),
    },
    method: 'PUT',
    url: `/users-management/v2/update/${userId}`,
  };

  return fetch(options);
};
