import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { replacer, checkAllFunction } from '../../utils';
import Feature from './feature';
import StopIcon from '@material-ui/icons/Stop';

const Component = ({
  classes,
  data,
  disabled,
  expandedJourney,
  getCategory,
}) => {
  const [isActiveItem, setIsActiveItem] = useState({});
  const toogleItem = (index) => {
    setIsActiveItem((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const getFeature = (d, id) => {
    const index = data.findIndex((item) => item._id === id);
    const find = data.find((item) => item._id === id);
    const check = checkAllFunction(d);
    const replace = replacer(data, index, {
      ...find,
      isChecked: check,
      feature: d,
    });
    getCategory(replace);
  };

  const featureReplacer = (i, id) => {
    const index = data.findIndex((item) => item._id === id);
    return replacer(data, index, i);
  };

  const handleChange = (event, data) => {
    const newCategory = featureReplacer(
      {
        ...data,
        isChecked: event.target.checked,
        feature: checkAll(data.feature, event.target.checked),
      },
      data._id,
    );

    getCategory(newCategory);
  };

  const checkAll = (data, check) => {
    return data.map((feature) => ({
      ...feature,
      isChecked: check,
      function: feature.function.map((func) => ({
        ...func,
        isChecked: check,
      })),
    }));
  };

  return (
    <>
      {data.map((category, indexA) => (
        <Accordion
          classes={{
            expanded: classes.expanded,
            root: classes.accordion,
          }}
          defaultExpanded={expandedJourney}
          expanded={isActiveItem[indexA]}
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
                root: classes.labelFormActive,
              }}
              control={
                <Checkbox
                  checked={category.isChecked ? true : false}
                  checkedIcon={
                    <StopIcon
                      className={disabled ? classes.iconDisabled : classes.icon}
                      fontSize="small"
                    />
                  }
                  classes={{ root: classes.checkboxCustom }}
                  disabled={disabled}
                  name={category.title}
                  onChange={(e) => handleChange(e, category)}
                />
              }
              label={category.title}
            />
          </AccordionSummary>
          <AccordionDetails classes={{ root: classes.accordionDetail }}>
            <Feature
              classes={classes}
              data={category.feature}
              disabled={disabled}
              expandedJourney={expandedJourney}
              getFeature={getFeature}
              parentId={category._id}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

Component.defaultProps = {
  checked: false,
  classes: {},
  data: [],
  disabled: false,
  expandedJourney: true,
};

Component.propTypes = {
  checked: PropTypes.boolean,
  classes: PropTypes.object,
  data: PropTypes.object,
  disabled: PropTypes.boolean,
  expandedJourney: PropTypes.bool,
  getCategory: PropTypes.func.isRequired,
};

export default Component;
