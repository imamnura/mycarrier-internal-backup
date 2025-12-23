import React from 'react';
import { Box, Divider, Grid } from '@material-ui/core';
import Breadcrumb from '@components/Breadcrumb';
import Typography from '@components/Typography';
import overview from './overview';
import usePopupAlert from 'src/utils/hooks/usePopupAlert';

const Component = () => {
  const { setSuccessAlert } = usePopupAlert();

  const content = overview;
  const components = Object.keys(content);

  const onCopyProps = (property) => () => {
    navigator.clipboard.writeText(JSON.stringify(property));
    setSuccessAlert({
      message: 'Props successfully copied!',
    });
  };

  return (
    <Box p={4}>
      <Typography inline variant="h4">
        MyCarrier
      </Typography>
      <Typography>Overview of mycarrier-internal design system</Typography>
      <Box paddingY={2}>
        <Divider />
      </Box>
      <Breadcrumb data={[{ label: 'Component' }]} size="medium" />
      <br />
      {components.map((name) => {
        const Elem = content[name].component;
        const variants = content[name].variant;

        return (
          <Box bgcolor="#F5F5F5" key={name} mb={2} p={3}>
            <Typography variant="h5">{name}</Typography>
            <Grid component={Box} container pt={1} spacing={4}>
              {variants.map(({ name: varName, props, grid = 'auto' }) => (
                <Grid item key={varName} xs={grid}>
                  <Typography
                    children={varName}
                    onClick={onCopyProps(props)}
                    style={{ cursor: 'pointer' }}
                    variant="body2"
                  />
                  <Box mt={1}>
                    <Elem {...props} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default Component;
