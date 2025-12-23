import React from 'react';
import Component from '../component';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Component SMSA2P Detail-MSISDN', () => {
  let props = {
    classes: {},
    schema: {},
  };

  test('render', () => {
    const customProps = {
      ...props,
      data: {
        troubleOccurs: [
          {
            file: [
              {
                fileUrl: 'test',
                fileName: 'test',
              },
            ],
            logSmsC: 'test',
          },
        ],
        troubleOccursFile: {
          fileName: '',
          fileType: '',
          fileNameAlias: '',
        },
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render troubleOccursFile no keys', () => {
    const customProps = {
      ...props,
      data: {
        troubleOccurs: [
          {
            file: [
              {
                fileUrl: 'test',
                fileName: 'test',
              },
            ],
          },
        ],
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no trouble files', () => {
    const customProps = {
      ...props,
      data: {
        troubleOccurs: [
          {
            file: [
              {
                fileUrl: 'test',
                fileName: 'test',
              },
            ],
          },
        ],
        troubleOccursFile: {},
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no trouble occurs', () => {
    const customProps = {
      ...props,
      data: {
        troubleOccurs: [],
        troubleOccursFile: {},
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render trouble files not object', () => {
    const customProps = {
      ...props,
      data: {
        troubleOccurs: [],
        troubleOccursFile: '',
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
