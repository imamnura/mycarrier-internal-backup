import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SectionAttachment from '../SectionAttachment';

describe('src/fragments/Detail/elements/SectionAttachment', () => {
  const props = {
    data: {
      direct: { fileName: 'name', fileUrl: 'url.pdf' },
      array: [{ fileName: 'name', fileUrl: 'url.pdf' }],
    },
    schema: [
      { name: 'direct', label: 'Direct' },
      { name: 'direct', label: 'Direct', imageType: true },
      {
        name: 'direct',
        label: 'Direct Btn',
        action: { children: 'btn', onClick: () => jest.fn },
      },
      {
        name: 'array',
        label: 'array',
        action: { children: 'btn', onClick: () => jest.fn },
      },
      {
        name: 'array',
        label: 'array',
        action: { children: 'btn', onClick: () => jest.fn },
        imageType: true,
      },
    ],
  };
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SectionAttachment {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
