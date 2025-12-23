import React from 'react';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import { RadioGroup } from '@components/FormField';
import { Box, Text } from '@legion-ui/core';
import { Grid, IconButton } from '@material-ui/core';
import Button from '@components/Button';
import DeleteIcon from '@assets/Svg/Delete';
import Add from '@assets/icon-v2/Add';
import useNewFormStyles from '../NewForm.styles';
import { TextField } from '@components/FormFieldLegion';

const FormDropdown = (props) => {
  const { control, formValues } = props;

  const classes = useNewFormStyles();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dropdownOption',
  });

  const onClickDelete = (idx) => () => {
    remove(idx);
  };

  const customType = () => {
    switch (formValues?.dropdownType) {
      case 'api':
        return (
          <TextField
            block
            control={control}
            label="API"
            placeholder="Input API Endpoint"
            name="api"
            required
          />
        );
      case 'manual':
        return (
          <div>
            {fields.length > 1 ? (
              <>
                <Text size="sm" weight="600" block mb="8px" color="#3B525C">
                  <Text children="*" size="sm" color="#DE1B1B" />
                  Dropdown List
                </Text>
                {fields.map((v, idx) => {
                  return (
                    <Grid
                      key={idx}
                      alignItems="center"
                      container
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Grid item xs={10}>
                        <TextField
                          block
                          className={classes.option}
                          control={control}
                          key={v.value}
                          name={`dropdownOption.${idx}.value`}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={onClickDelete(idx)} size="xs">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  );
                })}
              </>
            ) : (
              <Grid
                alignItems="center"
                container
                justifyContent="space-between"
                spacing={1}
              >
                <Grid item xs={12}>
                  <TextField
                    className={classes.option}
                    block
                    control={control}
                    key={fields[0]}
                    label="Dropdown List"
                    name={'dropdownOption[0].value'}
                    required
                  />
                </Grid>
              </Grid>
            )}
            <Button
              block
              className={classes.buttonAddOption}
              children="Add New List"
              leftIcon={Add}
              onClick={() => append({ value: '' })}
              variant="secondary"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Box pt="16px">
        <TextField
          block
          control={control}
          label="Custom Placeholder Text"
          placeholder="Input custom placeholder text"
          name="placeholder"
          required
        />
      </Box>
      <Box pt="16px">
        <Text size="sm" weight="600" block color="#3B525C">
          <Text children="*" size="sm" color="#DE1B1B" />
          Dropdown Type
        </Text>
        <RadioGroup
          control={control}
          direction="horizontal"
          // label="Dropdown Type"
          name="dropdownType"
          options={[
            { label: 'API', value: 'api' },
            { label: 'Manual List', value: 'manual' },
          ]}
          required
        />
      </Box>
      {customType()}
    </div>
  );
};

FormDropdown.defaultProps = {
  control: {},
};

FormDropdown.propTypes = {
  control: PropTypes.object,
};

export default FormDropdown;
