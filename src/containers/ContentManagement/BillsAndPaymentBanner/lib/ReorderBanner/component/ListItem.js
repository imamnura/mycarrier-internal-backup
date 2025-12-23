import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import Order from '@assets/icon-v2/Order';
import Typography from '@components/Typography';
import { textLimit } from '@utils/text';

const ListItem = ({ item, index, classes }) => {
  return (
    <Draggable draggableId={`${item?.bannerId}`} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className={clsx({
              [classes.child]: true,
            })}
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span style={{ padding: '5px 15px 0 0' }}>
              <Order />
            </span>
            <Typography
              children={item?.title}
              style={{ marginRight: '20px', width: '14vw' }}
              variant="body2"
            />
            <Typography
              children={textLimit(item?.linkedTo, 70)}
              style={{
                overflow: 'hidden',
                width: '40vw',
              }}
              variant="body2"
            />
          </div>
        );
      }}
    </Draggable>
  );
};

ListItem.defaultProps = {
  classes: {},
};

ListItem.propTypes = {
  classes: PropTypes.object,
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
};

export default ListItem;
