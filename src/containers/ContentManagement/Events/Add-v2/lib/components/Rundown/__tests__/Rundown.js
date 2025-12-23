import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Rundown from '../Rundown';
import { cleanup } from '@testing-library/react-hooks/server';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {},
    ),
  Draggable: ({ children }) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {},
    ),
  DragDropContext: ({ children }) => children,
}));

const props = {
  isClickPreview: false,
  isLoadingDetail: true,
  onChangeDataEn: jest.fn(),
  onChangeDataId: jest.fn(),
  range: [],
  setRange: jest.fn(),
  setValue: jest.fn(),
  tab: 'id',
  watchField: {
    rundownid: [
      {
        items: [
          {
            endTime: '2023-02-20T01:13:00+07:00',
            startTime: '2023-02-20T00:00:00+07:00',
            title: 'aaa',
            date: '2023-02-20T00:00:00',
          },
          {
            endTime: '2023-02-20T03:13:00+07:00',
            startTime: '2023-02-20T01:13:00+07:00',
            title: 'bbb',
            date: '2023-02-20T00:00:00',
          },
        ],
        date: '2023-02-20T00:00:00+07:00',
        title: '20 February 2023',
      },
    ],
    rundownen: [
      {
        items: [
          {
            endTime: '2023-02-20T01:13:00+07:00',
            startTime: '2023-02-20T00:00:00+07:00',
            title: 'aaa',
            date: '2023-02-20T00:00:00',
          },
          {
            endTime: '2023-02-20T03:13:00+07:00',
            startTime: '2023-02-20T01:13:00+07:00',
            title: 'bbb',
            date: '2023-02-20T00:00:00',
          },
        ],
        date: '2023-02-21T00:00:00+07:00',
        title: '21 February 2023',
      },
    ],
  },
};

describe('src/containers/ContentManagement/Events/Add-v2/lib/components/Rundown', () => {
  afterEach(() => {
    cleanup();
  });

  const setState = jest.fn();

  beforeEach(() => {
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);
  });

  test('render', () => {
    // const destination = { index: 2 };
    // const source = { index: 1 };
    // const type = 'eventDay';

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Rundown {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children.props.children({}, { isDraggingOver: true });

    // tree.props.onDragEnd({ destination, source, type });
    // tree.props.onDragEnd({ destination, source, type: 'event' });
  });

  test('render tab en', () => {
    // const destination = { index: 2 };
    // const source = { index: 1 };
    // const type = 'eventDay';

    const customProps = { ...props, tab: 'en' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Rundown {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children.props.children({}, { isDraggingOver: true });

    // tree.props.onDragEnd({ destination, source, type });
    // tree.props.onDragEnd({ destination, source, type: 'event' });
  });

  test('render isLoadingDetail true', () => {
    const customProps = { ...props, isLoadingDetail: true };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Rundown {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
