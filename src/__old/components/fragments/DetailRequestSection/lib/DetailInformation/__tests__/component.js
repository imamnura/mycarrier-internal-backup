import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DetailInformation from '../component';

describe('src/components/fragments/DetailRequestSection/lib/DetailInformation', () => {
  const props = {
    classes: {},
    data: {
      document: {
        fileName: 'fileName',
        fileUrl: 'fileUrl',
      },
      name: 'name',
      products: [{ productName: 'product name' }],
      custAccntNum: '0004704779',
      troubleOccurs: [{ troubleOccurs: 'troubleOccurs' }],
      troubleOccursLink: [{ troubleOccursLink: 'troubleOccursLink' }],
      cpNameInfo: [{ cpNameInfo: 'cpNameInfo' }],
    },
    schema: {
      schemaOne: {
        title: 'title one',
        data: [
          { name: 'name', label: 'Label' },
          { name: 'no label' },
          { name: 'messageFormatOtp', label: 'messageFormatOtp' },
          { name: 'messageFormat', label: 'messageFormat' },
          { name: 'mediaSeller', label: 'mediaSeller' },
          { name: 'productsPO', label: 'productsPO' },
          {
            name: 'troubleOccurs',
            label: 'troubleOccurs',
            type: 'troubleOccurs',
          },
          {
            name: 'troubleOccursLink',
            label: 'troubleOccursLink',
            type: 'troubleOccursLink',
          },
          { name: 'cpNameInfo', label: 'cpNameInfo', type: 'cpNameInfo' },
        ],
      },
      schemaTwo: {
        title: 'title two',
        data: [{ type: 'redList', name: 'name', child: 'child' }],
      },
      schemaThree: {
        title: 'document',
        data: [
          {
            name: 'document',
            file: true,
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
