import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import Table from '../Mobile';

const dataSample = [
  {
    a: 'Data A',
    b: new Date(Date.UTC(2010, 10, 10)).toJSON(),
    c: 20000000,
    d: 'Completed',
    e: <pre>node</pre>,
  },
  {
    a: 'Data B',
    b: new Date(Date.UTC(2010, 10, 10)).toJSON(),
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

describe('src/components/Table/elements/Mobile', () => {
  const props = {
    data: dataSample,
    meta: {
      page: 1,
      size: 10,
      totalData: 10,
      totalPage: 1,
    },
    onClickRow: jest.fn(),
    schema: schemaSample,
    useOrderBy: ['a', jest.fn()],
    useOrderDirection: ['desc', jest.fn()],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Table {...props} />);
    Table.defaultProps.useOrderBy[1]();
    Table.defaultProps.useOrderDirection[1]();
    expect(tree).toMatchSnapshot();
  });

  test('render/empty', () => {
    const customProps = {
      ...props,
      data: [],
      meta: undefined,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Table {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/loadingRoot', () => {
    const customProps = {
      ...props,
      loadingRoot: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Table {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/loading', () => {
    const customProps = {
      ...props,
      loading: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Table {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('func/onClickRow', () => {
    const customProps = {
      ...props,
    };
    const root = TestRenderer.create(<Table {...customProps} />).root;
    root
      .findByProps({ id: 'data-act-0' })
      .props.onClick({ stopPropagation: jest.fn() });
    expect(customProps.onClickRow).toHaveBeenCalled();
  });
});
