import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Feature from './feature';
import StopIcon from '@material-ui/icons/Stop';
import useActions from '../hooks/useActions';

const Component = (props) => {
  const { classes, data, isDisabled, isExpandJourney, isLabelActive } = props;

  const { getFeature, onCheckedCategory, toogleItem, isExpandCategory } =
    useActions(props);

  return (
    <>
      {data.map((category, indexA) => (
        <Accordion
          classes={{
            expanded: classes.expanded,
            root: classes.accordion,
          }}
          defaultExpanded={isExpandJourney}
          expanded={isExpandCategory[indexA]}
          key={indexA}
          onChange={toogleItem}
        >
          <AccordionSummary
            aria-controls={`additional-${category._id}-content`}
            aria-label={`additional-${category._id}`}
            classes={{
              expanded: classes.expanded,
              root: classes.accordionSummary,
            }}
            expandIcon={<ExpandMoreIcon />}
            id={`additional-${category._id}-header`}
          >
            <FormControlLabel
              classes={{
                root:
                  isLabelActive &&
                  category.isChecked &&
                  classes.labelFormActive,
              }}
              control={
                <Checkbox
                  checked={category.isChecked ? true : false}
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
                  name={category.title}
                  onChange={(e) => onCheckedCategory(e, category)}
                />
              }
              label={category.title}
            />
          </AccordionSummary>
          <AccordionDetails classes={{ root: classes.accordionDetail }}>
            <Feature
              categoryId={category._id}
              classes={classes}
              data={category.feature}
              getFeature={getFeature}
              isDisabled={isDisabled}
              isExpandJourney={isExpandJourney}
              isLabelActive={isLabelActive}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

Component.defaultProps = {
  classes: {},
  data: [],
};

Component.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.array,
  isDisabled: PropTypes.bool.isRequired,
  isExpandJourney: PropTypes.bool.isRequired,
  isLabelActive: PropTypes.bool.isRequired,
};

export default Component;
