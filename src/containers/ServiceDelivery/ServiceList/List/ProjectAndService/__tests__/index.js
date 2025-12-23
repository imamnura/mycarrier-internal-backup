import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProjectAndServiceList from '../ProjectAndServiceList';
import useQueryParams from '@utils/hooks/useQueryParams';

jest.mock('@utils/hooks/useQueryParams');

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewInstall', () => {
  const props = {
    optTab: [
      { label: 'Non Project', value: 'serviceList' },
      { label: 'Project', value: 'project' },
    ],
  };

  test('render properly', () => {
    useQueryParams.mockReturnValue({
      queryParams: { id: '123' },
      push: jest.fn(),
      isReady: true,
      setQueryParamsForce: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProjectAndServiceList />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly with tab project', () => {
    useQueryParams.mockReturnValue({
      queryParams: { productName: 'project', id: '123' },
      push: jest.fn(),
      isReady: true,
      setQueryParamsForce: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProjectAndServiceList {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly with tab serviceList', () => {
    useQueryParams.mockReturnValue({
      queryParams: { productName: 'serviceList', id: '123' },
      push: jest.fn(),
      isReady: true,
      setQueryParamsForce: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProjectAndServiceList {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render when isReady false', () => {
    useQueryParams.mockReturnValue({
      queryParams: { id: '123' },
      push: jest.fn(),
      isReady: false,
      setQueryParamsForce: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProjectAndServiceList />);
    expect(tree).toMatchSnapshot();
  });
});
