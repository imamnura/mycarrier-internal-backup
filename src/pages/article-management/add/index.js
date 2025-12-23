import React from 'react';
import ArticleManagementAdd from '@containers/ContentManagement/Article/Create';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ArticleManagementPages() {
  return (
    <AfterLogin
      containers={ArticleManagementAdd}
      privileges={privileges.contentManagement.articleManagement}
    />
  );
}
