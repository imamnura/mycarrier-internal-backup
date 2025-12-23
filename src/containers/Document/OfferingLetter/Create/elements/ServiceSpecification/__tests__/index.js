import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ServiceSpecification from '../ServiceSpecification';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = { loading: false, data: {} };

const useActionReturn = {
  currentService: [{}, {}],
  formService: {
    type: '',
    defaultValue: null,
    formInfo: {
      pricingIndex: null,
      serviceIndex: null,
    },
  },
  onFormSubmit: jest.fn(),
  setFormService: jest.fn(),
  onDeleteService: jest.fn(),
  onAddService: jest.fn(),
  onEditService: jest.fn(),
  totalPrice: 100,
  notes: 'test',
  setNotes: jest.fn(),
  onSubmit: jest.fn(),
  submitLoading: 'draft',
  onStepperClick: jest.fn(),
};

describe('src/containers/Document/OfferingLetter/Create/elements/ServiceSpecification/index', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ServiceSpecification {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render currentService null', () => {
    useAction.mockReturnValue({ ...useActionReturn, currentService: [] });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ServiceSpecification {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
