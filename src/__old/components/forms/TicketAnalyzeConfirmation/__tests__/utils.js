import React from 'react';

import { GetValues } from '../utils';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/forms/TicketAnalyzeConfirmation/utils', () => {
  test('render obj is not object', () => {
    const props = {
      obj: ['tes1', 'tes1', 'tes1'],
    };
    const tree = shallow(<GetValues {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render obj is an object', () => {
    const props = {
      obj: [
        {
          tes1: 'tes1',
        },
        {
          tes1: 'tes1',
        },
      ],
    };
    const tree = shallow(<GetValues {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
