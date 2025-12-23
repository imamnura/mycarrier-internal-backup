import React from 'react';
import ArticleManagementList from '@containers/ContentManagement/Article/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ArticleManagementPages() {
  return (
    <AfterLogin
      containers={ArticleManagementList}
      privileges={privileges.contentManagement.articleManagement}
    />
  );
}
