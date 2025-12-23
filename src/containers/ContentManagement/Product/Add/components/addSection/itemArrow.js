import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../action';
import styles from '../styles';

import DocumentIcon from '@assets/Svg/Document';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

import { sectionCreator } from '../../utils';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 12,
  },
  img: {
    border: '2px dashed #B3C3CA',
    borderRadius: 16,
    padding: 16,
    '& svg': {
      color: '#B3C3CA',
    },
  },
});

const Item = ({ action, classes, arrowState, show, getActive }) => {
  const otherStyle = useStyles();
  const [section, setSection] = useState(sectionCreator());
  const [open, setOpen] = useState(false);
  const [itemState, setItemState] = useState({
    activeItem: { id: 0, label: 'bannerRight' },
    object: [
      { id: 1, label: 'bannerRight' },
      { id: 2, label: 'bannerLeft' },
      { id: 3, label: 'premiumRight' },
      { id: 4, label: 'premiumLeft' },
    ],
  });

  const itemChooser = (index) => {
    if (index === 0) {
      return (
        <>
          <div>
            <div className={otherStyle.title}>Title Content</div>
            <div className={otherStyle.desc}>Description Content</div>
          </div>
          <div className={otherStyle.img}>
            <CropOriginalIcon />
          </div>
        </>
      );
    } else if (index === 1) {
      return (
        <>
          <div className={otherStyle.img}>
            <CropOriginalIcon />
          </div>
          <div>
            <div className={otherStyle.title}>Title Content</div>
            <div className={otherStyle.desc}>Description Content</div>
          </div>
        </>
      );
    } else if (index === 2) {
      return (
        <>
          <div>
            <div className={otherStyle.title}>Title Content</div>
            <div className={otherStyle.desc}>Description Content</div>
          </div>
          <div className={otherStyle.img}>
            <PlayArrowRoundedIcon />
          </div>
        </>
      );
    } else if (index === 3) {
      return (
        <>
          <div className={otherStyle.img}>
            <PlayArrowRoundedIcon />
          </div>
          <div>
            <div className={otherStyle.title}>Title Content</div>
            <div className={otherStyle.desc}>Description Content</div>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    getActive({ label: null });
  }, [show]);

  useEffect(() => {
    action.setSection(section);
    getActive(itemState.activeItem);
  }, [section]);

  const toggleActive = (index) => {
    setItemState({ ...itemState, activeItem: itemState.object[index] });
  };

  const handleActive = (index) => {
    if (itemState.object[index] === itemState.activeItem) {
      return 'sectionItemActive';
    } else {
      return 'sectionItem';
    }
  };

  const handleArrowOpen = () => {
    setOpen(!open);
    arrowState(false);
  };

  const handleSection = (label, index) => {
    if (label === 'bannerRight') {
      setSection(sectionCreator('bannerRight'));
    } else if (label === 'bannerLeft') {
      setSection(sectionCreator('bannerLeft'));
    } else if (label === 'premiumRight') {
      setSection(sectionCreator('premiumRight'));
    } else if (label === 'premiumLeft') {
      setSection(sectionCreator('premiumLeft'));
    } else {
      setSection(sectionCreator('bannerRight'));
    }
    toggleActive(index);
    getActive(itemState.activeItem);
  };

  return (
    <>
      {!show ? (
        itemState.object.map((item, index) => (
          <div
            className={classes[handleActive(index)]}
            key={index + 'key'}
            onClick={() => handleSection(item.label, index)}
            style={{
              border: '2px dashed #B3C3CA',
              justifyContent: 'space-between',
              margin: 'auto',
              marginBottom: '16px',
              padding: '8px 16px',
            }}
          >
            {itemChooser(index)}
          </div>
        ))
      ) : (
        <div className={classes.sectionItem} onClick={handleArrowOpen}>
          <DocumentIcon style={{ color: '#B3C3CA', marginLeft: '10px' }} />
          <p style={{ marginLeft: '2em', marginRight: '3em' }}>
            Overview Section
          </p>
          <KeyboardArrowRightIcon />
        </div>
      )}
    </>
  );
};

Item.defaultProps = {
  action: {},
  active: '',
  classes: {},
  show: false,
};

Item.propTypes = {
  action: PropTypes.object,
  active: PropTypes.string,
  arrowState: PropTypes.func.isRequired,
  classes: PropTypes.object,
  getActive: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(actions, dispatch) };
}

const Styled = withStyles(styles)(Item);

export default connect(null, mapDispatchToProps)(Styled);
