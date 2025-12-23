import React from 'react';
import Breadcrumb from '../component';
import Link from '../../../../../assets/Svg/Link';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('src/components/elements/Breadcrumb', () => {
  const props = {
    data: [{ label: 'label1' }, { label: 'label2' }],
    icon: <Link />,
    classes: {},
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Breadcrumb {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
