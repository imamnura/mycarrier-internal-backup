import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Table from '@components/Table';
import Dialog from '@__old/components/elements/Dialog';
import Typography from '@components/Typography';
import Button from '@components/Button';
import useActions from './hooks/useActions';
import useStyles from './styles';

export default function Component(props) {
  const { schema, modalMTTR } = props;

  const { dataMTTR, isLoading, page, setPage, onClose } = useActions(props);

  const { data, meta } = dataMTTR;

  const classes = useStyles();

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalMTTR}>
      <Grid container spacing={2} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Typography variant="h5">MTTR</Typography>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Box mt={1}>
            <Table
              data={data}
              loadingRoot={isLoading}
              meta={{ page: 0 }}
              schema={schema}
            />
          </Box>
        </Grid>
        {meta?.totalPages > 1 && (
          <Grid align="center" item md={12} sm={12} xs={12}>
            <Box display="flex" justifyContent="center" mt={1}>
              <Pagination
                className={classes.root}
                count={meta?.totalPages}
                onChange={setPage}
                page={page}
                shape="rounded"
                variant="outlined"
              />
            </Box>
          </Grid>
        )}
        <Grid align="center" item md={12} sm={12} xs={12}>
          <Box mt={1}>
            <Button children="Close" onClick={onClose} variant="ghost" />
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}

Component.defaultProps = {
  modalMTTR: false,
  schema: [],
};

Component.propTypes = {
  modalMTTR: PropTypes.bool,
  schema: PropTypes.array,
};
