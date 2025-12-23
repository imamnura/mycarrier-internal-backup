import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../action';
import styles from './styles';

import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { replacer, stringCutter } from '../utils';
// style
import { makeStyles } from '@material-ui/core';

const tabs = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: 500,
  marginRight: 30,
  cursor: 'pointer',
  '& p': {
    whiteSpace: 'nowrap',
    fontSize: 16,
    padding: '1em 0',
    margin: 0,
  },
};

const useStyles = makeStyles({
  tabContainer: {
    display: 'flex',
    alignItem: 'center',
    overflow: 'auto',
    borderBottom: '1px solid #D2DADE',
  },
  tab: {
    ...tabs,
    '& svg': {
      '&:hover': {
        opacity: 1,
      },
      opacity: 0.4,
      color: '#DE1B1B',
      marginLeft: 5,
    },
  },
  tabActive: {
    ...tabs,
    '& p': {
      whiteSpace: 'nowrap',
      borderBottom: '1px solid',
      color: '#DE1B1B',
      fontSize: 16,
      margin: 0,
      padding: '1em 0',
    },
    '& svg': {
      '&:hover': {
        opacity: 1,
      },
      opacity: 0.4,
      color: '#DE1B1B',
      marginLeft: 5,
    },
  },
  tabAdd: {
    ...tabs,
    color: '#3BA064',
    '& svg': {
      marginRight: 5,
    },
    '& p': {
      whiteSpace: 'nowrap',
      letterSpacing: '0.01em',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '16px',
    },
  },
});

const TabItem = ({
  maxSize,
  block,
  onChange,
  index,
  updateTabs,
  defaultTab,
  activeTab,
}) => {
  const handleClick = (e, index) => {
    if (e.target.nodeName === 'P') {
      onChange(index);
    }
  };

  const handleAddTab = () => {
    if (block.length < maxSize) {
      updateTabs([...block, defaultTab]);
      onChange(block.length);
    }
  };

  const handleLabel = (e, uiid) => {
    const findtab = block.filter((el) => el._uid === uiid);
    const index = block.findIndex((el) => el._uid === uiid);
    updateTabs(
      replacer(block, index, {
        ...findtab[0],
        title: stringCutter('tab', e.currentTarget.innerText),
      }),
    );
  };

  const handleDeleteTab = (uiid) => {
    const findtab = block.filter((el) => el._uid !== uiid);
    updateTabs(findtab);

    const index = block.findIndex((el) => el._uid === uiid);
    if (index === 0) {
      onChange(0);
    } else {
      onChange(index - 1);
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.tabContainer}>
      {block.map((item, i) => (
        <div
          className={i !== index ? classes.tab : classes.tabActive}
          key={'key' + i}
          onClick={(e) => handleClick(e, i)}
        >
          <p
            contentEditable
            onBlur={(e) => handleLabel(e, item._uid)}
            suppressContentEditableWarning={true}
          >
            {item.title}
          </p>
          {activeTab === 0 && (
            <CancelIcon
              className="cancelIcon"
              onClick={() => handleDeleteTab(item._uid)}
            />
          )}
        </div>
      ))}
      {activeTab === 0 && (
        <div className={classes.tabAdd} onClick={handleAddTab}>
          <AddCircleIcon />
          <p>Add Tab</p>
        </div>
      )}
    </div>
  );
};

TabItem.defaultProps = {
  action: {},
  activeTab: 0,
  block: {},
  defaultTab: {},
  index: 0,
  page: [],
};

TabItem.propTypes = {
  action: PropTypes.object,
  activeTab: PropTypes.number,
  block: PropTypes.object,
  defaultTab: PropTypes.object,
  index: PropTypes.number,
  maxSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  page: PropTypes.array,
  updateTabs: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { activeTab, page } = state.productManagement;
  return {
    activeTab,
    page,
  };
}

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(actions, dispatch) };
}

const Styled = withStyles(styles)(TabItem);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
