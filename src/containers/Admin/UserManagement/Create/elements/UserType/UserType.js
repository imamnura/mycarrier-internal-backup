import React from 'react';
import Create from '@fragments/Create';
import { Box, Divider, Grid } from '@material-ui/core';
import useAction from './hooks/useAction';
import Typography from '@components/Typography';
import PropTypes from 'prop-types';
import { breadcrumb } from '../../utils';
import Stepper from '@components/Stepper/Stepper';
import useStyles from './styles';
import clsx from 'clsx';
import Card from '@components/Card';

const UserType = (props) => {
  const classes = useStyles();
  const { loading } = props;
  const { onCancel, onSubmit, setUserType, userType, userId } =
    useAction(props);

  const optionsUserType = [
    {
      title: 'Customer',
      subtitle: 'User that using Customer Dashboard.',
      value: 'customer',
    },
    {
      title: 'Internal Staff',
      subtitle:
        'User that using Internal Dashboard for managing content, viewing service, creating document, trouble shooting problem and etc. For registering using identifier ID like NIK.',
      value: 'internal_staff',
    },
    {
      title: 'Internal Non Staff',
      subtitle:
        'User that using Internal Dashboard for managing content, viewing service, creating document, trouble shooting problem and etc, but didn’t have identifier ID.',
      value: 'internal_non_staff',
    },
  ];

  return (
    <Create
      action={[
        {
          children: 'Cancel',
          variant: 'ghost',
          onClick: onCancel,
        },
        {
          children: 'Next Step',
          disabled: !userType,
          onClick: onSubmit,
        },
      ]}
      breadcrumb={breadcrumb(userId)}
      loading={loading}
      stepperTab={
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2, mb: 1 }}>
            <Box sx={{ width: 200 }}>
              <Stepper
                active={0}
                steps={['User Type', 'User Profile']}
                variant="number"
              />
            </Box>
          </Box>
          <Divider
            style={{ marginBottom: 24, marginLeft: 40, marginRight: 40 }}
          />
        </>
      }
    >
      <Card title="User Type">
        <Grid alignItems="stretch" container spacing={2}>
          {optionsUserType.map(({ subtitle, title, value }) => (
            <Grid item key={title} lg={4} sm={6} xs={12}>
              <div
                className={clsx({
                  [classes.optionUserType]: true,
                  [classes.optionUserTypeSelected]: userType === value,
                })}
                onClick={setUserType(value)}
              >
                <Typography variant="subtitle1" weight="bold">
                  {title}
                </Typography>
                <Typography color="general-mid" variant="caption">
                  {subtitle}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Create>
  );
};

UserType.defaultProps = {
  data: null,
};

UserType.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  // setTab: PropTypes.func.isRequired
};

export default UserType;
