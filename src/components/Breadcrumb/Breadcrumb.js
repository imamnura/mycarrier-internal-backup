import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import ChevronRight from '../../assets/icon-v2/ChevronRight';
import Typography from '../Typography';
import useStyles from './styles';
import { useRouter } from 'next/router';

const Breadcrumb = (props) => {
  const router = useRouter();

  const { data, size } = props;

  const classes = useStyles({ size });

  const typoVariant = {
    large: 'h4',
    medium: 'body2',
    small: 'caption',
  }[size];

  const separatorComp = <ChevronRight className={classes.separator} />;

  const onUrlClick = (route) => () => router.push(route);

  return (
    <Grid container>
      {data.map(({ label, url, back, onClick }, i) => {
        let content = null;

        const lastItem = data.length - 1 === i;

        if (lastItem) {
          content = (
            <Typography
              children={label}
              color="general-light"
              key={label}
              variant={typoVariant}
            />
          );
        } else if (onClick) {
          content = (
            <Typography
              children={label}
              className={classes.url}
              color="general-mid"
              key={label}
              onClick={onClick}
              variant={typoVariant}
            />
          );
        } else if (url || back) {
          content = (
            <Typography
              children={label}
              className={classes.url}
              color="general-mid"
              key={label}
              onClick={back ? router.back : onUrlClick(url)}
              variant={typoVariant}
            />
          );
        } else {
          content = (
            <Typography
              children={label}
              color="general-mid"
              key={label}
              variant={typoVariant}
            />
          );
        }

        return (
          <Grid className={classes.flex} item key={label + url + i}>
            {content}
            {!lastItem && separatorComp}
          </Grid>
        );
      })}
    </Grid>
  );
};

Breadcrumb.defaultProps = {
  data: [],
  size: 'small',
};

Breadcrumb.propTypes = {
  data: PropTypes.array,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Breadcrumb;
