import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CompanyInformation from '../CompanyInformation';
import useAction from '../hooks/useAction';
import useStyles from '../styles';
import { useFieldArray } from 'react-hook-form';

jest.mock('../hooks/useAction');
jest.mock('../styles');
jest.mock('react-hook-form');

const props = { loading: false, data: {} };

const useActionReturn = {
  control: {},
  onSubmit: jest.fn(),
  optionsCompanyName: [],
  submitLoading: 'draft',
  onStepperClick: jest.fn(),
};

describe('src/containers/Document/OfferingLetter/Create/elements/CompanyInformation/index', () => {
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
    const tree = shallow.render(<CompanyInformation {...props} />);
    expect(tree).toMatchSnapshot();
    // tree.props.children[4].props.children[1].props.onClick(); //onAddRecipient
  });
});
