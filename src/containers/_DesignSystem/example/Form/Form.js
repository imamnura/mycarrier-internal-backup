'use client';

import React from 'react';
import {
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  Select,
  TextField,
  TimePicker,
} from '@components/FormField';
import { Box, Grid } from '@material-ui/core';
import useAction from './hooks/useAction';
import Wysiwyg from '@components/FormField/Wysiwyg';

const Form = () => {
  const { control } = useAction();

  return (
    <>
      <Box maxWidth={400} p={5} width="100%">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="TextField"
              maxLength={100}
              name="textField"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="TextField Number"
              name="textFieldNum"
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="TextField Area"
              maxLength={1000}
              minRows={4}
              multiline
              name="textFieldArea"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              control={control}
              isLoading
              label="Select"
              name="select"
              options={[{ label: 'Label Label', value: 'ss' }]}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              control={control}
              label="DatePicker"
              name="datePicker"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <DateTimePicker
              control={control}
              label="DateTimePicker"
              name="dateTimePicker"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TimePicker
              control={control}
              label="TimePicker"
              maxTime={new Date('2020/12/12 11:10:10')}
              minTime={new Date('2020/12/12 10:10:10')}
              name="timePicker"
              required
              variant="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <DateRangePicker
              control={control}
              label="DateRangePicker"
              name="dateRangePicker"
              required
            />
          </Grid>
        </Grid>
      </Box>
      <Box p={4} sx={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
        <Wysiwyg control={control} name="html" />
        <Wysiwyg control={control} name="html2" variant="document" />
      </Box>
    </>
  );
};

export default Form;
