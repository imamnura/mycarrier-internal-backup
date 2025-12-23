import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import * as actions from '../action';
import TabItem from '../components/tab';
import Image from '../components/image';
import {
  getValues,
  dummyText,
  create_UUID,
  replacer,
  getObjects,
  stringCounter,
  ErrorMessageSections,
  onlyContainedWhitespace,
} from '../utils';
import TabPanel from '../components/tabPanel';
import DeleteSection from '../components/addSection/deleteSection';
import Button from '@__old/components/elements/Button';

const Pricing = ({ action, block, classes, page }) => {
  const [toggle, setToggle] = useState(true);
  const [editableTitle, setEditableTitle] = useState(false);
  const [editableDesc, setEditableDesc] = useState(false);
  const [editableInnerDesc, setEditableInnerDesc] = useState(false);
  const [editableSubtitle, setEditableSubtitle] = useState(false);
  const MAX_TITLE = 200;
  const MAX_DESC = 1500;

  useEffect(() => {
    closeEditable();
  }, [page.length]);

  const defaultTab = {
    _uid: create_UUID(),
    title: 'Nama Tab',
    description: 'Ketik deskripsi konten di sini dalam Bahasa..',
    imageUrl: { mediaPath: dummyText.image },
  };

  const updateContent = (blocktemp) => {
    let i = page.findIndex((el) => el._uid === block._uid);
    action.updateSectionPage(replacer(page, i, blocktemp));
  };

  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  function validatePage(block) {
    let title = getValues(block, 'title').filter(
      (el) => el === dummyText.title,
    );
    let subtitle = getValues(block, 'subtitle').filter(
      (el) => el === dummyText.subtitle,
    );
    let description = getValues(block, 'description');
    let image = getValues(block, 'mediaPath').filter(
      (el) => el === dummyText.image,
    );
    let titleCount = getValues(block, 'title').filter((el) => el)[0].length;
    let subtitleCount = getValues(block, 'subtitle').filter((el) => el)[0]
      .length;
    let titleValue = getValues(block, 'title');
    let subtitleValue = getValues(block, 'subtitle');

    for (let i in description) {
      if (description[i].length > MAX_DESC) return true;
      if (description[i].replace(/\s\s+/g, ' ') === ' ') return true;
    }
    for (let i in titleValue) {
      if (titleValue[i].replace(/\s\s+/g, ' ') === ' ') return true;
    }
    for (let i in subtitleValue) {
      if (subtitleValue[i].replace(/\s\s+/g, ' ') === ' ') return true;
    }

    if (title.length !== 0 || titleCount > MAX_TITLE) {
      return true;
    } else if (subtitle.length !== 0 || subtitleCount > MAX_DESC) {
      return true;
    }
    if (image.length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  const handleTitle = (e) => {
    const text = e.currentTarget.innerText.replace(/\s\s+/g, ' ');
    closeEditable();
    if (text !== '') {
      updateContent({
        ...block,
        status: validatePage({
          ...block,
          title: text,
        }),
        title: text,
      });
    }
  };

  const handleSubTitle = (e) => {
    closeEditable();
    const text = e.currentTarget.innerText.replace(/\s\s+/g, ' ');
    if (text !== '') {
      updateContent({
        ...block,
        status: validatePage({
          ...block,
          subtitle: text,
        }),
        subtitle: text,
      });
    }
  };

  const handleDescription = (e) => {
    closeEditable();
    const text = e.currentTarget.innerText.replace(/\s\s+/g, ' ');
    if (text !== '') {
      updateContent({
        ...block,
        status: validatePage({
          ...block,
          description: text,
        }),
        description: text,
      });
    }
  };

  const handleTabDescription = (e, id) => {
    closeEditable();
    const text = e.currentTarget.innerText.replace(/\s\s+/g, ' ');
    // find edit block target
    const findBlock = getObjects(block, '_uid', id);
    // find index tabs
    let index = block.tabs.findIndex((el) => el._uid === id);
    // replace find block with new data
    const blocktemp = { ...findBlock[0], description: text };
    // replace tabs with new data
    const tabtemp = replacer(block.tabs, index, blocktemp);
    // send edited block to store
    updateContent({
      ...block,
      status: validatePage({
        ...block,
        tabs: tabtemp,
      }),
      tabs: tabtemp,
    });
  };

  const handleTabs = (value) => {
    closeEditable();
    updateContent({
      ...block,
      status: validatePage({
        ...block,
        tabs: value,
      }),
      tabs: value,
    });
  };

  const handleImage = (data) => {
    closeEditable();
    const index = block.tabs.findIndex((el) => el._uid === data._uid);
    updateContent({
      ...block,
      status: validatePage({
        ...block,
        tabs: replacer(block.tabs, index, data),
      }),
      tabs: replacer(block.tabs, index, data),
    });
  };

  const triggerAnimation = () => {
    setToggle(false);
  };

  const handleEditableTitle = () => {
    setEditableTitle(true);
  };

  const handleEditableDesc = () => {
    setEditableDesc(true);
  };

  const handeEditableSubtitle = () => {
    setEditableSubtitle(true);
  };

  const handleEditableInnerDesc = () => {
    setEditableInnerDesc(true);
  };

  const closeEditable = () => {
    setEditableSubtitle(false);
    setEditableDesc(false);
    setEditableTitle(false);
    setEditableInnerDesc(false);
  };

  return (
    <div className={toggle ? classes.animContainer : classes.animOutContainer}>
      <DeleteSection block={block} triggerAnimation={triggerAnimation} />
      {block.status && (
        <p className={classes.warn}>Please complete section below </p>
      )}
      {editableTitle ? (
        <div
          autoFocus={true}
          className={classes.titleContent}
          contentEditable
          onBlur={handleTitle}
          onFocus={() => {
            setEditableDesc(false);
            setEditableSubtitle(false);
          }}
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
          {!onlyContainedWhitespace(block.title).length
            ? dummyText.title
            : block.title}
        </h1>
      )}
      {stringCounter(block.title) > MAX_TITLE &&
        ErrorMessageSections('Title', MAX_TITLE)}
      {editableSubtitle ? (
        <div
          className={classes.heading2}
          contentEditable
          onBlur={handleSubTitle}
          onFocus={() => {
            setEditableDesc(false);
            setEditableTitle(false);
          }}
          placeholder={dummyText.subtitle}
          style={{ backgroundColor: '#FFF3BF' }}
        >
          {block.subtitle === dummyText.subtitle ? '' : block.subtitle}
        </div>
      ) : (
        <h2
          className={classes.heading2}
          onClick={handeEditableSubtitle}
          suppressContentEditableWarning={true}
        >
          {!onlyContainedWhitespace(block.subtitle).length
            ? dummyText.subtitle
            : block.subtitle}
        </h2>
      )}
      {stringCounter(block.subtitle) > MAX_DESC &&
        ErrorMessageSections('Subtitle', MAX_DESC)}
      {editableDesc ? (
        <div
          className={classes.descContent}
          contentEditable
          onBlur={handleDescription}
          onFocus={() => {
            setEditableSubtitle(false);
            setEditableTitle(false);
          }}
          placeholder={dummyText.description}
          style={{ backgroundColor: '#FFF3BF', fontSize: '16px' }}
        >
          {block.description === dummyText.description ? '' : block.description}
        </div>
      ) : (
        <p
          className={classes.descContent}
          onClick={handleEditableDesc}
          style={{
            cursor: 'pointer',
            // maxWidth: 587,
            wordBreak: 'break-all',
            fontSize: '16px',
            fontWeight: '300',
            lineHeight: '24px',
          }}
        >
          {!onlyContainedWhitespace(block.description).length
            ? dummyText.description
            : block.description}
        </p>
      )}
      {stringCounter(block.description) > MAX_DESC &&
        ErrorMessageSections('Description', MAX_DESC)}
      <TabItem
        block={block.tabs}
        defaultTab={defaultTab}
        index={value}
        maxSize={6}
        onChange={handleChange}
        updateTabs={handleTabs}
      />
      {block.tabs.map((item, index) => {
        return (
          <TabPanel
            index={index}
            key={`key${item.titlel}-${index}`}
            value={value}
          >
            {editableInnerDesc ? (
              <div
                className={classes.descContent}
                contentEditable
                onBlur={(e) => handleTabDescription(e, item._uid)}
                onFocus={() => {
                  setEditableSubtitle(false);
                  setEditableTitle(false);
                  setEditableDesc(false);
                }}
                placeholder={dummyText.description}
                style={{
                  backgroundColor: '#FFF3BF',
                  fontSize: '16px',
                }}
              >
                {item.description === dummyText.description
                  ? ''
                  : item.description}
              </div>
            ) : (
              <p
                onClick={handleEditableInnerDesc}
                style={{
                  fontSize: '16px',
                  fontWeight: '300',
                  lineHeight: '24px',
                  cursor: 'pointer',
                }}
                suppressContentEditableWarning={true}
              >
                {!onlyContainedWhitespace(item.description).length
                  ? dummyText.description
                  : item.description}
              </p>
            )}
            {stringCounter(item.description) > MAX_DESC &&
              ErrorMessageSections('Description', MAX_DESC)}
            <Image
              alt="Image in here..."
              getUpdateItem={handleImage}
              item={item}
              sizeBig={true}
            />
          </TabPanel>
        );
      })}
      <div style={{ textAlign: 'right' }}>
        <Button type="submit">GET OUR BEST PRICE</Button>
      </div>
    </div>
  );
};

Pricing.defaultProps = {
  action: {},
  block: {},
  classes: {},
  deleteToggler: false,
  page: [],
  pageValid: [],
};

Pricing.propTypes = {
  action: PropTypes.object,
  block: PropTypes.object,
  classes: PropTypes.object,
  deleteToggler: PropTypes.bool,
  page: PropTypes.array,
  pageValid: PropTypes.array,
};

function mapStateToProps(state) {
  const { page, pageValid } = state.productManagement;
  return { page, pageValid };
}

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(actions, dispatch) };
}

const Styled = withStyles(styles)(Pricing);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
