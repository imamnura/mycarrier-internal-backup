import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../MRTG';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');
jest.mock('next/router');

const useActionReturn = {
  query: { params: '0123', id: '0123' },
  detailProduct: { serviceDetails: { serviceId: 'PL123' } },
  modalGraph: null,
  modalMTTR: false,
  setModalGraph: jest.fn(),
};

describe('src/containers/ServiceDelivery/ServiceList/Detail/Service/MRTG', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
});
