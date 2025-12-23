import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './styles';
import {
  dummyText,
  replacer,
  getObjects,
  create_UUID,
  stringCounter,
  ErrorMessageSections,
  onlyContainedWhitespace,
} from '../../utils';

import Carousel from '../../components/carousel';
import Image from '../../components/image';
import TabPanel from '../../components/tabPanel';
import Dots from '../../components/dots';
import TextEditor from '../../components/texteditor';
import Button from '@__old/components/elements/Button';

// components part
import TabItem from '../../components/tab';
import dynamic from 'next/dynamic';

const FroalaEditorView = dynamic(
  async () => {
    const values = await Promise.all([
      import('react-froala-wysiwyg/FroalaEditorView'),
    ]);
    return values[0];
  },
  {
    loading: () => <p>LOADING!!!</p>,
    ssr: false,
  },
);

const ContentAddon = ({ classes, block, getUpdate, page, activeTab }) => {
  const [value, setValue] = useState(0);
  const [slidePosition, setSlidePositon] = useState(0);
  const [editableTitle, setEditableTitle] = useState(false);
  const [editableDesc, setEditableDesc] = useState(false);
  const [valueDesc, setValueDesc] = useState('');

  const MAX_TITLE = 200;
  // const MAX_DESC = 255;

  const defaultTab = {
    _uid: create_UUID(),
    title: 'Tab Name',
    description: dummyText.description,
  };

  useEffect(() => {
    setEditableDesc(false);
    setEditableTitle(false);
  }, [page.length, activeTab]);

  const defaultSlide = {
    _uid: create_UUID(),
    title: dummyText.title,
    imageUrl: { mediaPath: dummyText.image },
    tabs: [
      {
        _uid: create_UUID(),
        title: 'Tab Name',
        description: dummyText.description,
      },
    ],
  };

  const updateItem = (item, index) => {
    getUpdate(item, index);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    closeEditable();
  };

  const handleTabs = (value, uid) => {
    const findDetail = block.detail.filter((el) => el._uid === uid);
    let index = block.detail.findIndex((el) => el._uid === uid);
    updateItem({
      ...block,
      detail: replacer(block.detail, index, { ...findDetail[0], tabs: value }),
    });
  };

  const handleTitle = (e, uid) => {
    const text = e.currentTarget.innerText.replace(/\s\s+/g, ' ');
    setEditableTitle(false);
    // find edit block target
    const findBlock = getObjects(block, '_uid', uid);
    // find index tabs
    let index = block.detail.findIndex((el) => el._uid === uid);
    // replace find block with new data
    const blocktemp = { ...findBlock[0], title: text };
    // replace tabs with new data
    const tabtemp = replacer(block.detail, index, blocktemp);
    if (e.currentTarget.innerText !== '') {
      updateItem({ ...block, detail: tabtemp }, 0);
    }
  };

  const handleImage = (data) => {
    const index = block.detail.findIndex((el) => el._uid === data._uid);
    updateItem({
      ...block,
      detail: replacer(block.detail, index, data),
    });
  };

  const handleDescription = (uid, itemId) => {
    // const text = e.currentTarget.innerText;
    const text = valueDesc;
    setValueDesc(valueDesc);
    setEditableDesc(false);
    const findBlock = getObjects(block, '_uid', uid);
    const findItem = getObjects(block, '_uid', itemId);

    const indexTab = findItem[0].tabs.findIndex((el) => el._uid === uid);
    const replaceTab = replacer(findItem[0].tabs, indexTab, {
      ...findBlock[0],
      description: text,
    });

    const indexDetail = block.detail.findIndex(
      (el) => el._uid === findItem[0]._uid,
    );
    if (text !== '') {
      updateItem(
        {
          ...block,
          detail: replacer(block.detail, indexDetail, {
            ...findItem[0],
            tabs: replaceTab,
          }),
        },
        indexDetail,
      );
    }
  };

  const closeEditable = () => {
    setEditableDesc(false);
    setEditableTitle(false);
  };

  const handleActive = (value) => {
    setSlidePositon(value);
    closeEditable();
    setValue(0);
  };

  const updateSlide = (value) => {
    closeEditable();
    updateItem({
      ...block,
      detail: value,
    });
  };

  const handleEditableTitle = () => {
    setEditableTitle(true);
  };

  const handleEditableDesc = (value) => {
    setEditableDesc(true);
    setValueDesc(value);
  };

  const handleGetStory = (e) => {
    setValueDesc(e);
  };

  return (
    <>
      <Carousel position={slidePosition}>
        {block.detail.map((item, index) => {
          return (
            <div className={classes.default} key={`key-${index}`}>
              <div className={classes.contentImageLeft}>
                <Image
                  alt="Image in here..."
                  getUpdateItem={handleImage}
                  item={item}
                />
              </div>
              <div className={classes.contentText}>
                {editableTitle ? (
                  <div
                    contentEditable
                    onBlur={(e) => handleTitle(e, item._uid)}
                    onFocus={() => setEditableDesc(false)}
                    placeholder={dummyText.title}
                    style={{
                      margin: '0.83em 0',
                      fontSize: 24,
                      // maxWidth: 587,
                      backgroundColor: '#FFF3BF',
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                    suppressContentEditableWarning={true}
                  >
                    {item.title === dummyText.title ? '' : item.title}
                  </div>
                ) : (
                  <p
                    onClick={handleEditableTitle}
                    style={{ fontSize: 24, marginTop: 0, marginBottom: 0 }}
                    suppressContentEditableWarning={true}
                  >
                    {!onlyContainedWhitespace(item.title).length
                      ? dummyText.title
                      : item.title}
                  </p>
                )}
                {stringCounter(item.title) > MAX_TITLE &&
                  ErrorMessageSections('Title', MAX_TITLE)}
                <TabItem
                  block={item.tabs}
                  defaultTab={defaultTab}
                  index={value}
                  maxSize={6}
                  onChange={handleChange}
                  updateTabs={(value) => handleTabs(value, item._uid)}
                />
                {item.tabs.map((i, index) => {
                  return (
                    <>
                      <TabPanel
                        index={index}
                        key={`key${i.label}-${index}`}
                        value={value}
                      >
                        {editableDesc ? (
                          <>
                            {/* <div
                              className={classes.descContent}
                              contentEditable
                              onBlur={() => handleDescription( i._uid, item._uid)}
                              onFocus={() => setEditableTitle(false)}
                              placeholder={dummyText.description}
                              style={{
                                maxWidth: 587,
                                backgroundColor: '#FFF3BF'
                              }}>
                              {i.description === dummyText.description ? '' : i.description}
                            </div> */}
                            <div className={classes.descContent}>
                              <TextEditor
                                getStory={handleGetStory}
                                name="description"
                                type="explore"
                                value={
                                  valueDesc === dummyText.description
                                    ? dummyText.description
                                    : i.description
                                }
                              />
                              <div style={{ marginTop: '10px' }}>
                                <Button
                                  onClick={() =>
                                    handleDescription(i._uid, item._uid)
                                  }
                                  style={{ marginRight: '10px' }}
                                >
                                  {i.description === dummyText.description
                                    ? 'Save'
                                    : 'Update'}
                                </Button>
                                <Button
                                  onClick={() => setEditableDesc(false)}
                                  variant="ghost"
                                >
                                  {' '}
                                  Cancel{' '}
                                </Button>
                              </div>
                            </div>
                          </>
                        ) : (
                          // <p
                          //   className={classes.descContent}
                          //   onClick={handleEditableDesc(i.description)}
                          //   style={{
                          //     cursor: 'pointer',
                          //     maxWidth: 587,
                          //     wordBreak: 'break-all',
                          //   }}>
                          //   {!onlyContainedWhitespace(i.description).length ?
                          //     dummyText.description : i.description}
                          // </p>
                          <p
                            className={classes.descContent}
                            onClick={() =>
                              handleEditableDesc(
                                i.description === dummyText.description
                                  ? dummyText.description
                                  : i.description,
                              )
                            }
                            style={{
                              cursor: 'pointer',
                              wordBreak: 'break-all',
                            }}
                          >
                            {!onlyContainedWhitespace(i.description).length ? (
                              dummyText.description
                            ) : (
                              <FroalaEditorView model={i.description} />
                            )}
                          </p>
                        )}
                      </TabPanel>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Carousel>
      <Dots
        active={slidePosition}
        activeTab={activeTab}
        changeSlide={handleActive}
        data={block.detail}
        defaultSlide={defaultSlide}
        getUpdateSlide={updateSlide}
        position={'middle'}
      />
    </>
  );
};

ContentAddon.defaultProps = {
  action: {},
  block: {},
  data: [],
  id: {},
  page: {},
  position: '',
};

ContentAddon.propTypes = {
  action: PropTypes.object,
  activeTab: PropTypes.number.isRequired,
  block: PropTypes.object,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  getUpdate: PropTypes.func.isRequired,
  id: PropTypes.object,
  page: PropTypes.object,
  position: PropTypes.string,
};

const Styled = withStyles(styles)(ContentAddon);

export default Styled;
