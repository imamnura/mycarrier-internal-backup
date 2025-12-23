import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ModalMttr from '../ModalMTTR';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

const props = {
  schema: [],
};

const useActionReturn = {
  dataMTTR: {
    data: [],
    meta: { totalPages: 5 },
  },
};

describe('src/containers/ServiceDelivery/ServiceList/Detail/MRTG/elements/ModalMTTR', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalMttr {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
