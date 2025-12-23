import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import OtherRecepient from '../OtherRecepient';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  onClose: jest.fn(),
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/FormValidate/elements/OtherRecepient', () => {
  test('render', () => {
    useAction.mockReturnValueOnce({
      control: {},
      onSubmit: jest.fn(),
      onPrevious: jest.fn(),
      disabled: false,
      handleSubmit: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<OtherRecepient {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
