import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Category from './category';
import { checkAllFunction } from '../../utils';
import StopIcon from '@material-ui/icons/Stop';

const Component = ({ classes, getJourney, journey, disabled }) => {
  const [expanded, setExpanded] = useState(true);

  const getCategory = (data) => {
    getJourney({
      ...journey,
      isChecked: checkAllFunction(data),
      category: data,
    });
  };

  const handleChange = (event, data) => {
    getJourney({
      ...data,
      isChecked: event.target.checked,
      category: checkAll(data.category, event.target.checked),
    });
    setExpanded(true);
  };

  const checkAll = (data, check) => {
    return data.map((category) => ({
      ...category,
      isChecked: check,
      feature: category.feature.map((feature) => ({
        ...feature,
        isChecked: check,
        function: feature.function.map((func) => ({
          ...func,
          isChecked: check,
        })),
      })),
    }));
  };

  return (
    <Accordion
      classes={{
        expanded: classes.expanded,
        root: classes.accordion,
      }}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        aria-controls={`additional-${journey._id}-content`}
        aria-label={`additional-${journey._id}`}
        classes={{
          expanded: classes.expanded,
          root: classes.accordionSummaryJourney,
        }}
        expandIcon={<ExpandMoreIcon />}
        id={`additional-${journey._id}-header`}
      >
        <FormControlLabel
          classes={{
            root: journey.isChecked && classes.labelFormActive,
          }}
          control={
            <Checkbox
              checked={journey.isChecked ? true : false}
              checkedIcon={
                <StopIcon
                  className={disabled ? classes.iconDisabled : classes.icon}
                  fontSize="small"
                />
              }
              classes={{ root: classes.checkboxCustom }}
              disabled={disabled}
              name={journey._id}
              onChange={(e) => handleChange(e, journey)}
            />
          }
          label={journey.journey}
        />
      </AccordionSummary>
      <AccordionDetails classes={{ root: classes.accordionDetail }}>
        <Category
          classes={classes}
          data={journey.category}
          disabled={disabled}
          expandedJourney={expanded}
          getCategory={getCategory}
        />
      </AccordionDetails>
    </Accordion>
  );
};

Component.defaultProps = {
  classes: {},
  disabled: false,
  journey: {},
};

Component.propTypes = {
  classes: PropTypes.object,
  disabled: PropTypes.boolean,
  getJourney: PropTypes.func.isRequired,
  journey: PropTypes.object,
};

export default Component;
