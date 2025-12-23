import Account from '@assets/icon-v2/Account';
import Button from '@components/Button';
import SearchBox from '@components/SearchBox';
import OptionList from '@components/OptionList';
import TableDesktop from '@components/Table/elements/Desktop';
import Typography from '@components/Typography';
import { Box, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from '../../styles';

const AddCC = (props) => {
  const {
    ccType,
    onCancel,
    onSubmit,
    onSubmitType,
    open,
    setType,
    type,
    list,
    search,
    setSearch,
    loadingTable,
    setSelectedEmployee,
    selectedEmployee,
    onScrollList,
  } = useAction(props);

  const classes = useStyles({ ccType });

  const tableData = list?.data?.map((data) => {
    return {
      ...data,
      hierarchy: (
        <Box>
          <Typography color="general-main" inline variant="body2">
            {data.title}
          </Typography>
          <Typography color="general-mid" variant="body2">
            {data.name} /{' '}
          </Typography>
          <Typography color="general-mid" variant="body2">
            {data.nik}
          </Typography>
        </Box>
      ),
    };
  });

  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogRoot }}
        maxWidth="lg"
        open={open}
        scroll="paper"
      >
        {!ccType ? (
          <>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h5" weight="medium">
                Choose carbon copy type
              </Typography>
            </Box>
            <OptionList
              onChange={setType}
              options={[
                {
                  Icon: Account,
                  label: 'By Title',
                  description: 'Carbon copy can search by Title',
                  value: '1',
                },
                {
                  Icon: Account,
                  label: 'By Name',
                  description: 'Carbon copy can search by Name',
                  value: '2',
                },
              ]}
              value={type}
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
                gap: 16,
              }}
            >
              <Button onClick={onCancel} variant="ghost">
                Cancel
              </Button>
              <Button onClick={onSubmitType}>go ahead</Button>
            </Box>
          </>
        ) : (
          <>
            <DialogTitle>
              <Box
                mb={2}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  textAlign: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5" weight="medium">
                  Select carbon copy by {ccType == 1 ? 'Title' : 'Name'}
                </Typography>
              </Box>
              <SearchBox
                fullWidth
                noBorder
                onChange={setSearch}
                placeholder={`Search ${ccType == 1 ? 'Title' : 'Name'}..`}
                value={search}
              />
            </DialogTitle>
            <DialogContent onScroll={onScrollList} style={{ paddingBottom: 0 }}>
              <TableDesktop
                data={tableData}
                loading={loadingTable.row}
                loadingRoot={loadingTable.root}
                meta={list.meta}
                numbering={false}
                onClickRow={setSelectedEmployee}
                pickedRow={selectedEmployee?.nik || selectedEmployee?.hierarchy}
                pickedRowKey={selectedEmployee?.nik ? 'nik' : 'hierarchy'}
                schema={
                  ccType == 1
                    ? [
                        { name: 'hierarchy', label: 'HIERARCHY' },
                        { name: 'department', label: 'DEPARTMENT' },
                      ]
                    : [
                        { name: 'name', label: 'NAME' },
                        { name: 'nik', label: 'NIK' },
                        { name: 'department', label: 'DEPARTMENT' },
                      ]
                }
              />
            </DialogContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
                gap: 16,
              }}
            >
              <Button onClick={onCancel} variant="ghost">
                Cancel
              </Button>
              <Button onClick={onSubmit}>Add</Button>
            </Box>
          </>
        )}
      </Dialog>
    </>
  );
};

export default AddCC;
