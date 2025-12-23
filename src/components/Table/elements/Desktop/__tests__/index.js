import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import Table from '../Desktop';
import wrapper from '@utils/tests';

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
    hierarchy: '2',
    child: [
      {
        a: 'Data B',
        b: new Date(Date.UTC(2010, 10, 10)).toJSON(),
        c: 20000000,
        d: 'Rejected',
        hierarchy: '2.1',
        child: [
          {
            a: 'Data B',
            b: new Date(Date.UTC(2010, 10, 10)).toJSON(),
            c: 20000000,
            d: 'Rejected',
            hierarchy: '2.1.1',
          },
        ],
      },
    ],
  },
];

const schemaSample = [
  {
    name: 'a',
    label: 'With Sort & Custom Width',
    sort: true,
    cellStyle: { width: '50%' },
  },
  { name: 'b', label: 'Date Time', formatDate: 'date-time', sort: true },
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
  {
    name: 'f',
    label: 'Status Tooltip',
    schemaStatus: {
      Completed: 'success',
      Rejected: 'danger',
    },
    tooltip: {
      Completed: 'success',
      Rejected: 'danger',
    },
  },
  {
    name: 'g',
    label: 'Header Tooltip',
    schemaStatus: {
      Completed: 'success',
      Rejected: 'danger',
    },
    hasTooltipHeader: true,
    tooltipHeader: 'Wording Tooltip',
  },
];

describe('src/components/Table/elements/Desktop', () => {
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
    pickedRow: 'Data A',
    pickedRowKey: 'a',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Table {...props} />);
    Table.defaultProps.useOrderBy[1]();
    Table.defaultProps.useOrderDirection[1]();
    expect(tree).toMatchSnapshot();
  });

  test('render selectable', () => {
    const customProps = {
      ...props,
      useSelectedRow: [['x'], jest.fn()],
      useCollapseChild: [{}, jest.fn()],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Table {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/empty', () => {
    const customProps = {
      ...props,
      meta: undefined,
      data: [],
      numbering: false,
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

  test('func/onOrderChange', () => {
    const ascProps = {
      ...props,
      useOrderDirection: ['asc', jest.fn()],
    };
    const descProps = {
      ...props,
      useOrderDirection: ['desc', jest.fn()],
    };
    const loadProps = {
      ...props,
      loadingRoot: true,
      useOrderDirection: ['asc', jest.fn()],
    };
    const createTestRender = (prop) =>
      wrapper(TestRenderer.create, <Table {...prop} />);
    const rootAsc = createTestRender(ascProps).root;
    const rootDesc = createTestRender(descProps).root;
    const rootLoad = createTestRender(loadProps).root;

    rootLoad.findByProps({ id: 'th-a' }).props.onClick();
    expect(loadProps.loadingRoot).toBeTruthy();

    rootAsc.findByProps({ id: 'th-a' }).props.onClick();
    rootAsc.findByProps({ id: 'th-b' }).props.onClick();
    expect(ascProps.useOrderBy[1]).toHaveBeenCalled();
    expect(ascProps.useOrderDirection[1]).toHaveBeenCalled();

    rootDesc.findByProps({ id: 'th-a' }).props.onClick();
    expect(descProps.useOrderBy[1]).toHaveBeenCalled();
    expect(descProps.useOrderDirection[1]).toHaveBeenCalled();
  });

  test('func/onClickRow', () => {
    const customProps = {
      ...props,
    };
    const root = wrapper(TestRenderer.create, <Table {...customProps} />).root;
    root
      .findByProps({ id: 'table-row-0' })
      .props.onClick({ stopPropagation: jest.fn() });
    expect(customProps.onClickRow).toHaveBeenCalled();
  });

  test('func/onClickRow empty', () => {
    const customProps = {
      ...props,
      onClickRow: null,
    };
    const root = wrapper(TestRenderer.create, <Table {...customProps} />).root;
    root
      .findByProps({ id: 'table-row-0' })
      .props.onClick({ stopPropagation: jest.fn() });
    expect(customProps.onClickRow).toBeFalsy();
  });

  test('func/onSelectedRow', () => {
    const emptyProps = {
      ...props,
      useSelectedRow: [[], jest.fn()],
    };

    const customProps = {
      ...props,
      selectedRowKey: 'a',
      useSelectedRow: [['Data A'], jest.fn()],
    };

    const rootEmpty = wrapper(
      TestRenderer.create,
      <Table {...emptyProps} />,
    ).root;
    rootEmpty.findByProps({ id: 'checkbox-0' }).props.onChange();
    expect(emptyProps.useSelectedRow[1]).toHaveBeenCalled();

    const root = wrapper(TestRenderer.create, <Table {...customProps} />).root;
    root.findByProps({ id: 'checkbox-0' }).props.onChange();
    expect(customProps.useSelectedRow[1]).toHaveBeenCalled();
  });

  test('func/isHeadRowSelected', () => {
    const customProps = {
      ...props,
      selectedRowKey: 'a',
      useSelectedRow: [[], jest.fn()],
    };

    const root = wrapper(TestRenderer.create, <Table {...customProps} />).root;
    root
      .findByProps({ id: 'checkbox-h' })
      .props.onChange({ target: { checked: true } });
    root
      .findByProps({ id: 'checkbox-h' })
      .props.onChange({ target: { checked: false } });
    expect(customProps.useSelectedRow[1]).toHaveBeenCalled();
  });

  test('func/setCollapseChild(close child)', () => {
    const customProps = {
      ...props,
      useCollapseChild: [{ 2.1: true }, jest.fn()],
    };

    const root = wrapper(TestRenderer.create, <Table {...customProps} />).root;
    // root.findByProps({ id: 'expand-row' }).props.onClick();
    root.findByProps({ id: 'expand-child-row' }).props.onClick();
    expect(customProps.useCollapseChild[1]).toHaveBeenCalled();
  });
});
