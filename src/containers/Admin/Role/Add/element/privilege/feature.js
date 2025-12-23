import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { replacer, checkAllFunction, autoCheck } from '../../utils';
import StopIcon from '@material-ui/icons/Stop';
import FunctionComp from './function';

const Component = ({
  classes,
  data,
  expandedJourney,
  getFeature,
  parentId,
  disabled,
}) => {
  const [isActiveItem, setIsActiveItem] = useState({});
  const toogleItem = (index) => {
    setIsActiveItem((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const getFunction = (d, id) => {
    const index = data.findIndex((item) => item._id === id);
    const find = data.find((item) => item._id === id);
    const check = checkAllFunction(d, id);
    const replace = replacer(data, index, {
      ...find,
      isChecked: check,
      function: d,
    });
    getFeature(replace, parentId);
  };

  const featureReplacer = (i, id) => {
    const index = data.findIndex((item) => item._id === id);
    return replacer(data, index, i);
  };

  const handleChange = (event, data) => {
    const newFunction = featureReplacer(
      {
        ...data,
        isChecked: event.target.checked,
        function: autoCheck(data.function, event.target.checked),
      },
      data._id,
    );
    getFeature(newFunction, parentId);
  };

  return (
    <>
      {data.map((item, indexB) => {
        return (
          <Accordion
            classes={{
              expanded: classes.expanded,
              root: classes.accordion,
            }}
            defaultExpanded={expandedJourney}
            expanded={isActiveItem[indexB]}
            key={indexB}
            onChange={toogleItem}
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
                  root: classes.labelFormActive,
                }}
                control={
                  <Checkbox
                    checked={item.isChecked ? true : false}
                    checkedIcon={
                      <StopIcon
                        className={
                          disabled ? classes.iconDisabled : classes.icon
                        }
                        fontSize="small"
                      />
                    }
                    classes={{ root: classes.checkboxCustom }}
                    disabled={disabled}
                    name={item._id}
                    onChange={(e) => handleChange(e, item)}
                  />
                }
                label={item.name}
              />
            </AccordionSummary>
            <AccordionDetails classes={{ root: classes.accordionDetail }}>
              <FunctionComp
                classes={classes}
                data={item.function}
                disabled={disabled}
                getFunction={getFunction}
                parentId={item._id}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

Component.defaultProps = {
  categoryCheck: false,
  classes: {},
  data: [],
  disabled: false,
  expandedJourney: true,
  parentId: '',
};

Component.propTypes = {
  categoryCheck: PropTypes.boolean,
  classes: PropTypes.object,
  data: PropTypes.object,
  disabled: PropTypes.object,
  expandedJourney: PropTypes.bool,
  getFeature: PropTypes.func.isRequired,
  parentId: PropTypes.string,
};

export default Component;
