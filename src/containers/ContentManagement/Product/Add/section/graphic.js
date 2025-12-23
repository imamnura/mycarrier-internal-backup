import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import * as actions from '../action';
import TabItem from '../components/tab';
import Image from '../components/imageGraphic';
import {
  getValues,
  dummyText,
  create_UUID,
  replacer,
  stringCounter,
  ErrorMessageSections,
  onlyContainedWhitespace,
} from '../utils';
import TabPanel from '../components/tabPanel';
import DeleteSection from '../components/addSection/deleteSection';
import Button from '@__old/components/elements/Button';

const Graphic = ({ action, block, classes, page }) => {
  const [toggle, setToggle] = useState(true);
  const [editableTitle, setEditableTitle] = useState(false);
  const [editableSubtitle, setEditableSubtitle] = useState(false);
  const MAX_TITLE = 200;
  const MAX_DESC = 1500;

  useEffect(() => {
    closeEditable();
  }, [page.length]);

  const defaultTab = {
    _uid: create_UUID(),
    title: 'Nama Tab',
    imageUrl: [
      {
        id: create_UUID() + '_' + 0,
        mediaId: '',
        mediaName: '',
        mediaPath: dummyText.image,
      },
      {
        id: create_UUID() + '_' + 1,
        mediaId: '',
        mediaName: '',
        mediaPath: dummyText.image,
      },
      {
        id: create_UUID() + '_' + 2,
        mediaId: '',
        mediaName: '',
        mediaPath: dummyText.image,
      },
      {
        id: create_UUID() + '_' + 3,
        mediaId: '',
        mediaName: '',
        mediaPath: dummyText.image,
      },
    ],
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
    // let image = getValues(block, 'mediaPath').filter(el => el === dummyText.image);
    let titleCount = getValues(block, 'title').filter((el) => el)[0].length;
    let subtitleCount = getValues(block, 'subtitle').filter((el) => el)[0]
      .length;

    if (title.length !== 0 || titleCount > MAX_TITLE) {
      return true;
    } else if (subtitle.length !== 0 || subtitleCount > MAX_DESC) {
      return true;
    } else {
      return false;
    }
  }

  const handleTitle = (e) => {
    const text = e.currentTarget.innerText;
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
    const text = e.currentTarget.innerText;
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

  const handeEditableSubtitle = () => {
    setEditableSubtitle(true);
  };

  const closeEditable = () => {
    setEditableSubtitle(false);
    setEditableTitle(false);
  };

  return (
    <div className={toggle ? classes.animContainer : classes.animOutContainer}>
      <DeleteSection block={block} triggerAnimation={triggerAnimation} />
      {block.status && (
        <p className={classes.warn}>Please complete section below</p>
      )}
      {editableTitle ? (
        <div
          autoFocus={true}
          className={classes.titleContent}
          contentEditable
          onBlur={handleTitle}
          onFocus={() => {
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
      <TabItem
        block={block.tabs}
        defaultTab={defaultTab}
        index={value}
        maxSize={20}
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
            <Image
              alt="Image in here..."
              data={item.imageUrl}
              getUpdateItem={handleImage}
              item={item}
            />
          </TabPanel>
        );
      })}
      <div style={{ textAlign: 'right' }}>
        <Button type="submit">REQUEST SITE VISIT</Button>
      </div>
    </div>
  );
};

Graphic.defaultProps = {
  action: {},
  block: {},
  classes: {},
  deleteToggler: false,
  page: [],
  pageValid: [],
};

Graphic.propTypes = {
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

const Styled = withStyles(styles)(Graphic);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
