import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Agreement from '../Agreement';
import useAction from '../hooks/useAction';
import useStyles from '../styles';
import { useFieldArray } from 'react-hook-form';

jest.mock('../hooks/useAction');
jest.mock('../styles');
jest.mock('react-hook-form');

const props = { loading: false, data: {} };

const useActionReturn = {
  closeOtp: jest.fn(),
  control: {},
  offeringLetterId: 'test',
  onStepperClick: jest.fn(),
  onSubmit: jest.fn(),
  onSubmitOtp: jest.fn(),
  otpForm: false,
  otpRepository: {
    send: jest.fn(),
    reSend: jest.fn(),
  },
  signatureType: 'test',
  submitLoading: null,
};

describe('src/containers/Document/OfferingLetter/Create/elements/Agreement/index', () => {
  beforeEach(() => {
    useStyles.mockReturnValue({});
    useFieldArray.mockReturnValue({
      fields: [{}, {}],
      append: jest.fn(),
      remove: jest.fn(),
    });
  });

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Agreement {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render signatureType am_approval', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      signatureType: 'am_approval',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Agreement {...props} />);
    expect(tree).toMatchSnapshot();
    // tree.props.children[0].props.children[2].props.children[1][0].props.children[0].props.children.props.children[1].props.children.props.onClick(); //onDeleteReviewer
  });

  test('render signatureType multiple_approval', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      signatureType: 'multiple_approval',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Agreement {...props} />);
    expect(tree).toMatchSnapshot();
    // tree.props.children[0].props.children[2].props.children[2].props.children.props.children[1].props.children.props.onClick(); //onAddRecipient
  });
});
