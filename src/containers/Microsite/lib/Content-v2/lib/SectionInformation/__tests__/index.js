import { dateFormatConverter } from '@utils/converter';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SectionInformation from '../SectionInformation';

describe('src/fragments/Detail/elements/SectionInformation', () => {
  const props = {
    data: {
      satu: null,
      dua: null,
      tiga: ['list1', 'list2'],
      empat: [
        {
          fileName: 'test.pdf',
          fileUrl: 'https://google.com',
        },
      ],
    },
    schema: [
      {
        name: 'satu',
        label: 'satu',
        converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
      },
      { name: 'dua', label: 'dua' },
      { name: 'tiga', label: 'tiga', type: 'list' },
      { name: 'empat', label: 'empat', type: 'document' },
    ],
  };
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SectionInformation {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
