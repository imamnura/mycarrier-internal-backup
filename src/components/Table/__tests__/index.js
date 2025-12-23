import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import useResponsive from '../../../utils/hooks/useResponsive';
import Table from '../Table';

jest.mock('../../../utils/hooks/useResponsive');

const dataSample = [
  {
    a: 'Data A',
    b: new Date(Date.UTC(0, 0, 0, 0, 0, 0)).toJSON(),
    c: 20000000,
    d: 'Completed',
    e: <pre>node</pre>,
  },
  {
    a: 'Data B',
    b: new Date(Date.UTC(0, 0, 0, 0, 0, 0)).toJSON(),
    c: 20000000,
    d: 'Rejected',
  },
];

const schemaSample = [
  {
    name: 'a',
    label: 'With Sort & Custom Width',
    sort: true,
    cellStyle: { width: '50%' },
  },
  { name: 'b', label: 'Date Time', formatDate: 'date-time' },
  { name: 'c', label: 'Currency', currency: true },
  {
    name: 'd',
    label: 'Status',
    schemaStatus: {
      Completed: 'success',
      Rejected: 'danger',
    },
  },
  { name: 'e', label: 'Node Child' },
];

describe('src/components/Table', () => {
  const props = {
    data: dataSample,
    onClickRow: jest.fn(),
    schema: schemaSample,
    useOrderBy: ['a', jest.fn()],
    useOrderDirection: ['desc', jest.fn()],
  };

  test('render/Desktop', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Table {...props} />);
    Table.defaultProps.useOrderBy[1]();
    Table.defaultProps.useOrderDirection[1]();
    expect(tree).toMatchSnapshot();
  });

  test('render/Mobile', () => {
    useResponsive.mockImplementation(() => true);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Table {...props} />);
    Table.defaultProps.useOrderBy[1]();
    Table.defaultProps.useOrderDirection[1]();
    expect(tree).toMatchSnapshot();
  });
});
