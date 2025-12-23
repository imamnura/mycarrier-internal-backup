import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from './styles';
import * as actions from '../action';
import Image from '../components/image';
import DeleteSection from '../components/addSection/deleteSection';
import { withStyles } from '@material-ui/core/styles';
import TextEditor from '../components/texteditor';
import Button from '@__old/components/elements/Button';
import {
  replacer,
  getValues,
  stringCounter,
  dummyText,
  ErrorMessageSections,
  onlyContainedWhitespace,
} from '../utils';
import { ACTIONS } from '@constants';
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

const Default = ({ action, classes, block, page, activeTab }) => {
  const [toggle, setToggle] = useState(true);
  const [validateTitle, setValidateTitle] = useState(false);
  const [editableTitle, setEditableTitle] = useState(false);
  const [editableDesc, setEditableDesc] = useState(false);
  const [valueDesc, setValueDesc] = useState('');

  const MAX_TITLE = 200;

  const dispatch = useDispatch();

  const updateContent = (blocktemp) => {
    let i = page.findIndex((el) => el._uid === blocktemp._uid);
    action.updateSectionPage(replacer(page, i, blocktemp));
    if (activeTab === 0) {
      dispatch({
        type: ACTIONS.PRODUCT_BASE_LANGUAGE,
        data: replacer(page, i, blocktemp),
      });
    } else {
      dispatch({
        type: ACTIONS.PRODUCT_TRANSLATE_LANGUAGE,
        data: replacer(page, i, blocktemp),
      });
    }
  };

  useEffect(() => {
    setEditableDesc(false);
    setEditableTitle(false);
  }, [page.length, activeTab]);

  const validatePage = (block) => {
    // let title = getValues(block, 'title').filter(el => el === dummyText.title);
    // let description = getValues(block, 'description').filter(el => el === dummyText.description);
    let image = getValues(block, 'mediaPath').filter(
      (el) => el === dummyText.image,
    );
    let titleCount = getValues(block, 'title').filter((el) => el)[0]?.length;
    // let descriptionCount = getValues(block, 'description').filter(el => el)[0]?.length;

    if (titleCount !== undefined && titleCount > MAX_TITLE) {
      return true;
    } else if (image.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleTitle = async (e) => {
    const text = e.currentTarget.innerText;
    if (text !== '' || validateTitle) {
      if (stringCounter(text) > MAX_TITLE) {
        setValidateTitle(true);
      }
    } else {
      setValidateTitle(false);
    }
    setEditableTitle(false);

    updateContent({
      ...block,
      status: validatePage({
        ...block,
        title: text,
      }),
      title: text,
    });
  };

  const handleDescriptions = async () => {
    const text = valueDesc;
    setEditableDesc(false);
    updateContent({
      ...block,
      status: validatePage({
        ...block,
        description: text,
      }),
      description: text,
    });
  };

  const handleImage = (data) => {
    updateContent({
      ...data,
      status: validatePage({ ...data }),
    });
  };

  const triggerAnimation = () => setToggle(false);

  const handleEditableTitle = () => setEditableTitle(true);

  const handleEditableDesc = (value) => {
    setEditableDesc(true);
    setValueDesc(value);
  };

  const handleGetStory = (e) => setValueDesc(e);

  return (
    <div className={toggle ? classes.animContainer : classes.animOutContainer}>
      {block._uid !== 'defaultID' && (
        <DeleteSection block={block} triggerAnimation={triggerAnimation} />
      )}
      {block.status && (
        <p className={classes.warn}> Please complete section below </p>
      )}
      <div
        className={
          activeTab === 0 ? classes.default : classes.defaultWithMargin
        }
      >
        <div className={classes.contentText}>
          {editableTitle ? (
            <div
              autoFocus={true}
              className={classes.titleContent}
              contentEditable
              onBlur={handleTitle}
              onFocus={() => setEditableDesc(false)}
              placeholder={dummyText.title}
              style={{ backgroundColor: '#FFF3BF' }}
              suppressContentEditableWarning={true}
            >
              {block.title === dummyText.title ? '' : block.title}
            </div>
          ) : (
            <h1
              className={classes.titleContent}
              onClick={handleEditableTitle}
              style={{ cursor: 'pointer', wordBreak: 'break-all' }}
            >
              {!onlyContainedWhitespace(block && block.title).length
                ? dummyText.title
                : block.title}
            </h1>
          )}
          {stringCounter(block.title) > MAX_TITLE &&
            ErrorMessageSections('Title', MAX_TITLE)}
          {editableDesc ? (
            <div className={classes.descContent}>
              <TextEditor
                getStory={handleGetStory}
                name="desc"
                type="explore"
                value={
                  valueDesc === dummyText.description
                    ? dummyText.description
                    : block.description
                }
              />
              <div style={{ marginTop: '10px' }}>
                <Button
                  onClick={() => handleDescriptions()}
                  style={{ marginRight: '10px' }}
                >
                  {block.description === dummyText.description
                    ? 'Save'
                    : 'Update'}
                </Button>
                <Button onClick={() => setEditableDesc(false)} variant="ghost">
                  {' '}
                  Cancel{' '}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p
                className={classes.descContent}
                onClick={() =>
                  handleEditableDesc(
                    block.description === dummyText.description
                      ? dummyText.description
                      : block.description,
                  )
                }
                style={{
                  cursor: 'pointer',
                  maxWidth: 587,
                  wordBreak: 'break-all',
                }}
              >
                {!onlyContainedWhitespace(block && block.description).length ? (
                  dummyText.description
                ) : (
                  <FroalaEditorView model={block.description} />
                )}
              </p>
            </>
          )}
        </div>
        <div className={classes.contentImage}>
          <div
            onClick={() => {
              setEditableTitle(false);
              setEditableDesc(false);
            }}
          >
            <Image
              alt="Image in here..."
              getUpdateItem={handleImage}
              item={block}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Default.defaultProps = {
  action: {},
  activeTab: 0,
  block: {},
  deleteToggler: false,
  page: [],
  pageValid: [],
};

Default.propTypes = {
  action: PropTypes.object,
  activeTab: PropTypes.number,
  block: PropTypes.object,
  classes: PropTypes.object.isRequired,
  deleteToggler: PropTypes.bool,
  page: PropTypes.array,
  pageValid: PropTypes.array,
};

function mapStateToProps(state) {
  const { activeTab, page, pageValid } = state.productManagement;
  return { activeTab, page, pageValid };
}

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(actions, dispatch) };
}

const Styled = withStyles(styles)(Default);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
