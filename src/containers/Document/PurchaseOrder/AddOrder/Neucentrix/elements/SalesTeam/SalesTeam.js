import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import Numbering from '@components/Numbering/Numbering';
import Information from '@components/Information/Information';
import ChangeMSDialog from './_elements/ChangeMSDialog/ChangeMSDialog';
import AddAMDialog from './_elements/AddAMDialog/AddAMDialog';
import NoData from '@assets/ilustration-v2/NoData';
import useStyles from './styles';
import Separator from './_elements/separator';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';

const AMSection = ({ control }) => {
  const classes = useStyles();

  const { fields, replace, remove } = useFieldArray({
    control,
    name: 'accountManager',
    keyName: 'am_id',
  });

  const handleAddAM = (data) => {
    replace(data);
  };

  const handleDeleteAm = (idx) => {
    remove(idx);
  };

  const AMProps = (data, number) => ({
    alignItems: 'flex-start',
    number: number + 1,
    schema: [
      { name: 'name', label: 'Name', grid: 4 },
      { name: 'nik', label: 'NIK', grid: 4 },
      { name: 'segment', label: 'Segment', grid: 4 },
      { name: 'position', label: 'Position', grid: 4 },
      { name: 'phone', label: 'Phone Number', grid: 4 },
      { name: 'role', label: 'Role', grid: 4 },
    ],
    data,
  });

  return (
    <>
      <Box mb={'40px'}>
        <Box mb={'32px'}>
          <Typography color="general-mid" variant="h4" weight="medium">
            Account Manager
          </Typography>
        </Box>

        <Box mb={'24px'}>
          {fields?.length ? (
            fields?.map((item, index) => {
              return (
                <Box key={index}>
                  <Numbering {...AMProps(item, index)} />
                  <Separator
                    label="Delete AM"
                    onClick={() => handleDeleteAm(index)}
                    variant="delete"
                  />
                </Box>
              );
            })
          ) : (
            <Box className={classes.notFound}>
              <NoData className={classes.notFoundIcon} />
              <Typography variant="h5" weight="medium">
                There is no AM list
              </Typography>
              <Typography>Add AM by clicking add AM</Typography>
            </Box>
          )}
        </Box>

        <AddAMDialog currentData={fields} handleAssign={handleAddAM} />
      </Box>
    </>
  );
};

const MSSection = ({ setValue, data }) => {
  const [_data, setData] = useState(data?.segmentManager || {});
  const classes = useStyles();

  const handleChangeMS = (d) => {
    setData(d[0]);
    setValue('segmentManager', d[0], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const schema = [
    { name: 'name', label: 'Name', grid: 3 },
    { name: 'nik', label: 'NIK', grid: 3 },
    { name: 'title', label: 'Title', grid: 3 },
    { name: 'phone', label: 'Contact Number', grid: 3 },
  ];

  return (
    <>
      <Box mb={'32px'}>
        <Typography color="general-mid" variant="h4" weight="medium">
          Manager Segment
        </Typography>
      </Box>
      {Object.keys(_data)?.length ? (
        <Grid container style={{ marginBottom: '24px' }}>
          {schema.map(({ label, name, grid }) => (
            <Grid item key={name} xs={grid}>
              <Information label={label} value={_data[name]} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box className={classes.notFound}>
          <NoData className={classes.notFoundIcon} />
          <Typography variant="h5" weight="medium">
            There is no Manager Segment
          </Typography>
          <Typography>
            Change Manager Segment by click Change Manager Segment
          </Typography>
        </Box>
      )}
      <ChangeMSDialog currentData={[_data]} handleAssign={handleChangeMS} />
    </>
  );
};

const SalesTeam = ({ control, setValue, data }) => {
  return (
    <>
      <AMSection control={control} />
      <MSSection control={control} data={data} setValue={setValue} />
    </>
  );
};

SalesTeam.defaultProps = {
  control: {},
  data: {},
};

SalesTeam.propTypes = {
  control: PropTypes.object,
  data: PropTypes.object,
  setValue: PropTypes.func.isRequired,
};

AMSection.defaultProps = {
  control: {},
};

AMSection.propTypes = {
  control: PropTypes.object,
};

MSSection.defaultProps = {
  control: {},
  data: {},
};

MSSection.propTypes = {
  control: PropTypes.object,
  data: PropTypes.object,
  setValue: PropTypes.func.isRequired,
};

export default SalesTeam;
