/* eslint-disable jsx-a11y/alt-text */
import Button from '@components/Button';
import LoadingBar from '@components/LoadingBar';
import Typography from '@components/Typography';
import { image } from '@configs';
import { Box, Grid } from '@material-ui/core';
import { getValueObject } from '@utils/common';
import useResponsive from '@utils/hooks/useResponsive';
import React from 'react';
import NotFound from './elements/NotFound';
import States from './elements/States';
import useStyles from './styles';
import PropTypes from 'prop-types';

const ApprovalMicrosite = (props) => {
  const {
    action,
    actionText,
    description,
    information,
    loading,
    states,
    subTitle,
    title,
    otherRender,
  } = props;

  const mobileClient = useResponsive('xs');

  const classes = useStyles({ mobileClient });

  let render = null;

  if (states) {
    render = (
      <div className={classes.centeredContent}>
        <States {...states} />
      </div>
    );
  } else if (!information?.data && !loading) {
    render = (
      <div className={classes.centeredContent}>
        <NotFound />
      </div>
    );
  } else if (!loading) {
    render = (
      <>
        <div className={classes.main}>
          <div className={classes.content}>
            <div className={classes.title}>
              <img src={image.logoSquare} />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography
                  variant={mobileClient ? 'subtitle2' : 'h5'}
                  weight="medium"
                >
                  {title}
                </Typography>
                <Box mt={mobileClient ? 0.5 : 2}>
                  <Typography variant={mobileClient ? 'caption' : 'subtitle1'}>
                    {subTitle}
                  </Typography>
                </Box>
              </Box>
            </div>
            <Box my={mobileClient ? 2 : 4}>
              <Typography variant={mobileClient ? 'caption' : 'subtitle1'}>
                {description}
              </Typography>
            </Box>
            {information.title && (
              <Box mb={1.5}>
                <Typography variant="subtitle1">{information.title}</Typography>
              </Box>
            )}
            <div className={classes.information}>
              {information.schema.map(({ label, name, type }) => {
                const value = getValueObject({ name, data: information?.data });

                let valueComp = (
                  <Typography variant="caption">{value || '-'}</Typography>
                );

                if (type === 'document' && value) {
                  valueComp = (
                    <Typography
                      color="blue-main"
                      onClick={() => {
                        window.open(value?.fileUrl);
                      }}
                      style={{ cursor: 'pointer' }}
                      variant="caption"
                    >
                      {value?.fileName}
                    </Typography>
                  );
                }

                if (type === 'multipleDocument' && value) {
                  const multipleValue = value.map((item, i) => (
                    <Typography
                      color="blue-main"
                      inline
                      key={`multi-doc-${i}`}
                      onClick={() => {
                        window.open(item?.fileUrl);
                      }}
                      style={{ cursor: 'pointer' }}
                      variant="caption"
                    >
                      {item?.fileName}
                    </Typography>
                  ));
                  valueComp = multipleValue;
                }

                return (
                  <Grid container key={name} spacing={2}>
                    <Grid item xs={5}>
                      <Typography variant="caption">{label}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Box textAlign="right">
                        <Typography variant="caption">:</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      {valueComp}
                    </Grid>
                  </Grid>
                );
              })}
            </div>
            {otherRender}
          </div>
        </div>
        <div className={classes.footer}>
          <Typography variant={mobileClient ? 'caption' : 'h4'}>
            {actionText}
          </Typography>
          <Box mt={3}>
            <Grid container justifyContent="center" spacing={2}>
              {action.map((btnProps, i) => (
                <Grid item key={i}>
                  <Button {...btnProps} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img src={image.logo} />
      </div>
      <LoadingBar loading={loading} />
      {render}
    </div>
  );
};

ApprovalMicrosite.defaultProps = {
  action: [],
  actionText: '',
  description: '',
  information: {
    data: null,
    schema: [],
    title: '',
  },
  loading: true,
  otherRender: null,
  states: null,
  subTitle: '',
  title: '',
};

ApprovalMicrosite.propTypes = {
  action: PropTypes.array,
  actionText: PropTypes.string,
  description: PropTypes.string,
  information: PropTypes.shape({
    title: PropTypes.string,
    data: PropTypes.object,
    schema: PropTypes.array,
  }),
  loading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  otherRender: PropTypes.any,
  states: PropTypes.shape({
    action: PropTypes.object,
    message: PropTypes.string,
    type: PropTypes.string,
  }),
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

export default ApprovalMicrosite;
