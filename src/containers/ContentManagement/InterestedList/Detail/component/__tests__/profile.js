import React from 'react';
import Detail from '../profile';
import { unwrap } from '@material-ui/core/test-utils';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

const ComponentNaked = unwrap(Detail);
describe('src/components/pages/ContentManagement/InterestedList/Detail/component/profile', () => {
  const props = {
    classes: {
      subtitle: '',
      content: '',
      subitem: '',
      removeButton: '',
    },
    deleteAM: jest.fn(),
  };
  test('render loading no fill', () => {
    const customProps = {
      ...props,
      amProfile: [
        {
          fullName: '',
          nik: '',
          segment: '',
          generalManager: '',
          jobTitle: '',
          phoneNumber: '',
          email: '',
        },
      ],
    };
    const tree = shallow(<ComponentNaked {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render loading fill', () => {
    const customProps = {
      ...props,
      amProfile: [
        {
          fullName: 'tes',
          nik: 'tes',
          segment: 'tes',
          generalManager: 'tes',
          jobTitle: 'tes',
          phoneNumber: 'tes',
          email: 'tes',
        },
      ],
    };
    const tree = shallow(<ComponentNaked {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render loading no amProfile', () => {
    const customProps = {
      ...props,
      amProfile: [],
    };
    const tree = shallow(<ComponentNaked {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render loading delete', () => {
    const customProps = {
      ...props,
      amProfile: [
        {
          fullName: 'tes',
          nik: 'tes',
          segment: 'tes',
          generalManager: 'tes',
          jobTitle: 'tes',
          phoneNumber: 'tes',
          email: 'tes',
        },
      ],
    };
    const tree = shallow(<ComponentNaked {...customProps} />);
    tree.find('#delbutton').props().onClick();
  });
});
