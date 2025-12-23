import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Text from '../Text';
import moment from 'moment';
import clsx from 'clsx';
import Edit from '../../../../assets/Svg/Edit';

moment.updateLocale(moment.locale(), { invalidDate: '-' });

const rupiah = (number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
  }).format(number);
};
// const rupiah = (number) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'IDR',
//     minimumFractionDigits: 0,
//   }).format(number);
// };

const Component = (props) => {
  const {
    classes,
    align,
    content,
    date,
    label,
    dateTime,
    dateTimeSec,
    bool,
    handleButton,
    showButton,
    inline,
    isPermanent,
    lowercase,
    noMargin,
    ul,
  } = props;

  const isContentArray =
    content && typeof content === 'object' && content.length > 0;

  let contentValue = content;

  if (date) contentValue = moment(content).format('DD/MM/YYYY');
  if (dateTime) contentValue = moment(content).format('DD/MM/YYYY HH:mm');
  if (dateTimeSec) contentValue = moment(content).format('DD/MM/YYYY HH:mm:ss');
  if (bool) {
    if (content === null) {
      contentValue = '-';
    } else {
      contentValue = content ? 'Yes' : 'No';
    }
  }
  if (inline && isContentArray) contentValue = content.join(', ');

  const renderContent = () => {
    if (isContentArray && !inline && ul) {
      return (
        <ul style={{ paddingLeft: 18, margin: 0 }}>
          {content.map((item, i) => (
            <li key={`bdy-det-${item}-${i}`} style={{ color: '#3B525C' }}>
              <Grid align={align} item xs={12}>
                <Text variant="h5">{item || '-'}</Text>
              </Grid>
            </li>
          ))}
        </ul>
      );
    } else if (isContentArray && !inline) {
      return content.map((item, i) => (
        <Grid align={align} item key={`bdy-det-${item}-${i}`} xs={12}>
          <Text variant="h5">{item || '-'}</Text>
        </Grid>
      ));
    } else if (label === 'Price') {
      if (!isPermanent) {
        return (
          <Grid align={align} item xs={12}>
            <Text
              className={clsx({ [classes.lowercase]: lowercase })}
              style={{ color: '#DE1B1B' }}
              variant="h4"
            >
              {`Rp ${rupiah(contentValue)}`}
            </Text>
            {showButton && handleButton && (
              <div className={classes.edit} onClick={handleButton}>
                <Edit fill="#FFF" style={{ fontSize: 14, color: 'white' }} />
              </div>
            )}
          </Grid>
        );
      }
    } else if (label === 'Current Bandwith' || label === 'Target Bandwith') {
      return (
        <Grid align={align} item xs={12}>
          <Text
            className={clsx({ [classes.lowercase]: lowercase })}
            variant="h5"
          >
            {`${contentValue} Mbps`}
          </Text>
        </Grid>
      );
    } else if (label === 'O/S Balance') {
      return (
        <Grid align={align} item xs={12}>
          <Text
            className={clsx({ [classes.lowercase]: lowercase })}
            color="primary"
            variant="h3"
            weight="medium"
          >
            {contentValue ? `Rp ${rupiah(contentValue)}` : '-'}
          </Text>
        </Grid>
      );
    } else {
      return (
        <Grid align={align} item xs={12}>
          <Text
            className={clsx({ [classes.lowercase]: lowercase })}
            variant="h5"
          >
            {contentValue || '-'}
          </Text>
        </Grid>
      );
    }
  };

  const renderLabel = () => {
    if (label === 'Price') {
      if (!isPermanent) {
        return (
          <Text className={classes.label} color="grey" variant="body2">
            {label}
          </Text>
        );
      }
    } else if (label === 'O/S Balance') {
      return <div />;
    } else {
      return (
        <Text className={classes.label} color="grey" variant="body2">
          {label}
        </Text>
      );
    }
  };

  return (
    <Grid className={classes[noMargin ? 'root' : 'rootMargin']} container>
      <Grid align={align} item xs={12}>
        {renderLabel()}
      </Grid>
      {renderContent()}
    </Grid>
  );
};

Component.defaultProps = {
  align: 'left',
  bool: false,
  classes: {},
  content: '-',
  date: false,
  dateTime: false,
  dateTimeSec: false,
  handleButton: () => {},
  inline: false,
  isPermanent: false,
  label: '-',
  lowercase: false,
  noMargin: false,
  showButton: false,
  ul: false,
};

Component.propTypes = {
  align: PropTypes.string,
  bool: PropTypes.bool,
  classes: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  date: PropTypes.bool,
  dateTime: PropTypes.bool,
  dateTimeSec: PropTypes.bool,
  handleButton: PropTypes.func,
  inline: PropTypes.bool,
  isPermanent: PropTypes.bool,
  label: PropTypes.string,
  lowercase: PropTypes.bool,
  noMargin: PropTypes.bool,
  showButton: PropTypes.bool,
  ul: PropTypes.bool,
};

export default Component;
