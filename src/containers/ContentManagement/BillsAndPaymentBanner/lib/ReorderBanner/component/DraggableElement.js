import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Box } from '@material-ui/core';
import clsx from 'clsx';
import Typography from '@components/Typography';
import ListItem from './ListItem';

const DraggableElement = ({ prefix, elements, classes }) => (
  <div className={classes.container}>
    <div className={classes.parent}>
      <Box flexGrow={1}>
        <Typography
          children={
            prefix === 'active'
              ? 'Active Banner, max. 5 banners'
              : 'Non-Active Banner'
          }
          color="general-mid"
          variant="subtitle2"
          weight="medium"
        />
      </Box>
    </div>
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          className={clsx({
            [classes.container]: true,
            [classes.containerChildHide]: prefix === 'hide',
            [classes.containerChild]: prefix === 'active',
          })}
          ref={provided.innerRef}
        >
          {elements.map((item, index) => (
            <ListItem
              classes={classes}
              index={index}
              item={item}
              key={item?.bannerId}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

DraggableElement.defaultProps = {};

DraggableElement.propTypes = {
  classes: PropTypes.object.isRequired,
  elements: PropTypes.array.isRequired,
  prefix: PropTypes.string.isRequired,
};

export default DraggableElement;
