import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TermsAndCondition from '../TermsAndCondition';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = { loading: false, data: {} };

const useActionReturn = {
  control: {},
  onSubmit: jest.fn(),
  submitLoading: 'draft',
  onStepperClick: jest.fn(),
};

describe('src/containers/Document/OfferingLetter/Create/elements/TermsAndCondition/index', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TermsAndCondition {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
