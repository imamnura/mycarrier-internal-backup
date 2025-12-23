import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StepperStage from '../StepperStage';
import { useDetailData } from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';

jest.mock('@containers/LeadManagmentSystem/Dashboard/Detail/utils');

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/StepperStage', () => {
  test('run need_validation', () => {
    useDetailData.mockReturnValue({
      data: {
        status: 'need_validation',
        timeline: [
          { status: 'need_validation' },
          { status: 'valid', dateTime: 'test', active: true },
        ],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperStage />);
    expect(tree).toMatchSnapshot();
  });

  test('run valid', () => {
    useDetailData.mockReturnValue({
      data: {
        status: 'valid',
        timeline: [
          { status: 'need_validation', dateTime: 'test' },
          { status: 'valid', dateTime: 'test', active: true },
          { status: 'qualify', dateTime: 'test' },
        ],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperStage />);
    expect(tree).toMatchSnapshot();
  });

  test('run Opportunity', () => {
    useDetailData.mockReturnValue({
      data: {
        status: 'Opportunity',
        timeline: [{ status: 'delayOpportunity', dateTime: 'test' }],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperStage />);
    expect(tree).toMatchSnapshot();
  });

  test('run Delay opportunity', () => {
    useDetailData.mockReturnValue({
      data: {
        status: 'Delay Opportunity',
        timeline: [{ status: 'opportunity', dateTime: 'test', active: true }],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperStage />);
    expect(tree).toMatchSnapshot();
  });

  test('run Quote', () => {
    useDetailData.mockReturnValue({
      data: {
        status: 'Quote',
        timeline: [{ status: 'delayQuote', dateTime: 'test', active: true }],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperStage />);
    expect(tree).toMatchSnapshot();
  });

  test('run Delay Quote', () => {
    useDetailData.mockReturnValue({
      data: {
        status: 'Delay Quote',
        timeline: [{ status: 'quote', dateTime: 'test' }],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperStage />);
    expect(tree).toMatchSnapshot();
  });

  test('run red step Invalid', () => {
    useDetailData.mockReturnValue({
      data: {
        status: 'invalid',
        timeline: [{ status: 'invalid', dateTime: 'test', active: true }],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperStage />);
    expect(tree).toMatchSnapshot();
  });
});
