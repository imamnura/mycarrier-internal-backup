import useResponsive from '@utils/hooks/useResponsive';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ApprovalMicrosite from '../ApprovalMicrosite';

jest.mock('@utils/hooks/useResponsive');

describe('src/fragments/ApprovalMicrosite', () => {
  beforeEach(() => {
    window.open = jest.fn();
  });

  afterEach(() => {
    window.open.mockClear();
  });

  test('render/default', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalMicrosite />);
    expect(tree).toMatchSnapshot();
  });

  test('render/states', () => {
    const props = {
      states: {
        action: { children: 'view request' },
        message: 'message',
        type: 'approved',
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalMicrosite {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/not found', () => {
    const props = {
      information: { data: null },
      loading: false,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalMicrosite {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/information', () => {
    const props = {
      information: {
        data: {
          b: {
            fileName: 'x',
            fileUrl: 'x.pdf',
          },
        },
        schema: [
          { label: 'A', name: 'a' },
          { label: 'B', name: 'b', type: 'document' },
        ],
      },
      loading: false,
      action: [{ children: 'view request' }],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalMicrosite {...props} />);
    tree.props.children[2].props.children[0].props.children.props.children[3].props.children[1].props.children[2].props.children.props.onClick();
    expect(tree).toMatchSnapshot();
  });

  test('render/information mobile', () => {
    useResponsive.mockReturnValue(true);
    const props = {
      information: {
        data: {},
        schema: [{ label: 'A', name: 'a' }],
      },
      loading: false,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalMicrosite {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
