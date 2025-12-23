import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import useStyles from './styles';
import DraggableElement from './DraggableElement';

const DragList = (props) => {
  const { bannerActive, bannerHide, onChangeBannerActive, onChangeBannerHide } =
    props;

  const classes = useStyles();

  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const lists = ['active', 'hide'];

  const elements = { active: bannerActive, hide: bannerHide };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index,
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement,
    );

    //validation max 5 active
    if (listCopy['active'].length > 5) {
      const [removeList, newList] = removeFromList(listCopy['active'], 5);
      listCopy['active'] = newList;
      listCopy['hide'] = addToList(listCopy['hide'], 0, removeList);
    }

    onChangeBannerActive(listCopy.active);
    onChangeBannerHide(listCopy.hide);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.container}>
        {lists.map((listKey) => (
          <DraggableElement
            classes={classes}
            elements={elements[listKey]}
            key={listKey}
            prefix={listKey}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

DragList.defaultProps = {};

DragList.propTypes = {
  bannerActive: PropTypes.array.isRequired,
  bannerHide: PropTypes.array.isRequired,
  onChangeBannerActive: PropTypes.func.isRequired,
  onChangeBannerHide: PropTypes.func.isRequired,
};

export default DragList;
