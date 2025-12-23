import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './styles';
import Carousel from '../../components/carousel';
import Image from '../../components/image';
import TextEditor from '../../components/texteditor';
import Button from '@__old/components/elements/Button';
import {
  dummyText,
  replacer,
  stringCounter,
  create_UUID,
  getObjects,
  ErrorMessageSections,
  onlyContainedWhitespace,
} from '../../utils';
import Dots from '../../components/dots';
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

const ContentCarousel = ({ classes, block, getUpdate, page, activeTab }) => {
  const [slidePosition, setSlidePositon] = useState(0);
  const [editableTitle, setEditableTitle] = useState(false);
  const [editableDesc, setEditableDesc] = useState(false);
  const [valueDesc, setValueDesc] = useState('');

  const MAX_TITLE = 200;

  const defaultSlide = {
    _uid: create_UUID(),
    title: dummyText.title,
    description: dummyText.description,
    imageUrl: { mediaPath: dummyText.image },
  };

  useEffect(() => {
    setEditableDesc(false);
    setEditableTitle(false);
  }, [page.length, activeTab]);

  const updateItem = (item) => {
    getUpdate(item);
  };

  const handleTitle = (e, uiid) => {
    const text = e.currentTarget.innerText.replace(/\s\s+/g, ' ');
    setEditableTitle(false);
    const findBlock = getObjects(block, '_uid', uiid);
    const index = block.detail.findIndex((el) => el._uid === uiid);
    if (text !== '') {
      updateItem({
        ...block,
        detail: replacer(block.detail, index, {
          ...findBlock[0],
          title: text,
        }),
      });
    }
  };

  const handleDescriptions = (uiid) => {
    // const text = e.currentTarget.innerText;
    const text = valueDesc;
    setEditableDesc(false);

    const findBlock = getObjects(block, '_uid', uiid);
    const index = block.detail.findIndex((el) => el._uid === uiid);
    if (text !== '') {
      updateItem({
        ...block,
        detail: replacer(block.detail, index, {
          ...findBlock[0],
          description: text,
        }),
      });
    }
  };

  const handleImage = (value) => {
    const index = block.detail.findIndex((el) => el._uid === value._uid);
    updateItem({
      ...block,
      detail: replacer(block.detail, index, value),
    });
  };

  const handleActive = (value) => {
    setSlidePositon(value);
    setEditableDesc(false);
    setEditableTitle(false);
  };

  const updateSlide = (value) => {
    updateItem({
      ...block,
      detail: value,
    });
  };

  const handleEditableTitle = () => setEditableTitle(true);

  const handleEditableDesc = (value) => {
    setEditableDesc(true);
    setValueDesc(value);
  };

  const handleGetStory = (e) => setValueDesc(e);

  return (
    <>
      <Carousel position={slidePosition}>
        {block.detail.map((item, index) => {
          return (
            <div className={classes.default} key={`key-${index}`}>
              <>
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
                        fontWeight: '400',
                        lineHeight: '28px',
                        // maxWidth: 587,
                        backgroundColor: '#FFF3BF',
                      }}
                      suppressContentEditableWarning={true}
                    >
                      {item.title === dummyText.title ? '' : item.title}
                    </div>
                  ) : (
                    <h2
                      className={classes.titleContent}
                      onClick={handleEditableTitle}
                      style={{
                        cursor: 'pointer',
                        fontSize: 24,
                        fontWeight: '400',
                        lineHeight: '28px',
                        // maxWidth: 587,
                        wordBreak: 'break-all',
                      }}
                    >
                      {!onlyContainedWhitespace(item.title).length
                        ? dummyText.title
                        : item.title}
                    </h2>
                  )}
                  {stringCounter(item.title) > MAX_TITLE &&
                    ErrorMessageSections('Title', MAX_TITLE)}
                  {editableDesc ? (
                    // <div
                    //   className={classes.descContent}
                    //   contentEditable
                    //   onBlur={(e) => handleDescriptions(e, item._uid)}
                    //   onFocus={() => setEditableTitle(false)}
                    //   placeholder={dummyText.description}
                    //   style={{
                    //     maxWidth: 587,
                    //     backgroundColor: '#FFF3BF'
                    //   }}>
                    //   {item.description === dummyText.description ? '' : item.description}
                    // </div>
                    <div className={classes.descContent}>
                      <TextEditor
                        getStory={handleGetStory}
                        name="desc"
                        type="explore"
                        value={
                          valueDesc === dummyText.description
                            ? dummyText.description
                            : item.description
                        }
                      />
                      <div style={{ marginTop: '10px' }}>
                        <Button
                          onClick={() => handleDescriptions(item._uid)}
                          style={{ marginRight: '10px' }}
                        >
                          {item.description === dummyText.description
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
                  ) : (
                    <p
                      className={classes.descContent}
                      onClick={() =>
                        handleEditableDesc(
                          item.description === dummyText.description
                            ? dummyText.description
                            : item.description,
                        )
                      }
                      style={{
                        cursor: 'pointer',
                        // maxWidth: 587,
                        wordBreak: 'break-all',
                      }}
                    >
                      {/* {!onlyContainedWhitespace(item.description).length ?
                        dummyText.description : item.description} */}
                      {!onlyContainedWhitespace(item.description).length ? (
                        dummyText.description
                      ) : (
                        <FroalaEditorView model={item.description} />
                      )}
                    </p>
                  )}
                </div>
                <div className={classes.contentImage}>
                  <Image
                    alt="Image in here..."
                    getUpdateItem={handleImage}
                    item={item}
                  />
                </div>
              </>
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
      />
    </>
  );
};

ContentCarousel.defaultProps = {
  block: {},
  classes: {},
  page: [],
};

ContentCarousel.propTypes = {
  activeTab: PropTypes.number.isRequired,
  block: PropTypes.object,
  classes: PropTypes.object,
  getUpdate: PropTypes.func.isRequired,
  page: PropTypes.object,
};

const Styled = withStyles(styles)(ContentCarousel);

export default Styled;
