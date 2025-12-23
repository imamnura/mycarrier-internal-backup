import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Grid, Box } from '@material-ui/core';
import Table from '@components/Table';
import Button from '@components/Button';
import { route } from '@configs';

const ActivityHistory = (props) => {
  const { schema, data, visitId } = props;
  const router = useRouter();

  return (
    <Grid container spacing={2}>
      <Grid item md={12} sm={12} xs={12}>
        <Box mt={2}>
          <Table
            data={data}
            meta={{ page: 0 }}
            numbering={false}
            schema={schema}
          />
        </Box>
      </Grid>
      {data.length > 0 && (
        <Grid item md={12} sm={12} xs={12}>
          <Box mt={1}>
            <Button
              boxProps={{
                width: '100%',
                justifyContent: 'space-between',
              }}
              children="View All Activities"
              onClick={() => router.push(route.visitNcx('history', visitId))}
              variant="ghost"
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

ActivityHistory.defaultProps = {
  data: [],
  schema: [],
};

ActivityHistory.propTypes = {
  data: PropTypes.array,
  schema: PropTypes.array,
  visitId: PropTypes.string.isRequired,
};

export default ActivityHistory;
