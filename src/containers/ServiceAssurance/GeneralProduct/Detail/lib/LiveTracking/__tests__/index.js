import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LiveTracking from '../component';
import useActions from '../hooks/useActions';
import { engStatus } from '../constant';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/GeneralProduct/Detail/lib/LiveTracking/index', () => {
  const returnValueData = {
    trackingData: {
      latitude: '123',
    },
    onClose: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValueOnce(returnValueData);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LiveTracking feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with no data', () => {
    useActions.mockReturnValueOnce({ ...returnValueData, trackingData: {} });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LiveTracking feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('eng status', () => {
    expect(engStatus(0)).toBe('Stay');
    expect(engStatus(1)).toBe('Moving...');
    expect(engStatus(2)).toBe('Arrived!');
    expect(engStatus(3)).toBe('Stay');
  });
});
