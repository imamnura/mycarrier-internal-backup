import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AddService from '../AddService';
import useAction from '../hooks/useAction';
import { normalizeAutoForm } from '../utils';

jest.mock('../hooks/useAction');

const props = { onClose: false, type: 'test' };

const useActionReturn = {
  control: {},
  currentFormData: {
    serviceName: { data: { epicProduct: 'test' } },
    price: 'manual',
  },
  formBuilder: { type: 'test', form: 'test' },
  loadingForm: false,
  loadingSubmit: false,
  onSubmit: jest.fn(),
  optionService: [{}, {}],
  setValue: jest.fn(),
};

const data = {
  API: [
    { FIELDNAME: 'test', STATUS: 'test', URLAPI: 'https://', NCIX_REF: 'test' },
    {
      FIELDNAME: 'test',
      STATUS: 'mandatory',
      URLAPI: 'https://',
      NCIX_REF: 'test',
    },
  ],
  FREE: [
    { FIELDNAME: 'test', STATUS: 'mandatory', RDM: '1', DISABLE: 'test' },
    { FIELDNAME: 'test', STATUS: 'mandatory', RDM: '1', DISABLE: 'test' },
  ],
  SELECT: [
    {
      FIELDNAME: 'test',
      STATUS: 'mandatory',
      OPTION: [{ VALUE: '0', DISPLAY: '1' }],
    },
    {
      FIELDNAME: 'test',
      STATUS: 'mandatory',
      OPTION: [{ VALUE: '0', DISPLAY: '1' }],
    },
  ],
};

describe('src/containers/Document/OfferingLetter/Create/elements/ServiceSpecification/elements/AddService/index', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddService {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading form', () => {
    useAction.mockReturnValue({ ...useActionReturn, loadingForm: true });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddService {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render currentFormData proce auto', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      currentFormData: {
        serviceName: { data: { epicProduct: 'test' } },
        price: 'auto',
      },
      formBuilder: { type: '', form: 'test' },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddService {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('normalizeAutoForm', () => {
    expect(normalizeAutoForm(data)).toBeTruthy();
  });

  test('normalizeAutoForm SELECT DISPLAY 0', () => {
    expect(
      normalizeAutoForm({
        ...data,
        FREE: [
          {
            FIELDNAME: 'test',
            STATUS: 'non mandatory',
            RDM: '',
            DISABLE: 'test',
          },
          {
            FIELDNAME: 'test',
            STATUS: 'non mandatory',
            RDM: '',
            DISABLE: 'test',
          },
        ],
        SELECT: [
          {
            FIELDNAME: 'test',
            STATUS: 'not mandatory',
            OPTION: [
              { VALUE: 0, DISPLAY: '0' },
              { VALUE: 0, DISPLAY: '0' },
              { VALUE: 0, DISPLAY: '0' },
              { VALUE: 0, DISPLAY: '0' },
              { VALUE: 0, DISPLAY: '0' },
            ],
          },
        ],
      }),
    ).toBeTruthy();
  });
});
