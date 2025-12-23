import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Remove } from '@material-ui/icons';

const SymptompList = (props) => {
  const { data } = props;

  if (!data || !data?.length || !Array.isArray(data)) {
    return null;
  }

  return (
    <List>
      {data.map((item, index) => (
        <ListItem
          key={index}
          style={{
            paddingLeft: index * 32,
          }}
        >
          <ListItemIcon style={{ minWidth: '0px', marginRight: 18 }}>
            <Remove />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

SymptompList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SymptompList;
