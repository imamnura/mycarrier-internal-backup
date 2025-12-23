import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import useStyles from './styles';
import Switch from '@components/Switch';

const SectionMark = (props) => {
  const { title, description, nonmandatory, onChange, isDisplay } = props;
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.sectionMark}>
        <div>
          <Typography color="white" variant="h5">
            {title}
          </Typography>
        </div>
        <Typography color="white" variant="caption">
          {description}
        </Typography>
      </div>

      {nonmandatory && (
        <div className={classes.switchMark}>
          <Typography
            color="primary-main"
            style={{ marginRight: 16 }}
            variant="caption"
          >
            Do you want include this section?
          </Typography>
          <Switch onChange={onChange} value={isDisplay} />
        </div>
      )}
    </div>
  );
};

SectionMark.defaultProps = {
  description: '',
  isDisplay: true,
  nonmandatory: false,
  onChange: () => {},
  title: '',
};

SectionMark.propTypes = {
  description: PropTypes.string,
  isDisplay: PropTypes.bool,
  nonmandatory: PropTypes.bool,
  onChange: PropTypes.func,
  title: PropTypes.string,
};

export default SectionMark;
