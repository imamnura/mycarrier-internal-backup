import { Box, Card, Divider, Grid } from '@material-ui/core';
import React from 'react';
import Breadcrumb from '@components/Breadcrumb';
import Button from '.@components/Button';
import Typography from '@components/Typography';
import { route } from '../../configs';
import Component from './elements/Components';

const DesignSystem = () => {
  const section = 'components';
  const history = {
    push: () => {},
  };

  const changePage = (page) => () => history.push(route.design_system(page));

  const renderSection = () => {
    if (section === 'components') {
      return <Component />;
    }

    return (
      <>
        <Breadcrumb data={[{ label: 'Home' }]} size="medium" />
        <br />
        <Grid container spacing={4}>
          <Grid item md={3} xs={12}>
            <Card variant="outlined">
              <Box p={2}>
                <Typography inline variant="h5">
                  Components
                </Typography>
                <Box pb={2} pt={1}>
                  <Typography>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry{`'`}
                    s standard dummy text ever since the 1500s.
                  </Typography>
                </Box>
                <Button onClick={changePage('components')}>Learn More</Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </>
    );
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
      {renderSection()}
    </Box>
  );
};
export default DesignSystem;
