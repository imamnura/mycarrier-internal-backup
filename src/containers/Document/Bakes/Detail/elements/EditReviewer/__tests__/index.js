import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EditReviewer from '../EditReviewer';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const actions = {
  control: {},
  onSubmit: jest.fn(),
  handleSubmit: jest.fn(),
  telkomApproval: {
    fields: [{ id: '1-x' }, { id: '2-x' }, { id: '3-x' }],
    allApproved: false,
    active: 1,
    onDelete: jest.fn(),
    onAdd: jest.fn(),
  },
  customerApproval: {
    fields: [{ id: '1-y' }, { id: '3-y' }, { id: '2-y' }],
    allApproved: false,
    active: 1,
    onDelete: jest.fn(),
    onAdd: jest.fn(),
  },
};

describe('src/pages/Document/Bakes/elements/EditReviewer', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <EditReviewer feature={[]} onClose={jest.fn()} onSubmit={jest.fn()} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
