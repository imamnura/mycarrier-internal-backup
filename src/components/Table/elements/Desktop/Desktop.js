import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, IconButton } from '@material-ui/core';
import ArrowKeyboardDown from '../../../../assets/icon-v2/ArrowKeyboardDown';
import Information from '../../../../assets/icon-v2/Information';
import NoData from '@assets/ilustration-v2/NoData';
import Typography from '../../../Typography';
import Checkbox from '../../../Checkbox';
import Skeleton from '../../../Skeleton';
import useStyles from './styles';
import Status from '../../../Status';
import Tooltip from '../../../Tooltip';
import { getValueObject } from '../../../../utils/common';
import { dateFormat, rupiahFormat } from '@utils/parser';
import StateMessage from '@components/StateMessage';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { capitalize } from '@utils/text';
import { Pagination } from '@material-ui/lab';
import useResponsive from '@utils/hooks/useResponsive';
// import { Pagination } from '@legion-ui/core';

const TableDesktop = (props) => {
  const {
    customBody,
    customEmptyMessage,
    customItem,
    customStyles,
    data,
    emptyMessage,
    headerAlign,
    id = 'table-row',
    loading,
    loadingRoot,
    maxHeight,
    meta,
    numbering,
    onBottomPage,
    onClickRow: _onClickRow,
    onPaginationChange,
    page,
    pickedRow,
    pickedRowKey,
    schema: _schema,
    selectedRowKey,
    selectedRowSticky,
    selectWithRawData,
    size,
    useCollapseChild,
    useOrderBy,
    useOrderDirection,
    useSelectedRow,
  } = props;

  const classes = useStyles({
    size,
    customBody,
    headerAlign,
    customItem,
    maxHeight,
    customStyles,
  });

  const [orderBy, setOrderBy] = useOrderBy;
  const [orderDirection, setOrderDirection] = useOrderDirection;
  const [selectedRow, setSelectedRow] = useSelectedRow;
  const [collapseChild, _setCollapseChild] = useCollapseChild || [{}, null];

  const setCollapseChild =
    (val, currentId = 'xx') =>
    () => {
      let res = {};

      const keys = Object.keys(val);

      keys.forEach((key) => {
        let states = !!val[key];

        if (key.includes(currentId) && val[currentId] === false) {
          states = false;
        }

        res[key] = states;
      });
      _setCollapseChild(res);
    };

  const isSelectedRow = useSelectedRow.length > 0;

  const schemaMofifier = () => {
    let schemaRes = _schema;

    if (numbering) {
      schemaRes = [
        {
          cellStyle: {
            maxWidth: 64,
            minWidth: 64,
            width: 64,
          },
          label: 'No.',
          name: 'number',
        },
        ...schemaRes,
      ];
    }

    if (useCollapseChild) {
      schemaRes = [
        {
          cellStyle: {
            maxWidth: 64,
            minWidth: 64,
            width: 64,
          },
          name: 'expand',
        },
        ...schemaRes,
      ];
    }

    if (isSelectedRow) {
      schemaRes = [
        {
          cellStyle: {
            maxWidth: 64,
            minWidth: 64,
            width: 64,
            position: selectedRowSticky ? 'sticky' : '',
            left: 0,
          },
          name: 'checkbox',
        },
        ...schemaRes,
      ];
    }

    return schemaRes;
  };

  const schema = schemaMofifier();

  const onOrderChange =
    ({ name, sort }) =>
    () => {
      if (sort && !loadingRoot) {
        if (name === orderBy) {
          const direction = orderDirection === 'desc' ? 'asc' : 'desc';
          setOrderDirection(direction);
        } else {
          setOrderDirection('asc');
          setOrderBy(name);
        }
      }
    };

  const onClickRow = (dataItem) => (e) => {
    if (_onClickRow) {
      e.stopPropagation();
      _onClickRow(dataItem);
    }
  };

  const isRowSelected = (value) => {
    if (selectWithRawData) {
      if (
        selectedRow.length > 0 &&
        selectedRow.some((row) => row[selectedRowKey] === value[selectedRowKey])
      ) {
        return true;
      }
      return false;
    }

    return selectedRow.indexOf(value) !== -1;
  };

  const onSelectedRow = (value) => () => {
    if (isRowSelected(value)) {
      // setSelectedRow(selectedRow.filter((v) => v !== value));
      setSelectedRow(
        selectedRow.filter((v) => v[selectedRowKey] !== value[selectedRowKey]),
      );
    } else {
      setSelectedRow([...selectedRow, value]);
    }
  };

  const isHeadRowSelected = () => {
    // if (event.target.checked) {
    if (selectedRow.length != data?.length) {
      if (selectWithRawData) {
        setSelectedRow(data);
      } else {
        setSelectedRow(data?.map((d) => d[selectedRowKey]));
      }
    } else {
      setSelectedRow([]);
    }
  };

  const generateLoading = (s) =>
    s && (
      <>
        {new Array(s).fill(null).map((l, k) => (
          <tr key={k}>
            {schema.map(
              (j, h) =>
                !j?.hidden && (
                  <td className={classes.loadingRow} key={h}>
                    <Skeleton height={20} width="100%" />
                  </td>
                ),
            )}
          </tr>
        ))}
      </>
    );

  const renderLoadingRoot = generateLoading(loadingRoot ? size : null);
  const renderLoading = generateLoading(loading && !loadingRoot ? 2 : null);

  const renderNotFound =
    !loadingRoot &&
    !data?.length &&
    (!customEmptyMessage ? (
      <div className={classes.boxNotFound}>
        <StateMessage
          description={emptyMessage?.description}
          ilustration={emptyMessage?.icon || NoData}
          maxWidth={emptyMessage?.maxWidth}
          message={emptyMessage?.message}
          size={emptyMessage?.size}
        />
      </div>
    ) : (
      customEmptyMessage
    ));

  const [scrolledY, setScrolledY] = useState(false);
  const mobileClient = useResponsive('sm');

  const renderCell = (tc) => {
    return (
      <td
        key={tc.key}
        style={{
          ...tc.style,
          position: mobileClient ? '' : tc?.style?.position,
          borderRight:
            !mobileClient && scrolledY && !!data?.length
              ? tc?.style?.borderRight || 'none'
              : 'none',
        }}
      >
        <div className={classes.tbItem}>{tc.children}</div>
      </td>
    );
  };

  const renderChild = (parentData) => {
    const childData = parentData.child;
    return (
      <Fragment key={parentData?.hierarchy}>
        {childData?.map((dataChild, iChild) => (
          <Fragment key={`child-${iChild}`}>
            <tr
              className={clsx({
                [classes.tBody]: true,
                [classes.tBodyClickable]: !!_onClickRow || !!pickedRowKey,
                [classes.tBodyPicked]:
                  pickedRow && parentData[pickedRowKey] === pickedRow,
              })}
              key={`tableChild-${iChild}`}
              style={{
                display: collapseChild?.[parentData?.hierarchy] ? '' : 'none',
              }}
            >
              {schema.map((bodyItem) => {
                const name = bodyItem.name;
                let value = getValueObject({ name, data: dataChild }) || ' ';

                if (name === 'expand') {
                  if (!dataChild.child) {
                    return renderCell({
                      style: bodyItem.cellStyle,
                      key: `${name}-${value}`,
                      children: <Typography children="" />,
                    });
                  }

                  return renderCell({
                    style: bodyItem.cellStyle,
                    key: `${name}-${value}`,
                    children: (
                      <Box display="flex" justifyContent="center" width="100%">
                        <IconButton
                          aria-label="expand row"
                          id="expand-child-row"
                          onClick={setCollapseChild(
                            {
                              ...collapseChild,
                              [dataChild.hierarchy]:
                                !collapseChild[dataChild.hierarchy],
                            },
                            dataChild.hierarchy,
                          )}
                          size="small"
                        >
                          {collapseChild[dataChild.hierarchy] ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                      </Box>
                    ),
                  });
                }

                return renderCell({
                  style: bodyItem.cellStyle,
                  key: `${name}-${value}`,
                  children: <Typography children={value} />,
                });
              })}
            </tr>
            {dataChild.child && renderChild(dataChild)}
          </Fragment>
        ))}
      </Fragment>
    );
  };

  const renderData = !loadingRoot && (
    <>
      {data?.length > 0 &&
        data.map((dataItem, i) => (
          <Fragment key={`data-${i}`}>
            <tr
              className={clsx({
                [classes.tBody]: true,
                [classes.tBodyClickable]: !!_onClickRow || !!pickedRowKey,
                [classes.tBodyPicked]:
                  pickedRow && dataItem[pickedRowKey] === pickedRow,
              })}
              id={`${id}-${i}`}
              key={`tableData-${i}`}
              onClick={onClickRow(dataItem)}
            >
              {schema.map((bodyItem) => {
                const name = bodyItem.name;
                let value = getValueObject({ name, data: dataItem }) || '-';
                if (bodyItem.hidden) return null;
                if (name === 'checkbox') {
                  return renderCell({
                    style: bodyItem.cellStyle,
                    key: `${name}-${value}`,
                    children: (
                      <Box display="flex" justifyContent="center" width="100%">
                        <Checkbox
                          checked={isRowSelected(
                            selectWithRawData
                              ? dataItem
                              : dataItem[selectedRowKey],
                          )}
                          id={`checkbox-${i}`}
                          onChange={onSelectedRow(
                            selectWithRawData
                              ? dataItem
                              : dataItem[selectedRowKey],
                          )}
                        />
                      </Box>
                    ),
                  });
                }

                if (name === 'expand') {
                  if (!dataItem.child) {
                    return renderCell({
                      style: bodyItem.cellStyle,
                      key: `${name}-${value}`,
                      children: <Typography children="" />,
                    });
                  }

                  return renderCell({
                    style: bodyItem.cellStyle,
                    key: `${name}-${value}`,
                    children: (
                      <Box display="flex" justifyContent="center" width="100%">
                        <IconButton
                          aria-label="expand row"
                          id="expand-row"
                          onClick={setCollapseChild({
                            [dataItem.hierarchy]:
                              !collapseChild[dataItem.hierarchy],
                          })}
                          size="small"
                        >
                          {collapseChild[dataItem.hierarchy] ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                      </Box>
                    ),
                  });
                }

                if (['string', 'number'].includes(typeof value)) {
                  if (bodyItem.name === 'number') {
                    if (onPaginationChange) {
                      const _page = meta.page > 0 ? meta.page : 1;
                      value = (_page - 1) * size + i + 1;
                    } else {
                      value = i + 1;
                    }
                  }

                  if (bodyItem.formatDate) {
                    value = dateFormat({
                      date: value,
                      type: bodyItem.formatDate,
                      empty: '-',
                    });
                  }

                  if (bodyItem.currency) {
                    value = rupiahFormat(value);
                  }

                  if (bodyItem?.converter) {
                    value = bodyItem.converter(value);
                  }

                  if (bodyItem.currencyNumberOnly) {
                    value = rupiahFormat(value, true);
                  }

                  if (bodyItem.schemaStatus && value !== '-') {
                    return renderCell({
                      style: bodyItem.cellStyle,
                      key: `${name}-${value}`,
                      children: bodyItem.tooltip ? (
                        <Tooltip
                          arrow
                          placement="top"
                          title={bodyItem.tooltip[value] || '-'}
                        >
                          <span>
                            <Status
                              children={value}
                              variant={bodyItem.schemaStatus[value]}
                            />
                          </span>
                        </Tooltip>
                      ) : (
                        <Status
                          children={value}
                          variant={bodyItem.schemaStatus[value]}
                        />
                      ),
                    });
                  }

                  return renderCell({
                    style: bodyItem.cellStyle,
                    key: `${name}-${value}`,
                    children: <Typography children={value} />,
                  });
                }

                return renderCell({
                  style: bodyItem.cellStyle,
                  key: `${name}-${value}`,
                  children: value,
                });
              })}
            </tr>
            {renderChild(dataItem)}
          </Fragment>
        ))}
    </>
  );

  const totalData =
    (meta.page >= meta.totalPage ? meta.totalData : meta.size * meta.page) || 0;
  const showPageInformation = meta.page > 0 && data?.length > 0;

  const renderPageInformation = showPageInformation && (
    <div
      className={
        onPaginationChange
          ? classes.pageInformationPagination
          : classes.pageInformation
      }
    >
      {meta.updatedOn && (
        <Typography variant="caption">
          Updated on{' '}
          <strong>
            {dateFormat({ date: meta.updatedOn, type: 'full-date-time' })}
          </strong>
        </Typography>
      )}
      {showPageInformation && (
        <Typography variant="caption">
          <>
            {!!onPaginationChange && data?.length > 0 ? (
              <>
                Showing{' '}
                <strong>
                  {data.length < 10 ? data.length : meta.size || size}{' '}
                </strong>
                data from <strong>{meta.totalData} data</strong>
              </>
            ) : (
              <>
                Showing <strong>{totalData}</strong> data from{' '}
                <strong>{meta.totalData} data</strong>
              </>
            )}
            {/*  */}
          </>
        </Typography>
      )}
    </div>
  );

  const onScroll = (e) => {
    setScrolledY(e.currentTarget.scrollLeft > 0);

    // if (onBottomPage && !onPaginationChange) {
    if (onBottomPage) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const scroll = scrollHeight - clientHeight - scrollTop <= 40;
      if (scroll && scrollHeight > 0) {
        onBottomPage();
      }
    }
  };
  return (
    <>
      <div className={classes.root} onScroll={onScroll}>
        <table className={classes.table} id={id}>
          <thead className={classes.tHeader}>
            <tr>
              {schema.map((headItem) => {
                if (headItem.hidden) return null;
                if (headItem.name === 'checkbox') {
                  return (
                    <td key={headItem.name} style={headItem.cellStyle}>
                      <div className={classes.thItem}>
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                        >
                          <Checkbox
                            checked={
                              data?.length > 0 &&
                              selectedRow.length === data?.length
                            }
                            id="checkbox-h"
                            // indeterminate={
                            //   selectedRow.length > 0 &&
                            //   selectedRow.length < data?.length
                            // }
                            // variant={
                            //   selectedRow.length > 0 &&
                            //   selectedRow.length < data?.length
                            //     ? 'min'
                            //     : 'check'
                            // }
                            onChange={isHeadRowSelected}
                          />
                        </Box>
                      </div>
                    </td>
                  );
                }
                return (
                  <td
                    key={headItem.name}
                    style={{
                      ...headItem.cellStyle,
                      ...headItem.headStyle,
                      position: mobileClient
                        ? ''
                        : headItem?.cellStyle?.position,
                      borderRight:
                        !mobileClient && scrolledY
                          ? headItem?.cellStyle?.borderRight || 'none'
                          : 'none',
                    }}
                  >
                    <div className={classes.thItem}>
                      <div
                        className={clsx({
                          [classes.flex]: true,
                          [classes.thItemSortable]:
                            headItem.sort && !loadingRoot,
                          [classes.tooltipHead]: headItem.hasTooltipHeader,
                        })}
                        id={`th-${headItem.name}`}
                        onClick={onOrderChange(headItem)}
                      >
                        {headItem.hasTooltipHeader && (
                          <Tooltip
                            arrow
                            placement="top"
                            title={headItem.tooltipHeader}
                          >
                            <span style={{ display: 'flex', margin: '0 5px' }}>
                              <Information style={{ width: 16, height: 16 }} />
                            </span>
                          </Tooltip>
                        )}
                        {typeof headItem.label === 'string' ? (
                          <Typography
                            children={
                              headItem.cellStyle?.textTransform
                                ? headItem.label
                                : capitalize(headItem.label)
                            }
                            variant="subtitle2"
                            weight="bold"
                          />
                        ) : (
                          <>{headItem.label}</>
                        )}
                        <Box
                          className={classes.flex}
                          pl={1}
                          style={{
                            opacity:
                              headItem.name === orderBy && !loadingRoot ? 1 : 0,
                            transition: '200ms',
                          }}
                        >
                          <ArrowKeyboardDown
                            className={clsx({
                              [classes.sortIcon]: true,
                              [classes.sortIconRotate]:
                                orderDirection === 'asc',
                            })}
                          />
                        </Box>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {renderLoadingRoot}
            {renderData}
            {renderLoading}
          </tbody>
        </table>

        {renderNotFound}
      </div>
      {!!onPaginationChange && data?.length ? (
        <div className={classes.pagination}>
          {renderPageInformation}
          <div className={classes.wrapperPagination}>
            <Pagination
              color="primary"
              count={Math.ceil(meta.totalData / (meta.size || size))}
              onChange={onPaginationChange}
              page={page}
              shape="rounded"
              id={`${id}-pagination`}
            />
          </div>
        </div>
      ) : (
        renderPageInformation
      )}
    </>
  );
};

TableDesktop.defaultProps = {
  page: 1,
  customBody: null,
  customEmptyMessage: null,
  customItem: null,
  customStyles: {},
  data: [],
  emptyMessage: 'Data not found',
  headerAlign: 'flex-start',
  loading: false,
  loadingRoot: false,
  maxHeight: null,
  meta: {
    page: 1,
    totalData: 0,
    totalPage: 0,
  },
  numbering: true,
  onBottomPage: null,
  onPaginationChange: null,
  onClickRow: null,
  pickedRow: '',
  pickedRowKey: '',
  schema: [],
  selectedRowKey: 'key',
  selectWithRawData: false,
  size: 10,
  useCollapseChild: null,
  useOrderBy: [null, () => {}],
  useOrderDirection: [null, () => {}],
  useSelectedRow: [],
  selectedRowSticky: false,
};

TableDesktop.propTypes = {
  page: PropTypes.number,
  customBody: PropTypes.object,
  customEmptyMessage: PropTypes.node,
  customItem: PropTypes.object,
  customStyles: PropTypes.object,
  data: PropTypes.array,
  emptyMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.object,
  ]),
  headerAlign: PropTypes.string,
  loading: PropTypes.bool,
  loadingRoot: PropTypes.bool,
  maxHeight: PropTypes.number,
  meta: PropTypes.object,
  numbering: PropTypes.bool,
  onBottomPage: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onClickRow: PropTypes.func,
  pickedRow: PropTypes.string,
  pickedRowKey: PropTypes.string,
  schema: PropTypes.array,
  selectedRowKey: PropTypes.bool,
  selectWithRawData: PropTypes.string,
  size: PropTypes.number,
  useCollapseChild: PropTypes.array,
  useOrderBy: PropTypes.array,
  useOrderDirection: PropTypes.array,
  useSelectedRow: PropTypes.array,
  selectedRowSticky: PropTypes.bool,
};

export default TableDesktop;
