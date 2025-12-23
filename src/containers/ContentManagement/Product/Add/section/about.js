import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import * as actions from '../action';
import TabPanel from '../components/tabPanel';
import DeleteSection from '../components/addSection/deleteSection';
import TabItem from '../components/tab';
import {
  replacer,
  create_UUID,
  getValues,
  stringCounter,
  dummyText,
  ErrorMessageSections,
  onlyContainedWhitespace,
} from '../utils';
import ContentAbout from './contentType/contentAbout';

const About = ({ action, block, page, classes, activeTab }) => {
  const [value, setValue] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [editableTitleHead, setEditableTitleHead] = useState(false);

  const MAX_TITLE = 200;
  // const MAX_DESC = 255;

  const defaultTab = {
    _uid: create_UUID(),
    title: 'Nama Tab',
    detail: [
      {
        _uid: create_UUID(),
        title: dummyText.subtitle,
        description: dummyText.description,
        imageUrl: { mediaPath: dummyText.image },
      },
    ],
  };

  useEffect(() => {
    setEditableTitleHead(false);
  }, [page.length, activeTab]);

  const updateContent = (blocktemp) => {
    let i = page.findIndex((el) => el._uid === blocktemp._uid);
    action.updateSectionPage(replacer(page, i, blocktemp));
  };

  const validatePage = (block) => {
    let title = getValues(block, 'title');
    let titleDefault = getValues(block, 'title').filter(
      (el) => el === dummyText.title,
    );
    let descriptionDefault = getValues(block, 'description').filter(
      (el) => el === dummyText.description,
    );
    let image = getValues(block, 'mediaPath').filter(
      (el) => el === dummyText.image,
    );

    for (let i in title) {
      if (title[i].length > MAX_TITLE) return true;
      if (title[i].replace(/\s\s+/g, ' ') === ' ') return true;
    }
    if (titleDefault.length !== 0) {
      return true;
    } else if (descriptionDefault.length !== 0) {
      return true;
    } else if (image.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleTabs = (value) => {
    setEditableTitleHead(false);
    updateContent({
      ...block,
      status: validatePage({
        ...block,
        tabs: value,
      }),
      tabs: value,
    });
  };

  const handleChange = (index) => setValue(index);

  const handleTitle = (e) => {
    const text = e.currentTarget.innerText.replace(/\s\s+/g, ' ');
    setEditableTitleHead(false);
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

  const handleUpdate = (value) => {
    setEditableTitleHead(false);
    const index = block.tabs.findIndex((el) => el._uid === value._uid);
    updateContent({
      ...block,
      status: validatePage({
        ...block,
        tabs: replacer(block.tabs, index, value),
      }),
      tabs: replacer(block.tabs, index, value),
    });
  };

  const triggerAnimation = () => setToggle(false);

  const handleEditableTitle = () => setEditableTitleHead(true);

  return (
    <div className={toggle ? classes.animContainer : classes.animOutContainer}>
      <DeleteSection block={block} triggerAnimation={triggerAnimation} />
      {block.status && (
        <p className={classes.warn}>Please complete section below</p>
      )}

      <div className={classes.defaultWithTabs}>
        {editableTitleHead ? (
          <div
            className={classes.titleContent}
            contentEditable
            onBlur={handleTitle}
            onFocus={() => setEditableTitleHead(true)}
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
            style={{ wordBreak: 'break-all' }}
          >
            {!onlyContainedWhitespace(block.title).length
              ? dummyText.title
              : block.title}
          </h1>
        )}
        {stringCounter(block.title) > MAX_TITLE &&
          ErrorMessageSections('Title', MAX_TITLE)}

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
              key={`key${item.detail}-${index}`}
              value={value}
            >
              <ContentAbout
                activeTab={activeTab}
                block={item}
                getUpdate={handleUpdate}
                page={page}
              />
            </TabPanel>
          );
        })}
      </div>
    </div>
  );
};

About.defaultProps = {
  action: {},
  activeTab: 0,
  block: {},
  deleteToggler: false,
  page: [],
  pageValid: [],
};

About.propTypes = {
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

const Styled = withStyles(styles)(About);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
