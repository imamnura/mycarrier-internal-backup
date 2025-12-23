import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DetailInformation from '../component';

describe('src/components/fragments/DetailInvoice/lib/DetailInformation', () => {
  const props = {
    classes: {},
    data: {
      invoiceFile: {
        fileName: 'fileName',
        fileUrl: 'fileUrl',
      },
      invoiceNumber: '123456',
      bpNumber: '123456',
    },
    schema: {
      schemaOne: {
        title: 'title one',
        data: [{ name: 'name', label: 'Label' }, { name: 'no label' }],
      },
      schemaTwo: {
        title: 'invoiceFile',
        data: [
          {
            name: 'invoiceFile',
            file: true,
            upload: false,
            type: 'PDF',
            label: 'Label',
            actionButton: jest.fn(),
          },
        ],
      },
    },
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailInformation {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
