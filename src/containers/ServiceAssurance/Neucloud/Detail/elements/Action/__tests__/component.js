import React from 'react';
import Component from '../component';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/pages/ServiceAssurance/Neucloud/Detail/elements/Action/component', () => {
  let props = {
    actions: {
      updateStatus: jest.fn(),
    },
  };
  test('render with step 1', () => {
    const customProps = {
      ...props,
      isLoading: false,
      detailServiceAssuranceNeucloud: {
        ticketId: 'tes',
      },
      step: 1,
    };
    const values = {
      status: 'checking',
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find('#Ticket').props().onClick();
    tree.find('#ticketnumberform').props().onSubmit(values);
    tree.find('#Ticket').props().onClick();
    tree.find('#ticketnumberform').props().onClose();
    tree.find('#Status').props().onClick();
    tree.find('#updatestatusform').props().onSubmit(values);
    tree.find('#confirmation').props().actions[0].action();
    tree.find('#Status').props().onClick();
    tree.find('#updatestatusform').props().onSubmit(values);
    tree.find('#confirmation').props().actions[1].action('tes');
    tree.find('#Status').props().onClick();
    tree.find('#updatestatusform').props().onClose();
    tree.find('#Note').props().onClick();
    tree.find('#noteprogress').props().onSubmit(values);
    tree.find('#confirmation').props().actions[0].action();
    tree.find('#Note').props().onClick();
    tree.find('#noteprogress').props().onSubmit(values);
    tree.find('#confirmation').props().actions[1].action('tes');
    tree.find('#Note').props().onClick();
    tree.find('#noteprogress').props().onClose();
  });
  test('render with step 1 2', () => {
    const customProps = {
      ...props,
      isLoading: false,
      detailServiceAssuranceNeucloud: {
        ticketId: '',
      },
      step: 1,
    };
    const values = {
      status: 'checking',
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find('#Ticket').props().onClick();
    tree.find('#ticketnumberform').props().onSubmit(values);
  });
  test('render with step 0', () => {
    const customProps = {
      ...props,
      isLoading: false,
      detailServiceAssuranceNeucloud: {
        ticketId: 'tes',
      },
      step: 0,
    };
    const values = {
      status: 'checking',
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find('#Ticket').props().onClick();
    tree.find('#ticketnumberform').props().onSubmit(values);
    tree.find('#Status').props().onClick();
    tree.find('#updatestatusform').props().onSubmit(values);
  });
  test('render with step 0 2', () => {
    const customProps = {
      ...props,
      isLoading: false,
      detailServiceAssuranceNeucloud: {
        ticketId: '',
      },
      step: 0,
    };
    const values = {
      status: 'checking',
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find('#Ticket').props().onClick();
    tree.find('#ticketnumberform').props().onSubmit(values);
  });
  test('render with step 3', () => {
    const customProps = {
      ...props,
      isLoading: false,
      detailServiceAssuranceNeucloud: {
        ticketId: 'tes',
      },
      step: 3,
    };
    const values = {
      status: 'checking',
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find('#Ticket').props().onClick();
    tree.find('#ticketnumberform').props().onSubmit(values);
  });
});
