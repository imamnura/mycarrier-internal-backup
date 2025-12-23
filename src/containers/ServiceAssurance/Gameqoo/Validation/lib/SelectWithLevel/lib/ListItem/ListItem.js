import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemSecondaryAction,
  CircularProgress,
} from '@material-ui/core';
import RadioItem from '../RadioItem';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import useStyles from '../../styles';
import useActions from './hooks/useActions';

const ListItemLevel = (props) => {
  const { data, level, handleValue } = props;
  const {
    fetchDataItems,
    toggleItem,
    handleCombineValue,
    handleSymptompPath,
    visible,
    dataItems,
  } = useActions(props);
  const classes = useStyles({ rootEvent: false });

  return data?.map(({ symptompDesc, content, children }) => {
    const combinedValue = handleCombineValue(symptompDesc);
    const combinedSymptompPath = handleSymptompPath(content);

    if (visible[content] && children && !dataItems[content]) {
      fetchDataItems(content);
    }

    return (
      <List
        aria-labelledby="nested-list"
        className={classes.rootList}
        component="nav"
        key={`list-${content}`}
        style={{ paddingLeft: level !== 1 && level * 16 }}
      >
        {children ? (
          <>
            <ListItem button onClick={() => toggleItem(content)}>
              <ListItemIcon style={{ minWidth: '0px', marginRight: 9 }}>
                {visible[content] ? <RemoveIcon /> : <AddIcon />}
              </ListItemIcon>
              <ListItemText primary={symptompDesc} />
              {visible[content] && !dataItems[content] && (
                <ListItemSecondaryAction>
                  <CircularProgress size={28} />
                </ListItemSecondaryAction>
              )}
            </ListItem>
            <Collapse in={visible[content]} timeout="auto" unmountOnExit>
              {Boolean(dataItems[content]) && (
                <ListItemLevel
                  data={dataItems[content] || []}
                  handleValue={handleValue}
                  level={level + 1}
                  symptompPath={combinedSymptompPath}
                  value={combinedValue}
                />
              )}
            </Collapse>
          </>
        ) : (
          <RadioItem
            handleValue={handleValue}
            key={content}
            label={symptompDesc}
            value={{
              symptompName: combinedValue,
              symptompId: content,
              symptompDesc: symptompDesc,
              symptompPath: combinedSymptompPath,
              value: symptompDesc,
            }}
          />
        )}
      </List>
    );
  });
};

ListItemLevel.defaultProps = {
  data: [],
  handleValue: () => {},
  level: 1,
  symptompPath: '',
  value: '',
};

ListItemLevel.propTypes = {
  data: PropTypes.array,
  handleValue: PropTypes.func,
  level: PropTypes.number,
  symptompPath: PropTypes.string,
  value: PropTypes.string,
};

export default ListItemLevel;
