import React from 'react';
import Component from '../component';
import Step1 from '../elements/Step1';
import Step2 from '../elements/Step2';
import Step3 from '../elements/Step3';
import Step4 from '../elements/Step4';
import Step5 from '../elements/Step5';
import { configure, shallow } from 'enzyme';
import StepperTab from '@__old/components/elements/StepperTab';
import CallbackAlert from '@__old/components/elements/CallbackAlert';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import PreviewDocument from '@__old/components/fragments/PreviewDocument';
import Adapter from 'enzyme-adapter-react-17-updated';
import { useRouter } from 'next/router';

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (x) => x(),
}));

jest.mock('next/router');

const mockEnqueue = jest.fn();
jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue,
    };
  },
}));

describe('src/pages/GeneralProduct/BakesDetail/component', () => {
  let props = {
    actions: {
      getBakesDetail: jest.fn(),
      triggerSubmitStep1: jest.fn(),
      triggerSubmitStep2: jest.fn(),
      triggerSubmitStep3: jest.fn(),
      triggerSubmitStep4: jest.fn(),
      triggerSubmitStep5: jest.fn(),
      draftSubmit: jest.fn(),
    },
    bakesId: 'id',
    classes: {},
    form: {
      value: {},
    },
  };

  beforeEach(() => {
    useRouter.mockReturnValue({ push: jest.fn() });
  });

  test('render step 1', () => {
    const customProps = {
      ...props,
      actions: {
        ...props.actions,
        draftSubmit: (a, b, c) => c(),
      },
    };
    const tree = shallow(<Component {...customProps} />);
    tree
      .find(Step1)
      .props()
      .onSubmit({
        telkomPic: {
          name: {
            value: 'x',
          },
        },
      });
    expect(tree).toMatchSnapshot();
  });

  test('render step 2', () => {
    const customProps = {
      ...props,
      actions: {
        ...props.actions,
        draftSubmit: (a, b, c) => c(),
      },
      defaultStep: 1,
      form: {
        value: {
          newBakesStep2: {
            values: {
              hjm: '',
              price: 'Rp 0',
              valueAgreement: 'Rp 0',
            },
          },
        },
      },
    };
    const tree = shallow(<Component {...customProps} />);
    tree
      .find(Step2)
      .props()
      .onSubmit(customProps.form.value.newBakesStep2.values);
    expect(tree).toMatchSnapshot();
  });

  test('render step 3', () => {
    const customProps = {
      ...props,
      actions: {
        ...props.actions,
        draftSubmit: (a, b, c) => c(),
      },
      defaultStep: 2,
      form: {
        value: {
          newBakesStep3: {
            values: {
              period: [new Date('10/10/2010').toJSON(), ''],
            },
          },
        },
      },
    };
    const tree = shallow(<Component {...customProps} />);
    tree
      .find(Step3)
      .props()
      .onSubmit(customProps.form.value.newBakesStep3.values);
    expect(tree).toMatchSnapshot();
  });

  test('render step 4', () => {
    const customProps = {
      ...props,
      actions: {
        ...props.actions,
        draftSubmit: (a, b, c) => c(),
      },
      defaultStep: 3,
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find(Step4).props().onSubmit({});
    expect(tree).toMatchSnapshot();
  });

  test('render step 5', () => {
    const customProps = {
      ...props,
      actions: {
        ...props.actions,
        draftSubmit: (a, b, c) => c(),
      },
      defaultStep: 4,
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find(Step5).props().onSubmit({});
    expect(tree).toMatchSnapshot();
  });

  test('render step other', () => {
    const customProps = {
      ...props,
      actions: {
        ...props.actions,
        draftSubmit: (a, b, c) => c(),
      },
      defaultStep: 10,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('handle change tab', () => {
    const customProps = {
      ...props,
      actions: {
        ...props.actions,
        draftSubmit: (a, b, c) => c(),
      },
      form: {
        isDirty: [false, false, false, false, false],
      },
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find(StepperTab).props().setActive(0, 1);
    tree.find(StepperTab).props().setActive(1, 1);
    tree.find(StepperTab).props().setActive(2, 1);
    tree.find(StepperTab).props().setActive(3, 1);
    tree.find(StepperTab).props().setActive(4, 1);
    expect(tree).toMatchSnapshot();
  });

  test('handle change tab failed', () => {
    const customProps = {
      ...props,
      actions: {
        ...props.actions,
        draftSubmit: (a, b, c) => c(),
      },
      form: {
        isDirty: [true, true],
      },
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find(StepperTab).props().setActive(0, 1);
    expect(tree).toMatchSnapshot();
  });

  test('handle close alert', () => {
    const customProps = { ...props, defaultStep: 5 };
    const tree = shallow(<Component {...customProps} />);
    tree.find(CallbackAlert).props().onClose();
    expect(tree).toMatchSnapshot();
  });

  test('handle close confirmation', () => {
    const customProps = props;
    const tree = shallow(<Component {...customProps} />);
    tree.find(ConfirmationDialog).props().onClose();
    expect(tree).toMatchSnapshot();
  });

  test('handle preview docs', () => {
    const customProps = {
      ...props,
      defaultStep: 5,
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find(PreviewDocument).props().onClose();
    tree.find(PreviewDocument).props().onSubmit();
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    const customProps = { ...props, isLoading: true };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render not draft', () => {
    const customProps = { ...props, isNotDraft: true };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
