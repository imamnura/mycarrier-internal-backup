import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ListService from '../ListService';
import useStyles from '../styles';

jest.mock('../styles');

describe('src/containers/Document/OfferingLetter/Create/elements/ServiceSpecification/elements/ListService/index', () => {
  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    const props = {
      data: [
        {
          productName: 'test',
          slg: 10,
          pricing: [
            {
              productParam: 'CNDC',
              epicProduct: 'test',
              detailFields: [{ fieldName: 'test', fieldValue: 'test' }],
              tarifOTC: 1000,
              tarifMRC: 1000,
              total: 2000,
            },
          ],
          productParam: 'CNDC',
          epicProduct: 'test',
        },
      ],
      onDelete: jest.fn(),
      onAdd: jest.fn(),
      onEdit: jest.fn(),
      totalPrice: 10,
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListService {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render productParam non CNDC', () => {
    const props = {
      data: [
        {
          productName: 'test',
          slg: 10,
          pricing: [
            {
              productParam: 'test',
              epicProduct: 'test',
              detailFields: [{ fieldName: 'test', fieldValue: 'test' }],
              tarifOTC: 1000,
              tarifMRC: 1000,
              total: 2000,
            },
          ],
          productParam: 'test',
          epicProduct: 'test',
        },
      ],
      onDelete: jest.fn(),
      onAdd: jest.fn(),
      onEdit: jest.fn(),
      totalPrice: 10,
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListService {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
