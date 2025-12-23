import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Add from '../Create';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const actions = {
  id: 'id',
  formState: {},
  control: {},
  confirmation: {},
  clearConfirmation: jest.fn(),
  fileImage: null,
  setFileImage: jest.fn(),
  handleSubmit: jest.fn(),
  handleUploadFile: jest.fn(),
  confirmAdd: jest.fn(),
  optionsProduct: [],
  loadingProduct: false,
  languages: [],
  tab: 'id',
  setTab: jest.fn(),
  handleSwap: jest.fn(),
  isLoading: false,
  isEmptyImage: false,
  onKeyDownKeyword: jest.fn(),
  chipKeyword: [],
  onDeleteChipKeyword: jest.fn(),
  chipRelatedProduct: [],
  onDeleteChipRelatedProduct: jest.fn(),
  handleEditStory: jest.fn(),
  storyIdValue: '',
  storyEnValue: '',
  watchTranslate: {},
  detail: {},
  handleCancel: jest.fn(),
  dummyTextId: '',
  dummyTextEn: '',
  isValid: false,
  isDirty: false,
};

describe('src/containers/ContentManagement/Article/Create', () => {
  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('10 October 2022 08:08:08 UTC'));
  });

  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render another state tab id', () => {
    const props = {
      ...actions,
      id: '',
      fileImage: { mediaName: 'test' },
      storyIdValue: 'Ketik story konten di sini dalam Bahasa..',
      storyEnValue: 'Type content story here in English..',
      dummyTextId: 'Ketik story konten di sini dalam Bahasa..',
      dummyTextEn: 'Type content story here in English..',
      chipKeyword: ['test'],
      tab: 'id',
      chipRelatedProduct: [{ label: 'test' }],
      isValid: true,
      isDirty: true,
    };
    useActions.mockReturnValue(props);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);

    expect(tree).toMatchSnapshot();

    // tree.props.children.props.children[0].props.children[7].props.children[1].props.onChange(); //handleEditStory
    // tree.props.children.props.children[0].props.children[8].props.children[1].props.children[1][0].props.children.props.onDelete(); //onDeleteChipRelatedProduct
    // tree.props.children.props.children[0].props.children[9].props.children[1].props.children[0].props.onKeyDown(); //onKeyDownKeyword
    // tree.props.children.props.children[0].props.children[9].props.children[1].props.children[1][0].props.children.props.onDelete(); //onDeleteChipKeyword
  });

  test('render state tab en', () => {
    const props = {
      ...actions,
      id: '',
      fileImage: { mediaName: 'test' },
      storyIdValue: 'test',
      storyEnValue: 'test',
      dummyTextId: 'Ketik story konten di sini dalam Bahasa..',
      dummyTextEn: 'Type content story here in English..',
      chipKeyword: ['test'],
      tab: 'en',
      chipRelatedProduct: [{ label: 'test' }],
    };
    useActions.mockReturnValue(props);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render state tab en & value story', () => {
    const props = {
      ...actions,
      storyIdValue: 'Ketik story konten di sini dalam Bahasa..',
      storyEnValue: 'Type content story here in English..',
      dummyTextId: 'Ketik story konten di sini dalam Bahasa..',
      dummyTextEn: 'Type content story here in English..',
      tab: 'en',
    };
    useActions.mockReturnValue(props);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
