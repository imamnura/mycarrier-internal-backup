import React, { useState } from 'react';
import { mapStateToProps, mapDispatchToProps, Styled } from '../profile';
import { unwrap } from '@material-ui/core/test-utils';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

const Component = unwrap(Styled);

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
describe('src/pages/ContentManagement/AmMapping/Detail/element/component/amMappingTable', () => {
  it('mapStateToProps', () => {
    const state = {
      loading: {
        isLoading: false,
      },
    };
    expect(mapStateToProps(state).isLoading).toEqual(false);
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).not.toBeNull();
  });
});

describe('component/profile', () => {
  let props = {
    classes: {
      editButton: {},
    },
    lastUpdate: 'tes',
  };

  const setState = jest.fn();

  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
  });

  test('render no data', () => {
    const customProps = {
      ...props,
      data: {},
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render', () => {
    const customProps = {
      ...props,
      data: {
        fullName: '',
        segment: '',
        nik: '',
        atasan: {
          nama: '',
        },
        jobTitle: '',
        phoneNumber: '',
        email: '',
      },
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
