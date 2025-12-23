import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ListItem from '../ListItem';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/GeneralProduct/Validation/lib/SelectWithLevel/lib/ListItem/index', () => {
  const useActionReturn = {
    fetchDataItems: jest.fn(),
    toggleItem: jest.fn(),
    handleCombineValue: jest.fn(),
    handleSymptompPath: jest.fn(),
    visible: {},
    dataItems: [],
  };

  test('render', () => {
    const props = {
      data: [
        {
          symptompDesc: 'desc',
          content: 'content',
          children: true,
        },
      ],
      handleValue: jest.fn(),
      level: 1,
    };
    useAction.mockReturnValue({
      ...useActionReturn,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListItem {...props} />);
    ListItem.defaultProps.handleValue();
    expect(tree).toMatchSnapshot();
  });

  test('render fetch condition', () => {
    const props = {
      data: [
        {
          symptompDesc: 'desc',
          content: 'content',
          children: true,
        },
      ],
      handleValue: jest.fn(),
      level: 2,
    };
    useAction.mockReturnValue({
      ...useActionReturn,
      visible: { content: 'content' },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListItem {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with data items', () => {
    const props = {
      data: [
        {
          symptompDesc: 'desc',
          content: 'content',
          children: true,
        },
      ],
      handleValue: jest.fn(),
      level: 2,
    };
    useAction.mockReturnValue({
      ...useActionReturn,
      visible: { content: 'content' },
      dataItems: [{ content: 'content' }],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListItem {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no children', () => {
    const props = {
      data: [
        {
          symptompDesc: 'desc',
          content: 'content',
          children: false,
        },
      ],
      handleValue: jest.fn(),
      level: 2,
    };
    useAction.mockReturnValue({
      ...useActionReturn,
      visible: { content: 'content' },
      dataItems: [{ content: 'content' }],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListItem {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
