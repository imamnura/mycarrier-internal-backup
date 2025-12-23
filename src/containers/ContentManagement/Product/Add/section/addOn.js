import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import * as actions from '../action';
import TabItem from '../components/tab';
import {
  dummyText,
  replacer,
  create_UUID,
  getObjects,
  stringCounter,
  getValues,
  ErrorMessageSections,
  onlyContainedWhitespace,
} from '../utils';
import TabPanel from '../components/tabPanel';
import DeleteSection from '../components/addSection/deleteSection';
import ContentAddOn from './contentType/contentAddOn';

const AddOn = ({ action, block, classes, page, activeTab }) => {
  const [toggle, setToggle] = useState(true);
  const [value, setValue] = useState(0);
  const [editableTitle, setEditableTitle] = useState(false);
  const [editableDesc, setEditableDesc] = useState(false);
  const [validateDesc, setValidateDesc] = useState(false);

  const MAX_TITLE = 200;
  // const MAX_DESC = 255;
  const MAX_DESC = 1500;

  useEffect(() => {
    setEditableDesc(false);
    setEditableTitle(false);
  }, [page.length, activeTab]);

  const updateContent = (blocktemp) => {
    let i = page.findIndex((el) => el._uid === blocktemp._uid);
    action.updateSectionPage(replacer(page, i, blocktemp));
  };

  const defaultTab = {
    _uid: create_UUID(),
    title: 'Nama Tab',
    description: dummyText.description,
    detail: [
      {
        _uid: create_UUID(),
        title: dummyText.title,
        imageUrl: { mediaPath: dummyText.image },
        tabs: [
          {
            _uid: create_UUID(),
            title: 'Nama Tab',
            description: dummyText.description,
          },
        ],
      },
    ],
  };

  const validatePage = (block) => {
    setEditableTitle(false);
    setEditableDesc(false);
    let title = getValues(block, 'title');
    // let description = getValues(block, 'description');
    let image = getValues(block, 'mediaPath').filter(
      (el) => el === dummyText.image,
    );
    let descriptionDefault = getValues(block, 'description').filter(
      (el) => el === dummyText.description,
    );

    for (let i in title) {
      if (title[i].length > MAX_TITLE) return true;
      if (title[i].replace(/\s\s+/g, ' ') === ' ') return true;
      if (title[i] === dummyText.title) return true;
    }
    // for (let i in description) {
    //   if (description[i].length > MAX_DESC) {
    //     return true;
    //   }
    // }

    //Validasi description in content tab (not froala)
    for (let i = 0; i < block.tabs.length; i++) {
      if (block.tabs[i].description.length > MAX_DESC) return true;
      if (block.tabs[i].description.replace(/\s\s+/g, ' ') === ' ') return true;
      if (block.tabs[i].description === dummyText.description) return true;
    }

    if (descriptionDefault.length !== 0) {
      return true;
    } else if (image.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleTitle = (e) => {
    const text = e.currentTarget.innerText.replace(/\s\s+/g, ' ');
    setEditableTitle(false);
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

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleTabs = (value) => {
    updateContent({
      ...block,
      status: validatePage({
        ...block,
        tabs: value,
      }),
      tabs: value,
    });
  };

  const handleDescription = (e, uid) => {
    const text = e.currentTarget.innerText.replace(/\s\s+/g, ' ');
    setEditableDesc(false);
    if (stringCounter(text) > MAX_DESC) {
      setValidateDesc(true);
    } else {
      setValidateDesc(false);
      setEditableDesc(false);
    }
    // find edit block target
    const findBlock = getObjects(block, '_uid', uid);
    // find index tabs
    let index = block.tabs.findIndex((el) => el._uid === uid);
    // replace find block with new data
    const blocktemp = { ...findBlock[0], description: text };
    // replace tabs with new data
    const tabtemp = replacer(block.tabs, index, blocktemp);
    // send edited block to store
    if (text !== '' || validateDesc) {
      updateContent({
        ...block,
        status: validatePage({
          ...block,
          tabs: tabtemp,
        }),
        tabs: tabtemp,
      });
    }
  };

  const handleUpdate = (value) => {
    setEditableDesc(false);
    setEditableTitle(false);
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

  const triggerAnimation = () => {
    setToggle(false);
  };

  const handleEditableTitle = () => {
    setEditableTitle(true);
  };

  const handleEditableDesc = () => {
    setEditableDesc(true);
  };

  return (
    <div className={toggle ? classes.animContainer : classes.animOutContainer}>
      <DeleteSection block={block} triggerAnimation={triggerAnimation} />
      {block.status && (
        <p className={classes.warn}>Please complete section below</p>
      )}

      <div className={classes.defaultWithTabs}>
        {editableTitle ? (
          <div
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
              key={`key${item.titlel}-${index}`}
              value={value}
            >
              {editableDesc ? (
                <div
                  className={classes.descContent}
                  contentEditable
                  onBlur={(e) => handleDescription(e, item._uid)}
                  onFocus={() => setEditableTitle(false)}
                  placeholder={dummyText.description}
                  style={{ backgroundColor: '#FFF3BF' }}
                  suppressContentEditableWarning={true}
                >
                  {item.description === dummyText.description
                    ? ''
                    : item.description}
                </div>
              ) : (
                <p
                  className={classes.descContent}
                  onClick={handleEditableDesc}
                  style={{
                    cursor: 'pointer',
                    wordBreak: 'break-all',
                  }}
                >
                  {!onlyContainedWhitespace(item.description).length
                    ? dummyText.description
                    : item.description}
                </p>
              )}
              {stringCounter(item.description) > MAX_DESC &&
                ErrorMessageSections('Description', MAX_DESC)}
              <ContentAddOn
                activeTab={activeTab}
                block={item}
                getUpdate={handleUpdate}
              />
            </TabPanel>
          );
        })}
      </div>
    </div>
  );
};

AddOn.defaultProps = {
  action: {},
  activeTab: 0,
  block: {},
  classes: {},
  deleteToggler: false,
  page: [],
  pageValid: [],
};

AddOn.propTypes = {
  action: PropTypes.object,
  activeTab: PropTypes.number,
  block: PropTypes.object,
  classes: PropTypes.object,
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

const Styled = withStyles(styles)(AddOn);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
