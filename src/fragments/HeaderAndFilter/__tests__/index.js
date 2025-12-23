import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import HeaderAndFilter from '../HeaderAndFilter';
import useResponsive from '@utils/hooks/useResponsive';

jest.mock('@utils/hooks/useResponsive');

describe('src/fragment-v2/Performance/lib/HeaderAndFilter', () => {
  const props = {
    action: [{ children: 'btn' }, { children: 'btn2', tooltip: 'xxxx' }],
    filter: [
      { type: 'dropdown' },
      { type: 'dateRange', onChange: jest.fn() },
      { type: 'date', onChange: jest.fn() },
      { type: 'other' },
    ],
    tabs: {
      options: [{ label: 'x', value: 'x' }],
      onChange: jest.fn(),
    },
    search: {
      value: '',
      onChange: jest.fn(),
      placeholder: 'pl',
    },
    status: {
      variant: 'success',
      children: 'status',
    },
    breadcrumb: [{ label: 'Breadcrumb' }, { label: 'Breadcrumb 2' }],
  };

  test('render success', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HeaderAndFilter {...props} />);
    HeaderAndFilter.defaultProps.tabs.onChange();
    HeaderAndFilter.defaultProps.tabsL2.onChange();
    expect(tree).toMatchSnapshot();
  });

  test('render without search & 1 filters', () => {
    const customProps = {
      ...props,
      search: undefined,
      filter: [{ type: 'other' }],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HeaderAndFilter {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/other', () => {
    useResponsive.mockImplementationOnce(() => true);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <HeaderAndFilter {...props} tabs={undefined} tabsL2={props.tabs} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
