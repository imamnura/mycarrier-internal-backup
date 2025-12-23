import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../action';
import styles from './styles';

import { youtube_parser } from '../utils';
import { makeStyles } from '@material-ui/core';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

const useStyles = makeStyles({
  image: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '2px dashed #B3C3CA',
    borderRadius: '16px',
    height: '240px',
    width: '320px',
    position: 'relative',
  },
  icon: {
    display: 'block',
    color: '#B3C3CA',
    width: '67px',
    height: '67px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  },
  youtube: {
    borderRadius: '4px',
    height: '200px',
    width: '300px',
  },
});

const Image = ({ data }) => {
  const classes = useStyles();
  return (
    <>
      {youtube_parser(data.youtubeUrl) ? (
        <iframe
          className={classes.youtube}
          frameBorder="0"
          height="315"
          src={
            'https://www.youtube.com/embed/' + youtube_parser(data.youtubeUrl)
          }
          width="560"
        />
      ) : (
        <div alt="Submit" className={classes.image}>
          <PlayArrowRoundedIcon className={classes.icon} />
        </div>
      )}
    </>
  );
};

Image.defaultProps = {
  data: {},
};

Image.propTypes = {
  data: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(actions, dispatch) };
}

const Styled = withStyles(styles)(Image);

export default connect(null, mapDispatchToProps)(Styled);
