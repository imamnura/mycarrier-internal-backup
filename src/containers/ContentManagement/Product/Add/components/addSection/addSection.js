import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../action';
import styles from '../styles';

import ChooseSection from './chooseSection';

import Dialog from '@__old/components/elements/Dialog';
import Button from '@__old/components/elements/Button';
import LineButton from './lineButton';

import { create_UUID } from '../../utils';

const AddSection = ({ classes, page, action, setSection, activeTab }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [maxSection, setMaxSection] = useState(false);

  const addSection = () => {
    if (page.length < 8) {
      const pages = [
        ...page,
        {
          ...setSection,
          _uid: create_UUID(),
        },
      ];
      action.createSection(pages);
      setOpen(false);
    } else {
      setMaxSection(true);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSection = (s) => {
    setActive(Boolean(s.label));
  };

  return (
    activeTab === 0 && (
      <div style={{ marginBottom: 300 }}>
        <LineButton handleClick={handleOpen} label="ADD SECTION" />

        <Dialog maxWidth="xs" onClose={handleClose} open={open}>
          <ChooseSection getActive={getSection} />
          {maxSection && <p className={classes.alert}> Max section reached </p>}
          <div className={classes.buttonContainer}>
            <Button onClick={() => setOpen(false)} variant="ghost">
              {' '}
              Cancel{' '}
            </Button>
            <Button disabled={!active} onClick={() => addSection()}>
              {' '}
              ADD SECTION{' '}
            </Button>
          </div>
        </Dialog>
      </div>
    )
  );
};

AddSection.defaultProps = {
  action: {},
  activeTab: 0,
  classes: {},
  page: [],
  setSection: {},
};

AddSection.propTypes = {
  action: PropTypes.object,
  activeTab: PropTypes.number,
  classes: PropTypes.object,
  page: PropTypes.array,
  setSection: PropTypes.object,
};

function mapStateToProps(state) {
  const { activeTab, page, setSection } = state.productManagement;
  return {
    activeTab,
    page,
    setSection,
  };
}

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(actions, dispatch) };
}

const Styled = withStyles(styles)(AddSection);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
