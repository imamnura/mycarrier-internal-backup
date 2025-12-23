import React from 'react';
import PreviewAm from '../previewAm';
import { unwrap } from '@material-ui/core/test-utils';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

const ComponentNaked = unwrap(PreviewAm);
describe('src/components/pages/ContentManagement/InterestedList/Detail/component/PreviewAm', () => {
  const props = {
    classes: {
      subtitle: '',
      content: '',
      subitem: '',
      profileTitle: '',
    },
  };
  test('render', () => {
    const customProps = {
      ...props,
      data: {
        amMapping: {
          fullName: '',
          nik: '',
          segment: '',
          generalManager: '',
          jobTitle: '',
          phoneNumber: '',
          email: '',
        },
        sendEmail: {
          email: '',
          statusEmail: '',
        },
      },
      lastUpdate: '',
      setIsQuestion: jest.fn(),
    };
    const tree = shallow(<ComponentNaked {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  // test('render status failed click no', () => {
  //   const customProps = {
  //     ...props,
  //     data: {
  //       amMapping: {
  //         fullName: '',
  //         nik: '',
  //         segment: '',
  //         generalManager: '',
  //         jobTitle: '',
  //         phoneNumber: '',
  //         email: '',
  //       },
  //       sendEmail: {
  //         email: '',
  //         statusEmail: 'failed'
  //       },
  //     },
  //     lastUpdate: '',
  //     setIsQuestion: jest.fn()
  //   };
  //   const tree = shallow(<ComponentNaked {...customProps} />);
  //   tree.find('#nobutton').props().onClick();
  //   expect(tree).toMatchSnapshot();
  // });
  // test('render status failed click yes', () => {
  //   const customProps = {
  //     ...props,
  //     data: {
  //       amMapping: {
  //         fullName: '',
  //         nik: '',
  //         segment: '',
  //         generalManager: '',
  //         jobTitle: '',
  //         phoneNumber: '',
  //         email: '',
  //       },
  //       sendEmail: {
  //         email: '',
  //         statusEmail: 'failed'
  //       },
  //     },
  //     lastUpdate: '',
  //     setIsQuestion: jest.fn()
  //   };
  //   const tree = shallow(<ComponentNaked {...customProps} />);
  //   tree.find('#yesbutton').props().onClick();
  //   expect(tree).toMatchSnapshot();
  // });
  test('render no data', () => {
    const customProps = {
      ...props,
      data: {},
      lastUpdate: '',
      setIsQuestion: jest.fn(),
    };
    const tree = shallow(<ComponentNaked {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  // test('render status failed', () => {
  //   const customProps = {
  //     ...props,
  //     data: {
  //       amMapping: [
  //         {
  //           fullName: 'tes',
  //           nik: 'tes',
  //           segment: 'tes',
  //           generalManager: 'tes',
  //           jobTitle: 'tes',
  //           phoneNumber: 'tes',
  //           email: 'tes',
  //         },
  //       ],
  //       sendEmail: {
  //         email: '',
  //         statusEmail: 'failed'
  //       },
  //     },
  //     lastUpdate: '',
  //     setIsQuestion: jest.fn()
  //   };
  //   const amMapping = {
  //     fullName: 'tes',
  //     nik: 'tes',
  //     segment: 'tes',
  //     generalManager: 'tes',
  //     jobTitle: 'tes',
  //     phoneNumber: 'tes',
  //     email: 'tes',
  //   };
  //   const tree = shallow(<ComponentNaked {...customProps} />);
  //   expect(tree).toMatchSnapshot();
  //   tree.find('#redlist').props().child({ amMapping });
  // });
});
