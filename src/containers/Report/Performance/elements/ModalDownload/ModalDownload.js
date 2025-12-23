import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import useActions from './hooks/useActions';
import Dropdown from '@components/Dropdown';
import DateRangePicker from '@components/DateRangePicker';
import DatePicker from '@components/DatePicker';

export default function ModalDownload(props) {
  const { open, title, textInfo, caption, submitText } = props;

  const { filter, loading, onClose, onClickDownload } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open}>
      <Grid container style={{ padding: '12px 24px' }}>
        {title && (
          <Grid align="center" item xs={12}>
            <Typography variant="h5" weight="medium">
              {title}
            </Typography>
          </Grid>
        )}
        {textInfo && (
          <Grid align="center" item xs={12}>
            <Typography variant="caption" weight="normal">
              {textInfo}
            </Typography>
          </Grid>
        )}
        <Grid item style={{ paddingTop: '16px' }} xs={12}>
          <Grid container spacing={1}>
            {filter?.map((filterItem, i) => {
              const { type, label, required, ...filterProps } = filterItem;

              if (type === 'dropdown') {
                return (
                  <Grid item key={`filterItem-${i}`} sm={12} xs={6}>
                    {required && (
                      <Typography
                        children="*"
                        color="primary-main"
                        style={{ marginRight: 2 }}
                        variant="overline"
                        weight="medium"
                      />
                    )}
                    <Typography variant="overline">{label}</Typography>
                    <Dropdown {...filterProps} />
                  </Grid>
                );
              }

              if (type === 'dateRange') {
                return (
                  <Grid item key={`filterItem-${i}`} sm={12}>
                    {required && (
                      <Typography
                        children="*"
                        color="primary-main"
                        style={{ marginRight: 2 }}
                        variant="overline"
                        weight="medium"
                      />
                    )}
                    <Typography variant="overline">{label}</Typography>
                    <DateRangePicker {...filterProps} />
                  </Grid>
                );
              }

              if (type === 'date') {
                return (
                  <Grid item key={`filterItem-${i}`} sm={12}>
                    {required && (
                      <Typography
                        children="*"
                        color="primary-main"
                        style={{ marginRight: 2 }}
                        variant="overline"
                        weight="medium"
                      />
                    )}
                    <Typography variant="overline">{label}</Typography>
                    <DatePicker {...filterProps} />
                  </Grid>
                );
              }

              return null;
            })}
          </Grid>
        </Grid>
        {caption && (
          <Grid item xs={12}>
            <Typography variant="caption" weight="normal">
              {caption}
            </Typography>
          </Grid>
        )}
        <Grid
          container
          item
          justifyContent="center"
          pt={2}
          spacing={2}
          style={{ paddingTop: '20px' }}
        >
          <Grid item>
            <Button loading={loading?.download} onClick={onClickDownload}>
              {submitText || 'DOWNLOAD'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

ModalDownload.defaultProps = {
  caption: '',
  open: false,
  submitText: '',
  textInfo: '',
  title: '',
};

ModalDownload.propTypes = {
  caption: PropTypes.string,
  open: PropTypes.bool,
  submitText: PropTypes.string,
  textInfo: PropTypes.string,
  title: PropTypes.string,
};
