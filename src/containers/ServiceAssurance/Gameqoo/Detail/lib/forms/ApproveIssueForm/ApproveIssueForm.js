import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import useActions from './hooks/useActions';
import useStyles from './styles';
import clsx from 'clsx';

export default function ApproveIssueForm(props) {
  const { modalApproveIssue } = props;

  const classes = useStyles();

  const { onSubmit, onClose, networkTypeList, networkType, setNetworkType } =
    useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalApproveIssue}>
      <Grid container spacing={3} style={{ padding: '16px 24px' }}>
        {modalApproveIssue?.title && (
          <Grid align="center" item xs={12}>
            <Typography variant="h5" weight="medium">
              {modalApproveIssue?.title}
            </Typography>
          </Grid>
        )}
        {modalApproveIssue?.textInfo && (
          <Grid align="center" item xs={12}>
            <Typography variant="caption" weight="normal">
              {modalApproveIssue?.textInfo}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          {networkTypeList.map(({ id, Icon, label, desc }, index) => (
            <div
              className={clsx({
                [classes.sectionItem]: true,
                [classes.sectionItemActive]: networkType === id ? true : false,
                [classes.notFirstItem]: index > 0,
              })}
              id="btnListMenuContent"
              key={index}
              onClick={setNetworkType(id)}
            >
              <Icon
                className={clsx({
                  [classes.icon]: true,
                  [classes.iconActive]: networkType === id ? true : false,
                })}
              />
              <div>
                <Typography
                  children={label}
                  variant="subtitle2"
                  weight="bold"
                />
                <div>
                  <Typography children={desc} variant="caption" />
                </div>
              </div>
            </div>
          ))}
        </Grid>
        {modalApproveIssue?.caption && (
          <Grid item xs={12}>
            <Typography variant="caption" weight="normal">
              {modalApproveIssue?.caption}
            </Typography>
          </Grid>
        )}
        <Grid container item justifyContent="center" pt={2} spacing={2}>
          <Grid item>
            <Button onClick={onClose} variant="ghost">
              CANCEL
            </Button>
          </Grid>
          <Grid item>
            <Button disabled={!networkType} onClick={onSubmit} type="submit">
              {modalApproveIssue?.submitText || 'SUBMIT'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

ApproveIssueForm.defaultProps = {
  modalApproveIssue: null,
};

ApproveIssueForm.propTypes = {
  modalApproveIssue: PropTypes.object,
};
