import React from 'react';
import Component from '../amProfile';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/containers/ContentManagement/AmMapping/Add/elements/amProfile', () => {
  const props = {
    handleGetValueAM: jest.fn(),
    handleTypeSearchProfil: jest.fn(),
    labelProfile: '',
    loadingAMProfile: false,
    optionsAMProfile: [],
    profile: {},
    typeProfil: '',
    classes: {},
  };

  test('render', () => {
    const tree = shallow(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render profile metadata', () => {
    const customProps = {
      ...props,
      profile: {
        metaData: {
          fullName: 'test',
          segment: 'test',
          jobTitle: 'test',
          nik: 'test',
          phoneNumber: 'test',
          email: 'test',
          atasan: {
            nama: 'test',
          },
        },
      },
      loadingAMProfile: true,
      typeProfil: 'name',
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render typeProfil nik', () => {
    const customProps = {
      ...props,
      typeProfil: 'nik',
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render profile metadata empty', () => {
    const customProps = {
      ...props,
      profile: {
        metaData: {
          fullName: '',
          segment: '',
          jobTitle: '',
          nik: '',
          phoneNumber: '',
          email: '',
          atasan: {
            nama: '',
          },
        },
      },
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render btn search profile toogle', () => {
    const tree = shallow(<Component {...props} />);
    tree.find('#toogleSearchProfileByName').props().onClick();
    tree.find('#toogleSearchProfileByNik').props().onClick();
  });
});
