import React from 'react';
import PropTypes from 'prop-types';
import Duplicate from '@assets/icon-v2/Duplicate';
import Typography from '@components/Typography';
import { Divider } from '@material-ui/core';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import useStyles from './styles';

const transformData = (array) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunkedArray[chunkedArray.length - 1];
    if (!last || last.length === 2) {
      chunkedArray.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunkedArray;
};

const Topology = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const data = transformData(props.data);

  const copyToClipboard = (val) => () => {
    navigator.clipboard.writeText(val);
    enqueueSnackbar('Successfully copied value!', {
      variant: 'default',
      autoHideDuration: 1000,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.lineContainer}>
        <Divider className={classes.line} />
      </div>
      <div className={classes.nodeContainer}>
        {data.map((nodes, i) => {
          let topNode = null;
          let bottomNode = null;

          if (nodes.length === 1) {
            bottomNode = nodes[0];
          } else {
            topNode = nodes[0];
            bottomNode = nodes[1];
          }

          const lastItem = data.length - 1 === i;

          return (
            <div
              className={classes.nodeItem}
              key={i}
              style={{ paddingRight: lastItem ? 0 : 16 }}
            >
              <div className={topNode ? classes.visible : classes.hidden}>
                <div className={classes.nodeContentTop}>
                  <Typography
                    className={classes.info}
                    color="general-mid"
                    variant="overline"
                  >
                    {topNode?.info}
                  </Typography>
                  <div
                    className={classes.arrowBottom}
                    onClick={copyToClipboard(topNode?.message)}
                  >
                    <Typography variant="subtitle1">
                      {topNode?.message}
                    </Typography>
                    <Duplicate className={classes.copyIcon} />
                  </div>
                </div>
                <div className={classes.node} />
              </div>
              <div className={clsx(classes.nodeItemBottom, classes.visible)}>
                <div className={classes.node} />
                <div className={classes.nodeContentBottom}>
                  <Typography
                    className={classes.info}
                    color="general-mid"
                    inline
                    variant="overline"
                  >
                    {bottomNode?.info}
                  </Typography>
                  <div
                    className={classes.arrowTop}
                    onClick={copyToClipboard(bottomNode?.message)}
                  >
                    <Typography variant="subtitle1">
                      {bottomNode?.message}
                    </Typography>
                    <Duplicate className={classes.copyIcon} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Topology.defaultProps = {
  data: [],
};

Topology.propTypes = {
  data: PropTypes.array,
};

export default Topology;
