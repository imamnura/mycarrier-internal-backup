import React from 'react';
import PropTypes from 'prop-types';
import { Chip, Grid } from '@material-ui/core';
import Button from '@components/Button';
import Dialog from '@__old/components/elements/Dialog';
import Typography from '@components/Typography';
import useActions from './hooks/useActions';
import { TextField, AutoComplete } from '@components/FormField';
import useStyles from './styles';

export default function Component(props) {
  const { modalAddCompany, onClose } = props;
  const classes = useStyles();
  const {
    chip,
    company,
    control,
    formState: { isValid, isDirty },
    handleAddCompany,
    handleDelete,
    handleSubmit,
    loadingCompany,
    // onClose,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalAddCompany}>
      <form onSubmit={handleSubmit(handleAddCompany)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          <Grid align="center" item xs={12}>
            <Typography variant="h4" weight="bold">
              Are you sure want to add company details?
            </Typography>
          </Grid>
          <Grid align="center" item xs={12}>
            <Typography variant="body1">
              Add company name to make this report clearly referred
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AutoComplete
              control={control}
              label="CompanyName"
              loading={loadingCompany}
              maxLength={160}
              name="companyName"
              options={company.map((v) => v.custAccntName)}
              required
            />
            {chip.map((v, index) => {
              return (
                <span key={v + index}>
                  <Chip
                    className={classes.chip}
                    label={v.companyName}
                    onDelete={handleDelete(v)}
                    variant="outlined"
                  />
                </span>
              );
            })}
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Note"
              maxLength={160}
              minRows={3}
              multiline
              name="note"
              required
            />
          </Grid>
          <Grid align="center" item xs={12}>
            <Button onClick={onClose} variant="ghost">
              NO
            </Button>
            &nbsp;
            <Button
              disabled={!isValid || !isDirty || !chip.length}
              type="submit"
            >
              YES
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.defaultProps = {
  onClose: () => {},
  modalAddCompany: false,
};

Component.propTypes = {
  onClose: PropTypes.func,
  modalAddCompany: PropTypes.bool,
};
