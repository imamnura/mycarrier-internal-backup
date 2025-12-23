import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EmptyBakes from '../EmptyBakes';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const useActionsReturn = {
  control: {},
  formState: {
    isValid: false,
    isDirty: false,
  },
  optionsBakesNumber: [
    {
      bakesNumber: '123',
    },
  ],
  onClose: jest.fn(),
  watch: jest.fn(),
  handleSubmit: jest.fn(),
  handleUpdateStatus: jest.fn(),
};

const props = {
  useNote: true,
  content: {},
};

describe('src/containers/Document/PurchaseOrder/Detail-v2/lib/form/EmptyBakes', () => {
  test('render properly', () => {
    useActions.mockReturnValue(useActionsReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EmptyBakes {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly other states', () => {
    useActions.mockReturnValue({
      ...useActionsReturn,
      formState: {
        isValid: true,
        isDirty: false,
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EmptyBakes />);
    expect(tree).toMatchSnapshot();
  });
});
