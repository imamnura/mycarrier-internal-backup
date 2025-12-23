import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../action';
import PropTypes from 'prop-types';

//component
import Item from './item';
import ItemArrow from './itemArrow';
import Text from '@__old/components/elements/Text';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';

// utils
import { sectionCreator, create_UUID } from '../../utils';

const initialObject = {
  activeItem: { id: null, label: null },
  object: [
    {
      id: 0,
      label: 'About Section',
    },
    {
      id: 1,
      label: 'Add On Service Section',
    },
    {
      id: 2,
      label: 'Location Section',
    },
    {
      id: 3,
      label: 'Pricing Section',
    },
    {
      id: 4,
      label: 'Graphic Section',
    },
  ],
};
const ChooseSection = ({ action, getActive }) => {
  const [show, setShow] = useState(true);
  const [section, setSection] = useState(sectionCreator());
  const [itemState, setItemState] = useState(initialObject);

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

  const handleSection = (label, index) => {
    if (label === 'About Section') {
      setSection(sectionCreator('about', create_UUID(), create_UUID()));
    } else if (label === 'Add On Service Section') {
      setSection(
        sectionCreator('addOn', create_UUID(), create_UUID(), create_UUID()),
      );
    } else if (label === 'Location Section') {
      setSection(sectionCreator('location', create_UUID()));
    } else if (label === 'Pricing Section') {
      setSection(sectionCreator('pricing', create_UUID()));
    } else if (label === 'Graphic Section') {
      setSection(sectionCreator('graphic', create_UUID()));
    } else {
      setSection(sectionCreator('bannerRight'));
    }
    toggleActive(index);
  };

  const handleArrow = (s) => {
    setShow(s);
  };
  return (
    <>
      {show ? (
        <div
          style={{
            textAlign: 'center',
            fontSize: 16,
            marginBottom: 24,
          }}
        >
          <Text>Choose add section below</Text>
        </div>
      ) : (
        <div
          onClick={() => setShow(true)}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: 16,
            marginBottom: 24,
          }}
        >
          <KeyboardBackspaceRoundedIcon style={{ marginRight: 12 }} />
          <Text>Choose overview section below</Text>
        </div>
      )}
      <ItemArrow arrowState={handleArrow} getActive={getActive} show={show} />
      {show &&
        itemState.object.map((item, index) => (
          <Item
            active={() => handleActive(index)}
            key={index + 'key'}
            label={item.label}
            mark
            onClick={() => handleSection(item.label, index)}
          />
        ))}
    </>
  );
};

ChooseSection.defaultProps = {
  action: {},
};

ChooseSection.propTypes = {
  action: PropTypes.object,
  getActive: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(actions, dispatch) };
}

const Styled = withStyles(styles)(ChooseSection);

export default connect(null, mapDispatchToProps)(Styled);
