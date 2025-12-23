import React, { Fragment } from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableSortLabel,
} from '@material-ui/core';
import Text from '../Text';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { getValueObject, noop } from '../../../utils/common';
import Sort from '../../../../assets/Svg/Sort';
import NoData from '../../../../assets/Svg/NoData';
import Skeleton from 'react-loading-skeleton';
import datetime from '../../../utils/datetime';
import Checkbox from '../Checkbox';

export default function Component(props) {
  const {
    classes,
    onSelectedRow,
    headCells,
    meta,
    bodyContent,
    isLoading,
    isLoadingRow,
    sort: { orderBy, direction, handler },
    checkbox,
  } = props;

  const { selected = [], setSelected } = checkbox || {};

  const numSelected = selected.length;
  const rowCount = bodyContent.length;

  const handleSelectAllClick = (event) => {
    const res = event.target.checked ? bodyContent.map((v) => v.key) : [];
    setSelected(res);
  };

  const isSelected = (value) => selected.indexOf(value) !== -1;

  const onCheckboxClick = (value) => {
    const isChecked = isSelected(value);
    const res = isChecked
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setSelected(res);
  };

  // Table Head
  const tableHead = (
    <TableRow>
      {checkbox ? (
        <TableCell padding="checkbox">
          <Checkbox
            checked={rowCount > 0 && numSelected === rowCount}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            onChange={handleSelectAllClick}
          />
        </TableCell>
      ) : (
        <TableCell
          align="left"
          className={clsx(classes.head, classes.numbering)}
        >
          No
        </TableCell>
      )}
      {headCells.map((item) => (
        <TableCell
          align={item.align || 'left'}
          className={clsx(classes.head, {
            [classes.oneLine]: item.oneLineHeader,
          })}
          key={item.id}
        >
          {item.sort ? (
            <TableSortLabel
              active={item.id === orderBy}
              classes={{
                root: classes.sortLabel,
                active: classes.sortActive,
              }}
              direction={direction}
              hideSortIcon
              IconComponent={Sort}
              onClick={() => handler(item.id)}
            >
              {item.label}
            </TableSortLabel>
          ) : (
            item.label
          )}
        </TableCell>
      ))}
    </TableRow>
  );

  const customRender = (value, item) => {
    if (!value) return '-';

    if (item.date) return datetime(value, 'choose');

    if (item.dateTime) return datetime(value, 'date-time');

    return value;
  };

  // Table Body
  const tableBody = (
    <Fragment>
      {bodyContent.map((row, idx) => (
        <TableRow
          classes={{ hover: classes.hover }}
          hover={onSelectedRow !== noop}
          key={idx}
          tabIndex={-1}
        >
          {checkbox ? (
            <TableCell padding="checkbox">
              <Checkbox
                checked={isSelected(row.key)}
                onClick={() => onCheckboxClick(row.key)}
              />
            </TableCell>
          ) : (
            <TableCell align="left">{idx + 1}</TableCell>
          )}
          {headCells.map((item) => (
            <TableCell
              align={item.align || 'left'}
              className={clsx(classes.body, {
                [classes.oneLine]: item.oneLineBody,
                [classes.cpname]: item.id === 'cpname',
                [classes.sid]: item.id === 'sid',
              })}
              key={item.id}
              onClick={() => onSelectedRow(row)}
            >
              {customRender(getValueObject({ name: item.id, data: row }), item)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Fragment>
  );

  // Row Loading
  const rowLoading = (length) => {
    let load = [];

    for (let i = 0; i < length; i++) {
      load.push(
        <TableRow key={'load-tbl-row' + i}>
          <TableCell
            children={<Skeleton height={56} />}
            className={classes.body}
            colSpan={headCells.length + 1}
          />
        </TableRow>,
      );
    }

    return load;
  };

  // Table Empty
  const tableEmpty = bodyContent.length < 1 && !isLoading && (
    <div className={classes.emptyData}>
      <NoData />
      <div className={classes.emptyContainer}>
        <Text variant="h5">
          None of your datas matched for this search. Try another search.
        </Text>
      </div>
    </div>
  );

  const totalData =
    meta.page >= meta.totalPages ? meta.totalData : meta.size * meta.page;

  const pageInfo = meta.page > 0 && !isLoading && bodyContent.length > 0 && (
    <div className={classes.meta}>
      <Text color="grey" variant="caption">
        Showing {totalData} data from {meta.totalData} data
      </Text>
    </div>
  );

  const rawSize = Math.ceil(document.documentElement.clientWidth / 150 - 1);
  const size = rawSize < 10 ? 10 : rawSize;

  return (
    <Fragment>
      <TableContainer>
        <Table>
          <TableHead
            children={tableHead}
            classes={{ root: classes.tableHead }}
          />
          <TableBody>
            {!isLoading && tableBody}
            {isLoading && rowLoading(size)}
            {isLoadingRow && rowLoading(2)}
          </TableBody>
        </Table>
      </TableContainer>
      {tableEmpty}
      {pageInfo}
    </Fragment>
  );
}

Component.defaultProps = {
  checkbox: null,
  classes: {},
  isLoading: false,
  isLoadingRow: false,
  meta: { totalData: 0, size: 0, page: 0 },
  onSelectedRow: noop,
  order: 'asc',
  orderBy: 'id',
  sort: {},
  sortHandler: noop,
};

Component.propTypes = {
  bodyContent: PropTypes.array.isRequired,
  checkbox: PropTypes.object,
  classes: PropTypes.object,
  headCells: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  isLoadingRow: PropTypes.bool,
  meta: PropTypes.object,
  onSelectedRow: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  sort: PropTypes.object,
  sortHandler: PropTypes.func,
};
