import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import useResponsive from '@utils/hooks/useResponsive';
import List from '../List';
import { render, cleanup } from '@testing-library/react';
import wrapper from '@utils/tests';

jest.mock('@utils/hooks/useResponsive');

// global.document = undefined;

describe('src/fragments/List', () => {
  afterAll(cleanup);

  const props = {
    action: [{ children: 'btn' }, { children: 'btn2' }],
    filter: [
      { type: 'dropdown' },
      { type: 'dateRange', onChange: jest.fn() },
      { type: 'other' },
    ],
    tabs: {
      options: [{ label: 'x', value: 'x' }],
      onChange: jest.fn(),
      value: 'x',
    },
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    List.defaultProps.onBottomPage();
    List.defaultProps.tabs.onChange();
    expect(tree).toMatchSnapshot();
  });

  test('render/other', () => {
    useResponsive.mockImplementationOnce(() => true);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} tabs={undefined} />);
    expect(tree).toMatchSnapshot();
  });

  test('onscroll', () => {
    const { unmount } = wrapper(render, <List {...props} />);
    window.innerHeight = 1000;
    window.scrollY = 1;
    window.onscroll();

    window.scrollY = 0;
    window.onscroll();

    unmount();
    window.onscroll();
  });
});
