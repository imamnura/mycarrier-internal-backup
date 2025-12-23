import React from 'react';
import PropTypes from 'prop-types';
import { isHaveAccess } from '@utils/common';
import ShowIcon from './lib/ShowIcon';
import List from '@fragments/List';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import { textLimit } from '@utils/text';
import color from '@styles/color';
import Edit from '@assets/icon-v2/Edit';
import { IconButton } from '@material-ui/core';
import Trash from '@assets/icon-v2/Trash';

const ArticleList = (props) => {
  const { feature } = props;

  const {
    list,
    onAddArticle,
    onDeleteArticle,
    onUpdateArticle,
    search,
    setSearch,
    sortBy,
    setSortBy,
    orderBy,
    setOrderBy,
    loadingTable,
    onPaginationChange,
    page,
    locatorId,
  } = useActions(props);

  const actionButton = () => {
    let button = [];

    if (isHaveAccess(feature, 'create_article')) {
      button.push({
        children: 'ADD ARTICLE',
        onClick: onAddArticle,
        id: locatorId?.addArticle,
      });
    }

    return button;
  };

  const tableList = list.data.map((item) => ({
    ...item,
    image: textLimit(item.imageUrl, 90),
    operations: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <ShowIcon
          displayArticle={item.isDisplay}
          feature={feature}
          id={item.id}
          title={item.title}
          locatorId={locatorId?.action?.showHide}
        />
        <IconButton
          id={locatorId?.action?.edit}
          onClick={() => onUpdateArticle(item.id)}
          size="small"
          style={{ color: color.yellow.main }}
        >
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          id={locatorId?.action?.delete}
          onClick={() => onDeleteArticle(item.id)}
          size="small"
          style={{ color: color.primary.main }}
        >
          <Trash fontSize="small" />
        </IconButton>
      </div>
    ),
  }));

  const listProps = {
    title: 'Article Management',
    breadcrumb: [{ label: 'Article Management' }],
    action: actionButton(),
    search: {
      placeholder: 'Search Article Name..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableList,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sortBy, setSortBy],
      onPaginationChange: onPaginationChange,
      schema: tableHeader,
    },
  };

  return <List {...listProps} />;
};

ArticleList.defaultProps = {};

ArticleList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default ArticleList;
