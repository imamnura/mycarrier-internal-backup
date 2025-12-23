/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

import { Grid, TextField, CircularProgress } from '@material-ui/core';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../action';

// element
import Button from '@components/Button';
import Typography from '@components/Typography';

// utils
import { dateFormat } from '@utils/parser';

// icon
// import EditIcon from '@material-ui/icons/Edit';

const Component = ({ classes, isLoading, data, lastUpdate }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <Grid item sm={5} xs={12}>
        <div>
          <div className={classes.profileTitle}>
            <Typography color="general-mid" variant="h4">
              AM Profile
            </Typography>
            <Typography color="general-mid" variant="subtitle2">
              Last Update,{' '}
              {dateFormat({ date: lastUpdate, type: 'date-time' }) || '-'}
            </Typography>
          </div>

          <div className={classes.content}>
            <div className={classes.item}>
              <div className={classes.subitem}>
                <Typography className={classes.mb1} variant="subtitle2">
                  {' '}
                  Name{' '}
                </Typography>
                {Object.keys(data).length === 0 ? (
                  <Skeleton />
                ) : (
                  <>
                    {
                      toggle ? (
                        <TextField
                          className={classes.textField}
                          defaultValue={data.fullName}
                          name="fullName"
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        // <div className={classes.text} onClick={handleToggle}>
                        <Typography
                          className={classes.mb1}
                          variant="subtitle1"
                          weight="bold"
                        >
                          {data.fullName}
                        </Typography>
                      )
                      // <EditIcon color="disabled" />
                      // </div>
                    }
                  </>
                )}
              </div>
              <div className={classes.subitem}>
                <Typography className={classes.mb1} variant="subtitle2">
                  {' '}
                  Segmen{' '}
                </Typography>
                {Object.keys(data).length === 0 ? (
                  <Skeleton />
                ) : (
                  <>
                    {
                      toggle ? (
                        <TextField
                          className={classes.textField}
                          defaultValue={data.segment}
                          name="segment"
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        // <div className={classes.text} onClick={handleToggle}>
                        <Typography
                          className={classes.mb1}
                          variant="subtitle1"
                          weight="bold"
                        >
                          {' '}
                          {data.segment || '-'}{' '}
                        </Typography>
                      )
                      // <EditIcon color="disabled" />
                      // </div>
                    }
                  </>
                )}
              </div>
            </div>
            <div className={classes.item}>
              <div className={classes.subitem}>
                <Typography className={classes.mb1} variant="subtitle2">
                  {' '}
                  NIK{' '}
                </Typography>
                {Object.keys(data).length === 0 ? (
                  <Skeleton />
                ) : (
                  <>
                    {
                      toggle ? (
                        <TextField
                          className={classes.textField}
                          defaultValue={data.nik}
                          name="nik"
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        // <div className={classes.text} onClick={handleToggle}>
                        <Typography
                          className={classes.mb1}
                          variant="subtitle1"
                          weight="bold"
                        >
                          {data.nik || '-'}
                        </Typography>
                      )
                      // <EditIcon color="disabled" />
                      // </div>
                    }
                  </>
                )}
              </div>
              <div className={classes.subitem}>
                <Typography className={classes.mb1} variant="subtitle2">
                  {' '}
                  GM Segment{' '}
                </Typography>
                {Object.keys(data).length === 0 ? (
                  <Skeleton />
                ) : (
                  <>
                    {
                      toggle ? (
                        <TextField
                          className={classes.textField}
                          defaultValue={data.atasan && data.atasan.nama}
                          name="atasan"
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        // <div className={classes.text} onClick={handleToggle}>
                        <Typography
                          className={classes.mb1}
                          variant="subtitle1"
                          weight="bold"
                        >
                          {(data.atasan && data.atasan.nama) || '-'}
                        </Typography>
                      )
                      // <EditIcon color="disabled" />
                      // </div>
                    }
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.subitem}>
              <Typography className={classes.mb1} variant="subtitle2">
                {' '}
                Position{' '}
              </Typography>
              {Object.keys(data).length === 0 ? (
                <Skeleton />
              ) : (
                <>
                  {
                    toggle ? (
                      <TextField
                        className={classes.textField}
                        defaultValue={data.jobTitle}
                        fullWidth
                        name="jobTitle"
                        size="small"
                        variant="outlined"
                      />
                    ) : (
                      // <div className={classes.text} onClick={handleToggle}>
                      <Typography
                        className={classes.mb1}
                        variant="subtitle1"
                        weight="bold"
                      >
                        {data.jobTitle || '-'}
                      </Typography>
                    )
                    // <EditIcon color="disabled" />
                    // </div>
                  }
                </>
              )}
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.item}>
              <div className={classes.subitem}>
                <Typography className={classes.mb1} variant="subtitle2">
                  {' '}
                  Contact Number{' '}
                </Typography>
                {Object.keys(data).length === 0 ? (
                  <Skeleton />
                ) : (
                  <>
                    {
                      toggle ? (
                        <TextField
                          className={classes.textField}
                          defaultValue={data.phoneNumber}
                          name="phoneNumber"
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        // <div className={classes.text} onClick={handleToggle}>
                        <Typography
                          className={classes.mb1}
                          variant="subtitle1"
                          weight="bold"
                        >
                          {data.phoneNumber || '-'}
                        </Typography>
                      )
                      // <EditIcon color="disabled" />
                      // </div>
                    }
                  </>
                )}
              </div>
            </div>
            <div className={classes.item}>
              <div className={classes.subitem}>
                <Typography className={classes.mb1} variant="subtitle2">
                  {' '}
                  Email{' '}
                </Typography>
                {Object.keys(data).length === 0 ? (
                  <Skeleton />
                ) : (
                  <>
                    {
                      toggle ? (
                        <TextField
                          className={classes.textField}
                          defaultValue={data.email}
                          name="email"
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        // <div className={classes.text} onClick={handleToggle}>
                        <Typography
                          className={classes.mb1}
                          variant="subtitle1"
                          weight="bold"
                        >
                          {data.email || '-'}
                        </Typography>
                      )
                      // <EditIcon color="disabled" />
                      // </div>
                    }
                  </>
                )}
              </div>
            </div>
          </div>
          {toggle && (
            <div className={classes.editButton}>
              <Button onClick={handleToggle} variant="ghost">
                Cancel
              </Button>
              <Button type="submit">
                {isLoading ? (
                  <CircularProgress
                    size={17}
                    style={{ marginTop: 5, color: '#FFFFFF' }}
                    thickness={3}
                  />
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          )}
        </div>
      </Grid>
    </>
  );
};

Component.defaultProps = {
  classes: {},
  data: [],
  isLoading: false,
  lastUpdate: '',
};

Component.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.array,
  getProfilData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  lastUpdate: PropTypes.string,
};

export function mapStateToProps(state) {
  const { isLoading } = state.loading;
  return { isLoading };
}

export function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
  };
}

export const Styled = withStyles(styles)(Component);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
