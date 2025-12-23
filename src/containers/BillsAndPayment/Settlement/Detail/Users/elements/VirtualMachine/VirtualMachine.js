/* eslint-disable react/prop-types */
import SearchBox from '@components/SearchBox';
import Table from '@components/Table';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { vmSchema } from '../../utils';
import useAction from './hooks/useAction';

const VirtualMachine = ({ data: _data, classes }) => {
  const { data, onPaginationChange, page, search, setSearch, size } = useAction(
    { data: _data },
  );

  const paginateData = useMemo(
    () =>
      [...data].slice(page * size, page * size + size).map((item) => ({
        ...item,
        vmHostname: (
          <Box>
            <Typography color="general-main" variant="body2">
              {item?.hostName}
            </Typography>
            <Typography color="general-light" inline variant="caption">
              Time on:
            </Typography>
            <Typography color="green-main" variant="body2">
              {item?.timeOn}
            </Typography>
          </Box>
        ),
        vmDetail: (
          <Box
            sx={{ pb: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <div>
              <Typography color="general-light" inline variant="caption">
                OS
              </Typography>
              <Typography color="general-main" variant="body2">
                {item?.detail?.os}
              </Typography>
            </div>
            <div>
              <Typography color="general-light" inline variant="caption">
                Package
              </Typography>
              <Typography color="general-main" variant="body2">
                {item?.detail?.package}
              </Typography>
            </div>
            <div>
              <Typography color="general-light" inline variant="caption">
                CPU
              </Typography>
              <Typography color="general-main" variant="body2">
                {item?.detail?.cpu}
              </Typography>
            </div>
            <div>
              <Typography color="general-light" inline variant="caption">
                RAM
              </Typography>
              <Typography color="general-main" variant="body2">
                {item?.detail?.ram}
              </Typography>
            </div>
            <Box className={classes.divider} />
            <div>
              <Typography color="general-light" inline variant="caption">
                IP
              </Typography>
              <Typography color="general-main" variant="body2">
                {item?.detail?.ip?.ip || typeof item?.detail?.ip === 'string'
                  ? 'item?.detail?.ip'
                  : '-' || '-'}
              </Typography>
            </div>
            <div>
              <Typography color="general-light" inline variant="caption">
                Volume
              </Typography>
              <Typography color="general-main" variant="body2">
                {item?.detail?.volume}
              </Typography>
            </div>
          </Box>
        ),
        vmStatus: (
          <Box alignItems="center" display="flex">
            <Box
              className={clsx(
                classes.circle,
                item?.currentStatus === 'Running'
                  ? classes.greenCircle
                  : classes.redCircle,
              )}
            />
            <Typography color="general-main" variant="body2">
              {item?.currentStatus}
            </Typography>
          </Box>
        ),
      })),
    [data, page],
  );

  const currentData = page * size + size;

  return (
    <>
      <Box mb={2}>
        <SearchBox
          onChange={setSearch}
          placeholder="Search ID..."
          value={search}
        />
      </Box>
      <Table
        data={paginateData}
        meta={{
          totalPage: 0,
          page: 0,
        }}
        numbering={false}
        schema={vmSchema}
      />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: 16,
          justifyContent: 'flex-end',
          mt: 4,
        }}
      >
        <Typography variant="caption">
          Showing <strong>{page * size + 1} </strong>
          to{' '}
          <strong>
            {data.length < currentData ? data.length : currentData}{' '}
          </strong>
          from <strong>{data.length}</strong> total data
        </Typography>
        <Pagination
          color="primary"
          count={Math.ceil(data.length / size)}
          onChange={onPaginationChange}
          page={page + 1}
          shape="rounded"
          variant="outlined"
        />
      </Box>
    </>
  );
};

export default VirtualMachine;
