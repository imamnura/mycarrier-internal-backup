import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TicketAnalyzeConfirmation from '../component';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/components/forms/TicketAnalyzeConfirmation', () => {
  const props = {
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
  };
  const setState = jest.fn();
  beforeEach(() => {
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);
  });

  test('render', () => {
    const customProps = {
      ...props,
      detailServiceAssurance: {
        operatorTypeName: 'Telkomsel',
        category: 'Link Connectivity',
        troubleOccursFile: {},
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TicketAnalyzeConfirmation {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render SmsCValidation true', () => {
    const customProps = {
      ...props,
      detailServiceAssurance: {
        operatorTypeName: 'test',
        category: 'test',
        troubleOccursFile: '',
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TicketAnalyzeConfirmation {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no operatortypename', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TicketAnalyzeConfirmation {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
