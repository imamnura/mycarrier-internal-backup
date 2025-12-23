import Button from '@components/Button';
import { Select } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import Checkbox from '@components/Checkbox';
import { TextField, FileUpload } from '@components/FormField';
import useActions from './hooks/useActions';
import useStyles from './styles';
import { uploadFileGeneral } from '../../../_repositories/repositories';

const ModalUploadAgreement = (props) => {
  const {
    open,
    onClose,
    control,
    optionStatus,
    optionActivity,
    setSelectedActivity,
    loadingStatus,
    handleSubmit,
    onSubmit,
    disabled,
  } = useActions(props);

  const classes = useStyles({ optionActivity });

  const acceptedFile = [
    '.pdf',
    '.txt',
    '.jpg',
    '.jpeg',
    '.png',
    '.doc',
    '.docx',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const renderSelectOptions = (item, field) => {
    if (item.label !== '') {
      if (item?.check) {
        return (
          <>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Checkbox
                {...field}
                checked
                disabled
                onClick={setSelectedActivity(item)}
                value={true}
              />
              <Box sx={{ ml: 1 }}>
                <Typography color="general-light" variant="body2">
                  {item.label}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ ml: 3 }}>
              <FileUpload
                accept={acceptedFile}
                control={control}
                disabled
                fetcher={uploadFileGeneral}
                helperText="Upload .jpg, .png, .pdf, .txt or .word document, max 1 MB "
                maxSize={1050000}
                name={item.evidence}
                placeholder="Example: evidence.jpg"
              />
            </Box>
          </>
        );
      } else {
        return (
          <>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Checkbox {...field} onClick={setSelectedActivity(item)} />
              <Box sx={{ ml: 1 }}>
                <Typography color="general-mid" variant="body2">
                  {item.label}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ ml: 3 }}>
              <FileUpload
                accept={acceptedFile}
                control={control}
                disabled={!field.value}
                fetcher={uploadFileGeneral}
                helperText="Upload .jpg, .png, .pdf, .txt or .word document, max 1 MB "
                maxSize={1050000}
                name={item.evidence}
                placeholder="Example: evidence.jpg"
              />
            </Box>
          </>
        );
      }
    } else {
      return (
        <>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Checkbox {...field} onClick={setSelectedActivity(item)} />
            <div style={{ width: '100%', marginLeft: 8 }}>
              <TextField
                control={control}
                disabled={!field.value}
                fetcher={uploadFileGeneral}
                label="Type Activity"
                maxLength={400}
                name="customActivity"
                placeholder={'Please type the activity..'}
                required
              />
            </div>
          </Box>
          <Box sx={{ ml: 3 }}>
            <FileUpload
              accept={acceptedFile}
              control={control}
              disabled={!field.value}
              fetcher={uploadFileGeneral}
              helperText="Upload .jpg, .png or .pdf document, max 1 MB "
              maxSize={1050000}
              name={item.evidence}
              placeholder="Example: evidence.jpg"
            />
          </Box>
        </>
      );
    }
  };

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} open={open}>
      <div
        style={{
          overflow: optionActivity.length > 0 ? 'auto' : 'visible',
          padding: '32px 40px',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" weight="medium">
            Update Activity
          </Typography>
        </Box>
        <Box mt={2}>
          <Select
            control={control}
            isLoading={loadingStatus}
            label="Status"
            name="status"
            options={optionStatus}
            required
            shouldUnregister
          />
          {optionActivity.length > 0 && (
            <>
              <Typography
                color="primary-main"
                variant="overline"
                weight="medium"
              >
                *{' '}
              </Typography>
              <Typography
                color="general-mid"
                variant="overline"
                weight="medium"
              >
                Select Activity{' '}
              </Typography>
            </>
          )}
          {optionActivity.map((item, i) => {
            return (
              <Controller
                control={control}
                key={`option-activity-${i}`}
                name={`activity${i}`}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 4,
                      mt: 1,
                      flexDirection: 'column',
                    }}
                  >
                    {renderSelectOptions(item, field)}
                  </Box>
                )}
              />
            );
          })}
        </Box>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button disabled={disabled} ml={16} onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Box>
      </div>
    </Dialog>
  );
};

export default ModalUploadAgreement;
