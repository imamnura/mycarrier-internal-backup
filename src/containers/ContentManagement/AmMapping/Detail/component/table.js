import React, { Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import NoData from '@assets/Svg/NoData';
import styles from '../styles';
import { withStyles } from '@material-ui/core/styles';
import Text from '@__old/components/elements/Text';
import Skeleton from 'react-loading-skeleton';

function Component(props) {
  const { bodyContent, headCells, isLoading, classes } = props;

  const tableEmpty = bodyContent.length <= 0 && (
    <div className={classes.emptyData}>
      <NoData />
      <div className={classes.emptyContainer}>
        <Text variant="h5">
          None of your datas matched for this search. Try another search.
        </Text>
      </div>
    </div>
  );
  // tablebody
  const tableBody = (
    <Fragment>
      {bodyContent.map((row, idx) => (
        <TableRow key={idx} tabIndex={-1}>
          <TableCell align="left">{idx + 1}</TableCell>
          {headCells.map((item, index) => (
            <TableCell key={index}>{row[item.id] || '-'}</TableCell>
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
        <TableRow>
          <TableCell
            children={<Skeleton height={30} />}
            className={classes.body}
            colSpan={headCells.length + 1}
          />
        </TableRow>,
      );
    }

    return load;
  };

  return (
    <Fragment>
      <TableContainer>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              {headCells.map((item, index) => (
                <TableCell key={index}>{item.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && tableBody}
            {isLoading && rowLoading(6)}
          </TableBody>
        </Table>
      </TableContainer>
      {tableEmpty}
    </Fragment>
  );
}

Component.defaultProps = {
  bodyContent: {},
  classes: {},
  headCells: {},
  isLoading: false,
};

Component.propTypes = {
  bodyContent: PropTypes.object,
  classes: PropTypes.object,
  headCells: PropTypes.object,
  isLoading: PropTypes.bool,
};

const Styled = withStyles(styles)(Component);

export default Styled;
