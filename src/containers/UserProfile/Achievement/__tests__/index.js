import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../Detail';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/UserProfile/Achievement', () => {
  const useActionReturn = {
    loading: false,
    list: {
      data: [
        {
          action: 'add',
          createDate: '2023-02-13 18:41:39',
          description: 'Daily Check In',
        },
      ],
    },
    tab: 'progress',
    setTab: jest.fn(),
  };

  test('render mission list data null', () => {
    useAction.mockReturnValue({
      loading: false,
      data: {
        tierName: '',
      },
      ...useActionReturn,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component />);
    expect(tree).toMatchSnapshot();
  });

  test('render', () => {
    useAction.mockReturnValue({
      data: {
        tierName: 'test',
      },
      ...useActionReturn,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component />);
    expect(tree).toMatchSnapshot();
  });

  test('render content', () => {
    useAction.mockReturnValue({
      loading: true,
      list: {
        data: {
          tierName: 'test',
        },
      },
      data: {
        tierName: 'test',
      },
      ...useActionReturn,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component />);
    expect(tree).toMatchSnapshot();
  });
  test('render claim reward', () => {
    useAction.mockReturnValue({
      loading: true,
      data: {
        tierName: 'test',
      },
      ...useActionReturn,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component />);
    expect(tree).toMatchSnapshot();
  });
});
