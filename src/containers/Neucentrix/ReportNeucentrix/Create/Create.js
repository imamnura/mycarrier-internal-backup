import React from 'react';
import { AddCircle } from '@material-ui/icons';
import { Box, Chip } from '@material-ui/core';
import color from '@styles/color';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import Create from '@fragments/Create';
import FileAttachment from '@__old/components/elements/FileAttachment';
import Text from '@__old/components/elements/Text';
import ToggleButton from './ToggleButton';
import Typography from '@components/Typography';
import UploadFile from '@__old/components/elements/UploadFile';
import useAction from './hooks/useActions';
import { AutoComplete } from '@components/FormField';
import { route } from '@configs';
import { TextField } from '@components/FormField';
import { textLimit } from '@utils/text';
import useStyles from './styles';
import Card from '@components/Card';

const ReportCreate = () => {
  const classes = useStyles();
  const {
    actions,
    chip,
    clearConfirmation,
    companyInfo,
    companyList,
    confirmation,
    control,
    handleDelete,
    handleRemove,
    onChangeToggle,
    loadingCompany,
    file,
    setFile,
  } = useAction();

  const required = (label) => {
    return (
      <Box mt={1}>
        <Text color="primary" variant="subtitle2">
          *{' '}
        </Text>
        {label}
      </Box>
    );
  };

  return (
    <Create
      action={actions}
      breadcrumb={[
        { label: 'Report NeuCentrIX', url: route.reportNcx('list') },
        { label: 'Upload Report' },
      ]}
    >
      <Card
        title="Company Information"
        style={{ width: 'fit-content', marginBottom: 24 }}
      >
        <Box style={{ width: 510 }} title="Company Information">
          <Box mb={3} mt={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box mr={5} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1">
                Do you know about company name?
              </Typography>
              <Typography
                color="general-mid"
                style={{ maxWidth: '24rem', marginTop: 8 }}
                variant="subtitle2"
              >
                <i>
                  Please complete company name below, if no this report would be
                  forwarded to WDM.
                </i>
              </Typography>
            </Box>
            <ToggleButton onChange={onChangeToggle} value={companyInfo} />
          </Box>

          <Box width={400}>
            <AutoComplete
              control={control}
              disabled={!companyInfo}
              label="Company Name"
              loading={loadingCompany}
              name="company"
              options={companyList.map((v) => v.custAccntName)}
              required
            />
            {!!companyInfo &&
              chip.map((v, index) => {
                return (
                  <span key={v + index}>
                    <Chip
                      className={classes.chip}
                      label={v.companyName}
                      onDelete={() => handleDelete(v)}
                      variant="outlined"
                    />
                  </span>
                );
              })}
          </Box>
        </Box>
      </Card>

      <Card style={{ width: 'fit-content' }} title="Upload Document">
        <Box style={{ width: 510 }}>
          <Box width={400}>
            <Box mt={3}>
              <UploadFile
                accept={['.pdf']}
                disabled={file.length >= 5}
                fileName={''}
                label="Upload File here.."
                labelInput={required('Upload File (up to 5 files)')}
                maxSize={10485760}
                multiple={true}
                onChange={(v) => setFile((files) => [...files, v])}
                value=""
              />
            </Box>
            <Box mt={2}>
              {file.length >= 1 &&
                file.map((item, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '5px auto',
                      }}
                    >
                      <FileAttachment
                        file={true}
                        fileName={textLimit(item?.name, 30)}
                        readOnly={true}
                        type="PDF"
                      />
                      <AddCircle
                        onClick={() => handleRemove(i)}
                        style={{
                          transform: 'rotate(45deg)',
                          color: color.primary.main,
                          marginRight: 5,
                          cursor: 'pointer',
                        }}
                      />
                    </div>
                  );
                })}
            </Box>
            <Box mt={3}>
              <TextField
                control={control}
                label="Note"
                minRows={3}
                multiline
                name="note"
                required
              />
            </Box>
          </Box>
        </Box>
      </Card>
      <ConfirmationDialog {...confirmation} onClose={clearConfirmation} />
    </Create>
  );
};

export default ReportCreate;
