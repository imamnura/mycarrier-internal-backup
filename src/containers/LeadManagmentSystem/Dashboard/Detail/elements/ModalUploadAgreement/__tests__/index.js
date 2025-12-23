import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ModalUploadAgreement from '../ModalUploadAgreement';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/ModalUploadAgreement', () => {
  test('run properly', () => {
    useAction.mockReturnValueOnce({
      show: true,
      step: 1,
      control: {},
      handleSubmit: jest.fn(),
      onClose: jest.fn(),
      onPrevious: jest.fn(),
      onNext: jest.fn(),
      onSubmit: jest.fn(),
      agreementDoc: {},
      setAgreementDoc: jest.fn().mockReturnValue(jest.fn()),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalUploadAgreement {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
