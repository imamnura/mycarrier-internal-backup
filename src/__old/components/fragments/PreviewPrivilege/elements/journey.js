import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Category from './category';
import StopIcon from '@material-ui/icons/Stop';
import useActions from '../hooks/useActions';

const Component = (props) => {
  const { classes, journey, isDisabled, isLabelActive } = props;

  const { onCheckedJourney, getCategory, isExpanded, setIsExpanded } =
    useActions(props);

  return (
    <Accordion
      classes={{
        expanded: classes.expanded,
        root: classes.accordion,
      }}
      expanded={isExpanded}
      onChange={() => setIsExpanded(!isExpanded)}
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
            root: isLabelActive && journey.isChecked && classes.labelFormActive,
          }}
          control={
            <Checkbox
              checked={journey.isChecked ? true : false}
              checkedIcon={
                <StopIcon
                  className={
                    (isLabelActive && classes.icon) ||
                    (isDisabled ? classes.iconDisabled : classes.icon)
                  }
                  fontSize="small"
                />
              }
              classes={{ root: classes.checkboxCustom }}
              disabled={isDisabled}
              name={journey._id}
              onChange={(e) => onCheckedJourney(e, journey)}
            />
          }
          label={journey.journey}
        />
      </AccordionSummary>
      <AccordionDetails classes={{ root: classes.accordionDetail }}>
        <Category
          classes={classes}
          data={journey.category}
          getCategory={getCategory}
          isDisabled={isDisabled}
          isExpandJourney={isExpanded}
          isLabelActive={isLabelActive}
        />
      </AccordionDetails>
    </Accordion>
  );
};

Component.defaultProps = {
  classes: {},
};

Component.propTypes = {
  classes: PropTypes.object,
  isDisabled: PropTypes.bool.isRequired,
  isLabelActive: PropTypes.bool.isRequired,
  journey: PropTypes.object.isRequired,
};

export default Component;
