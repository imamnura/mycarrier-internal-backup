import { dateFormatConverter } from '@utils/converter';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SectionInformation from '../SectionInformation';

describe('src/fragments/Detail/elements/SectionInformation', () => {
  const props = {
    data: {
      satu: null,
      dua: null,
      tiga: ['tag1', 'tag2'],
    },
    schema: [
      {
        name: 'satu',
        label: 'satu',
        converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
      },
      { name: 'dua', label: 'dua' },
      { name: 'tiga', label: 'tiga', type: 'tags' },
      { name: 'empat', label: 'empat', hidden: true },
      { name: 'lima', label: 'lima', type: 'tooltip', tooltip: 'xxx' },
    ],
  };
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SectionInformation {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
