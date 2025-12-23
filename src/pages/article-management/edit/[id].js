import React from 'react';
import ArticleManagementEdit from '@containers/ContentManagement/Article/Create';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ArticleManagementPages() {
  return (
    <AfterLogin
      containers={ArticleManagementEdit}
      privileges={privileges.contentManagement.articleManagement}
    />
  );
}
