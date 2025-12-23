import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import * as actions from '../action';
import MapIcon from '@material-ui/icons/Map';
import TabPanel from '../components/tabPanel';
import DeleteSection from '../components/addSection/deleteSection';
import TabItem from '../components/tab';
import Popover from '@material-ui/core/Popover';

import {
  dummyText,
  getValues,
  create_UUID,
  replacer,
  stringCounter,
  ErrorMessageSections,
  onlyContainedWhitespace,
} from '../utils';

const Location = ({ action, block, classes, page }) => {
  const [value, setValue] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [editableTitle, setEditableTitle] = useState(false);
  const [editableDesc, setEditableDesc] = useState(false);
  const [editableSubtitle, setEditableSubtitle] = useState(false);
  const MAX_TITLE = 200;
  const MAX_DESC = 1500;

  useEffect(() => {
    closeEditable();
  }, [page.length]);

  const updateContent = (blocktemp) => {
    let i = page.findIndex((el) => el._uid === blocktemp._uid);
    action.updateSectionPage(replacer(page, i, blocktemp));
  };

  const defaultTab = {
    _uid: create_UUID(),
    title: 'Nama Tab',
    url: 'Ketik link google maps di sini dalam Bahasa..',
  };

  function validatePage(block) {
    let title = getValues(block, 'title').filter(
      (el) => el === dummyText.title,
    );
    let subtitle = getValues(block, 'subtitle').filter(
      (el) => el === dummyText.subtitle,
    );
    let description = getValues(block, 'description').filter(
      (el) => el === dummyText.description,
    );
    let googlelink = getValues(block, 'url').filter(
      (el) => el === 'Ketik link google maps di sini dalam Bahasa..',
    );
    let titleCount = getValues(block, 'title').filter((el) => el)[0].length;
    let subtitleCount = getValues(block, 'subtitle').filter((el) => el)[0]
      .length;
    let descriptionCount = getValues(block, 'description').filter((el) => el)[0]
      .length;
    let titleValue = getValues(block, 'title');
    let subtitleValue = getValues(block, 'subtitle');
    let descriptionValue = getValues(block, 'description');

    for (let i in titleValue) {
      if (titleValue[i].replace(/\s\s+/g, ' ') === ' ') return true;
    }
    for (let i in subtitleValue) {
      if (subtitleValue[i].replace(/\s\s+/g, ' ') === ' ') return true;
    }
    for (let i in descriptionValue) {
      if (descriptionValue[i].replace(/\s\s+/g, ' ') === ' ') return true;
    }

    if (title.length !== 0 || titleCount > MAX_TITLE) {
      return true;
    } else if (description.length !== 0 || descriptionCount > MAX_DESC) {
      return true;
    } else if (subtitle.length !== 0 || subtitleCount > MAX_DESC) {
      return true;
    }
    if (googlelink.length !== 0) {
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

  const handleSubtitle = (e) => {
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

  const handleChange = (newValue) => setValue(newValue);

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

  const handleUrl = (e, uiid) => {
    closeEditable();
    const findtab = block.tabs.filter((el) => el._uid === uiid);
    const index = block.tabs.findIndex((el) => el._uid === uiid);
    const mapsUrl = e.currentTarget.innerText || '';
    let url = mapsUrl.match(
      /(https:\/\/www.google.com\/maps\/embed).*?(?=[\\*"])/,
    );

    updateContent({
      ...block,
      status: validatePage({
        ...block,
        tabs: replacer(block.tabs, index, {
          ...findtab[0],
          url: url ? url[0] : mapsUrl,
        }),
      }),
      tabs: replacer(block.tabs, index, {
        ...findtab[0],
        url: url ? url[0] : mapsUrl,
      }),
    });
  };

  const triggerAnimation = () => setToggle(false);

  // popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleEditableTitle = () => setEditableTitle(true);

  const handleEditableDesc = () => setEditableDesc(true);

  const handeEditableSubtitle = () => setEditableSubtitle(true);

  const closeEditable = () => {
    setEditableSubtitle(false);
    setEditableDesc(false);
    setEditableTitle(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
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
          onBlur={handleSubtitle}
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
        maxSize={15}
        onChange={handleChange}
        updateTabs={handleTabs}
      />
      {block.tabs.map((item, index) => {
        return (
          <TabPanel index={index} key={`key-${index}`} value={value}>
            {(item.url === 'Ketik link google maps di sini dalam Bahasa..' && (
              <div className={classes.mapbox} onClick={handleClick}>
                <MapIcon />
              </div>
            )) || (
              <div style={{ overflow: 'hidden', position: 'overflow' }}>
                <p className={classes.locationclick} onClick={handleClick}>
                  Click here to change url
                </p>
                <iframe
                  allowFullScreen="true"
                  aria-hidden="false"
                  frameBorder="0"
                  height="450"
                  src={item.url}
                  style={{ border: 0 }}
                  tabIndex="0"
                  width="100%"
                />
              </div>
            )}
            <Popover
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              id={id}
              onClose={handleClose}
              open={open}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div className={classes.popovercontent}>
                <p>Tempel URL Anda di bawah ini</p>
                <p
                  className={classes.descContent}
                  contentEditable
                  onBlur={(e) => handleUrl(e, item._uid)}
                  style={{ color: '#3071D9' }}
                  suppressContentEditableWarning={true}
                >
                  {item.url}
                </p>
              </div>
            </Popover>
          </TabPanel>
        );
      })}
    </div>
  );
};

Location.defaultProps = {
  action: {},
  block: {},
  classes: {},
  page: [],
  pageValid: [],
};
Location.propTypes = {
  action: PropTypes.object,
  block: PropTypes.object,
  classes: PropTypes.object,
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

const Styled = withStyles(styles)(Location);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
