import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ModalLog from '../ModalLog';
import useAction from '../hooks/useAction';
// import { useDetailData } from '../../../utils';

jest.mock('../hooks/useAction');
// jest.mock('../../../utils');

const props = {
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/ModalLog', () => {
  // let realUseContext;
  // let useContextMock;
  // // Setup mock
  // beforeEach(() => {
  //   realUseContext = React.useContext;
  //   useContextMock = React.useContext = jest.fn();
  // });
  // // Cleanup mock
  // afterEach(() => {
  //   React.useContext = realUseContext;
  // });

  test('run properly', () => {
    // useContextMock.mockReturnValue({ data: { ttr: { list: []} } });
    useAction.mockReturnValueOnce({
      onClose: jest.fn(),
      open: true,
      setTab: jest.fn().mockReturnValue(jest.fn()),
      tab: 'history',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalLog {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('run ttr tab', () => {
    // useContextMock.mockReturnValue({ data: { ttr: { list: []} } });
    useAction.mockReturnValueOnce({
      onClose: jest.fn(),
      open: true,
      setTab: jest.fn().mockReturnValue(jest.fn()),
      tab: 'ttr',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalLog {...props} />);
    expect(tree).toMatchSnapshot();
  });

  // test('run ttr tab', () => {
  //   useAction.mockReturnValueOnce({
  //     // onClose: jest.fn(),
  //     open: true,
  //     setTab: jest.fn().mockReturnValue(jest.fn()),
  //     tab: 'ttr',
  //   });
  //   // const renderer = new TestRenderer;
  //   const tree = new TestRenderer.create(
  //     <LeadManagementSystemContext.Provider
  //       value={{ data: { ttr: { list: []} } }}
  //     >
  //       <ModalLog {...props} />
  //     </LeadManagementSystemContext.Provider>
  //   );
  //   expect(tree).toMatchSnapshot();
  // });
});
