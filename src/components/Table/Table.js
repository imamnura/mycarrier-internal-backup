import React from 'react';
import PropTypes from 'prop-types';
import useResponsive from '../../utils/hooks/useResponsive';
import TableDesktop from './elements/Desktop';
import TableMobile from './elements/Mobile';

const Table = (props) => {
  const mobileClient = useResponsive('xs');
  const Component = mobileClient ? TableMobile : TableDesktop;

  return <Component {...props} />;
};

Table.defaultProps = {
  data: [],
  loading: false,
  loadingRoot: false,
  numbering: true,
  onClickRow: null,
  schema: [],
  size: 10,
  useOrderBy: [null, () => {}],
  useOrderDirection: [null, () => {}],
  useSelectedRow: [],
};

Table.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  loadingRoot: PropTypes.bool,
  numbering: PropTypes.bool,
  onClickRow: PropTypes.func,
  schema: PropTypes.array,
  size: PropTypes.number,
  useOrderBy: PropTypes.array,
  useOrderDirection: PropTypes.array,
  useSelectedRow: PropTypes.array,
};

export default Table;
