import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import clsx from 'clsx';
import { Breadcrumbs } from '@material-ui/core';
import ArrowRight from '../../../../assets/Svg/ArrowRight';
import Link from '../Link';

const Component = (props) => {
  const { classes, data } = props;

  const breadcrumbItem = (item, index) => (
    <Text
      className={clsx(classes.text, {
        [classes.textGrey]: data.length !== index + 1,
      })}
      color={data.length !== index + 1 ? 'grey' : 'primary'}
      key={`txt-brdcmb-${item.url}`}
      variant="h4"
    >
      {item.url ? (
        <Link className={classes.link} to={item.url || ''}>
          {item.label}
        </Link>
      ) : (
        item.label
      )}
    </Text>
  );

  const separator = <ArrowRight className={classes.separator} />;

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={separator}>
      {data.map((item, index) => breadcrumbItem(item, index))}
    </Breadcrumbs>
  );
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default Component;
