import React, { useRef } from 'react';
import LanguageMenu from '@assets/icon-v2/LanguageMenu';
import IndoFlag from '@assets/icon-v2/IndoFlag';
import EngFlag from '@assets/icon-v2/EngFlag';
import Text from '@__old/components/elements/Text';
import PropTypes from 'prop-types';

function LangSwitcher({ list, onDragEnd, setNewList }) {
  const draggingItem = useRef();
  const dragOverItem = useRef();

  const handleDragStart = (e, position) => {
    draggingItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    const listCopy = [...list];
    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);
    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setNewList(listCopy);
  };

  const handleDragOver = () => {
    onDragEnd(list);
  };

  return (
    <>
      {list?.map((item, index) => (
        <div key={index}>
          <p> {index === 0 ? 'Base Language (default)' : 'Translation'} </p>
          <div
            draggable
            onDragEnd={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragStart={(e) => handleDragStart(e, index)}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 0',
              }}
            >
              <LanguageMenu />
              {item.value === 'id' ? (
                <IndoFlag style={{ marginLeft: '28px' }} />
              ) : (
                <EngFlag style={{ marginLeft: '28px' }} />
              )}
              <Text style={{ marginLeft: '20px' }} variant="caption">
                {item.lang}
              </Text>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

LangSwitcher.defaultProps = {
  onDragEnd: () => {},
};

LangSwitcher.propTypes = {
  list: PropTypes.array.isRequired,
  onDragEnd: PropTypes.func,
  setNewList: PropTypes.func.isRequired,
};

export default LangSwitcher;
