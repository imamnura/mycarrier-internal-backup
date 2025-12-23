import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FormManual from '../FormManual';
import useStyles from '../styles';
import { useFieldArray } from 'react-hook-form';

jest.mock('../styles');
jest.mock('react-hook-form');

describe('src/containers/Document/OfferingLetter/Create/elements/ServiceSpecification/elements/FormManual/index', () => {
  beforeEach(() => {
    useStyles.mockReturnValue({});
    useFieldArray.mockReturnValue({
      fields: [{}, {}],
      append: jest.fn(),
      remove: jest.fn(),
    });
  });

  test('render', () => {
    const props = {
      control: {},
      builder: [
        { fieldName: 'test', fieldValue: 'test' },
        { fieldName: 'test', fieldValue: 'test' },
      ],
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormManual {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render builder < 0', () => {
    const props = {
      control: {},
      builder: [],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormManual {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.children[1].props.children[1].props.onClick(); //onAdd
    tree.props.children[0][1].props.children[1].props.children.props.children.props.onClick(); //onDelete
  });
});
