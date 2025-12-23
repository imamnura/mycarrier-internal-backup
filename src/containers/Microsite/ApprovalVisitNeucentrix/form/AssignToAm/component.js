import React from 'react';
import PropTypes from 'prop-types';
import { Chip, Grid } from '@material-ui/core';
import Button from '@__old/components/elements/Button';
import Dialog from '@__old/components/elements/Dialog';
import Text from '@__old/components/elements/Text';
import useActions from './hooks/useActions';
import { AutoComplete } from '@components/FormField';
import useStyles from './styles';

export default function Component(props) {
  const { modalAssign } = props;
  const classes = useStyles();

  const {
    amList,
    chip,
    control,
    handleAssignAm,
    handleDelete,
    handleSubmit,
    loadingAm,
    onClose,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalAssign}>
      <form onSubmit={handleSubmit(handleAssignAm)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          <Grid align="center" item xs={12}>
            <Text variant="h4" weight="bold">
              Please select AM
            </Text>
          </Grid>
          <Grid align="center" item xs={12}>
            <Text variant="body1">
              Assign AM that you want to check visit request
            </Text>
          </Grid>
          <Grid align="flex-start" item xs={12}>
            <AutoComplete
              control={control}
              label="Type Account Manager Name"
              loading={loadingAm}
              name="accountManager"
              options={amList.map((v) => v.name)}
              required
            />
            {chip.map((v, index) => {
              return (
                <span key={v + index}>
                  <Chip
                    className={classes.chip}
                    label={v.name}
                    onDelete={handleDelete(v)}
                    variant="outlined"
                  />
                </span>
              );
            })}
          </Grid>
          <Grid align="center" item xs={12}>
            <Button onClick={onClose} variant="ghost">
              CANCEL
            </Button>
            &nbsp;
            <Button disabled={!chip.length} type="submit">
              ASSIGN
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.defaultProps = {
  modalAssign: false,
};

Component.propTypes = {
  modalAssign: PropTypes.bool,
};
