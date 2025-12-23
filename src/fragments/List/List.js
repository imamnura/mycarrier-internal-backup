import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@legion-ui/core';
import Table from '@components/Table';
import HeaderAndFilter from '../HeaderAndFilter/HeaderAndFilter';
import Filter from '@fragments/Filter';

// let rawSize =
//   typeof document !== 'undefined'
//     ? Math.ceil(document.documentElement.clientHeight / 80)
//     : 0;
export const size = 10;

const List = (props) => {
  const {
    action,
    filter,
    breadcrumb,
    onBottomPage,
    search,
    status,
    table,
    tabs,
    withTopDivider,
    // title,
    noMargin,
    noPadding,
    id = 'list-section',
  } = props;

  useEffect(() => {
    window.onscroll = () => {
      const scroll =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 40;
      if (scroll && window.scrollY > 0) {
        onBottomPage();
      }
    };

    return () => {
      window.onscroll = () => {};
    };
  });

  const title = tabs.options.find(({ value }) => value === tabs.value)?.label;

  return (
    <>
      <HeaderAndFilter
        action={action}
        breadcrumb={breadcrumb}
        status={status}
        tabs={tabs}
        withTopDivider={withTopDivider}
      />
      <Box
        id={id}
        background="white"
        padding={noPadding ? 0 : '24px 32px'}
        radius="8px"
        margin={
          tabs.options.length
            ? '0px 40px 20px 40px'
            : noMargin
              ? 0
              : '20px 40px'
        }
      >
        {title && (
          <Text color="secondary500" as="h6" mb="16px">
            {title}
          </Text>
        )}
        <Box mb="10px">
          <Filter filter={filter} search={search} />
        </Box>

        <Table size={table?.meta?.size || size} {...table} />
      </Box>
    </>
  );
};

List.defaultProps = {
  action: [],
  breadcrumb: [],
  filter: [],
  onBottomPage: () => {},
  search: null,
  status: undefined,
  table: {},
  tabs: {
    onChange: () => {},
    options: [],
    value: '',
  },
  withTopDivider: true,
  title: '',
  noMargin: false,
  noPadding: false,
};

List.propTypes = {
  action: PropTypes.array,
  breadcrumb: PropTypes.array,
  filter: PropTypes.array,
  onBottomPage: PropTypes.func,
  search: PropTypes.object,
  status: PropTypes.object,
  table: PropTypes.object,
  tabs: PropTypes.object,
  withTopDivider: PropTypes.bool,
  title: PropTypes.string.isRequired,
  noMargin: PropTypes.bool,
  noPadding: PropTypes.bool,
};

export default List;
