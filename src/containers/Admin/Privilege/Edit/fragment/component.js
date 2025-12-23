import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, CircularProgress } from '@material-ui/core';
import Text from '@__old/components/elements/Text';
import PrivilegeEditForm from '../../../../../__old/components/forms/PrivilegeManagement';
// import Dropdown from '@components/elements/Dropdown';
// import useActions from '../hooks/useActions';
import useStyles from '../hooks/useStyles';
import TextField from '@__old/components/elements/TextField';

const Component = ({ loading }) => {
  const { data } = useSelector((state) => ({
    data: state.privilege.edit,
  }));

  const classes = useStyles();

  // const { optionsFilterUserType, setFilterUserType } = useActions();

  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress style={{ color: '#DE1B1B' }} />
        </div>
      ) : (
        <Grid
          container
          direction="row"
          // spacing={2}
          style={{
            backgroundColor: '#fff',
            padding: '24px 40px',
            margin: '24px 40px',
            borderRadius: '8px',
            width: 'auto'
          }}
        >
          <Grid item sm={6} xs={12}>
            <Grid item style={{ marginBottom: '22px' }} xs={12}>
              <Text color="grey" variant="h4" weight="medium">
                Privilege Profile
              </Text>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              {/* <Dropdown
                isDisabled={true}
                name="type"
                onChange={setFilterUserType}
                options={optionsFilterUserType}
                placeholder={data?.type === 'internal' ? 'Internal' : 'Customer'}
                value=""
              /> */}
              <TextField
                disabled={true}
                fullWidth
                label="User Type"
                required
                value={data?.type === 'internal' ? 'Internal' : 'Customer'}
              />
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Grid item style={{ marginBottom: '22px' }} xs={12}>
              <Text color="grey" variant="h4" weight="medium">
                Input Privilege
              </Text>
            </Grid>
            <PrivilegeEditForm classes={classes} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

Component.defaultProps = {
  classes: {},
  data: {},
  loading: false,
};

Component.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default Component;
