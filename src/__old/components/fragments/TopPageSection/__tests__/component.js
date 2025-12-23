import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import TopPageSection from '../component';

jest.mock('react-redux');

describe('src/components/fragments/TopPageSection', () => {
  const props = {
    classes: {},
    breadcrumb: [],
    actionButton: [],
    filter: [{ type: 'dropdown' }, { type: 'rangeDate' }, { type: 'else' }],
    title: '',
  };

  test('render within tab', () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation((selectorFn) => selectorFn({ search: '' }));
    const customProps = {
      ...props,
      tab: {},
      breadcrumb: ['title', 'subtitle'],
      actionButton: [
        { child: 'Button' },
        { child: 'Button2' },
        { child: 'Button3' },
      ],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TopPageSection {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render without tab', () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation((selectorFn) => selectorFn({ search: '' }));
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TopPageSection {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
