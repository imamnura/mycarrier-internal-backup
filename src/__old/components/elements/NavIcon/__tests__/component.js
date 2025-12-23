import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import NavIcon from '../component';

const types = [
  'link',
  'sender',
  'lba',
  'umb',
  'keyword',
  'ticket',
  'logout',
  'help',
  'article',
  'banner',
  'purchaseOrder',
  'baso',
  'accountNav',
  'interestedList',
  'quotation',
  'product',
  'bakes',
  'site',
  'smsc',
  'userManagement',
  'mrtg',
];

describe('src/components/elements/NavIcon', () => {
  const props = {
    classes: {},
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<NavIcon {...props} />);
    expect(tree).toMatchSnapshot();
  });

  types.map((type) => {
    test(`render with types ${type}`, () => {
      const customProps = {
        ...props,
        type: type,
      };
      const shallow = new ShallowRenderer();
      const tree = shallow.render(<NavIcon {...customProps} />);
      expect(tree).toMatchSnapshot();
    });
  });
});
