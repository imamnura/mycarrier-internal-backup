import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StopIcon from '@material-ui/icons/Stop';
import FunctionComp from './function';
import useActions from '../hooks/useActions';

const Component = (props) => {
  const { classes, data, isExpandJourney, isDisabled, isLabelActive } = props;

  const { getFunction, onCheckedFeature, toogleItemFeature, isExpandFeature } =
    useActions(props);

  return (
    <>
      {data.map((item, indexB) => {
        return (
          <Accordion
            classes={{
              expanded: classes.expanded,
              root: classes.accordion,
            }}
            defaultExpanded={isExpandJourney}
            expanded={isExpandFeature[indexB]}
            key={indexB}
            onChange={toogleItemFeature}
          >
            <AccordionSummary
              aria-controls={`additional-${item._id}-content`}
              aria-label={`additional-${item._id}`}
              classes={{
                expanded: classes.expanded,
                root: classes.accordionSummary,
              }}
              expandIcon={<ExpandMoreIcon />}
              id={`additional-${item._id}-header`}
            >
              <FormControlLabel
                classes={{
                  root:
                    isLabelActive && item.isChecked && classes.labelFormActive,
                }}
                control={
                  <Checkbox
                    checked={item.isChecked ? true : false}
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
                    name={item._id}
                    onChange={(e) => onCheckedFeature(e, item)}
                  />
                }
                label={item.name}
              />
            </AccordionSummary>
            <AccordionDetails classes={{ root: classes.accordionDetail }}>
              <FunctionComp
                classes={classes}
                data={item.function}
                featureId={item._id}
                getFunction={getFunction}
                isDisabled={isDisabled}
                isLabelActive={isLabelActive}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
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
