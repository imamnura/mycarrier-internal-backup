import React from 'react';

import { Grid, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { TextField } from '@components/FormField';
import UploadFile from '@__old/components/elements/UploadFile';
// import Button from '@__old/components/elements/Button';
import Typography from '@components/Typography';
// import Breadcrumb from '@__old/components/elements/Breadcrumb';
// import Divider from '@__old/components/elements/Divider';
import { withStyles } from '@material-ui/core/styles';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import styles from '../../styles';

import useActions from './hooks/useActions';
import HeaderAndFilter from '@fragments/HeaderAndFilter';

const DocumentUpload = (props) => {
  const {
    allowed,
    control,
    confirmUpload,
    handleSubmit,
    handleUploadFile,
    formState: { isValid, isDirty },
    file,
    setFile,
    confirmation,
    clearConfirmation,
  } = useActions(props);
  // const { isOpen, classes } = props;
  const { isOpen } = props;

  const titleProps = {
    color: 'general-mid',
    variant: 'h4',
    weight: 'medium',
  };

  const breadcrumb = () => [
    {
      label: 'Product Management',
      url: '/product-management',
    },
    { label: 'Upload Document' },
  ];

  const actionButton = () => {
    let button = [];

    button.push({
      onClick: () => isOpen(false),
      children: 'CANCEL',
      variant: 'ghost',
    });
    button.push({
      onClick: handleSubmit(confirmUpload),
      children: 'SAVE',
      disabled: !isValid || !isDirty || file === null,
    });

    return button;
  };

  const headerTranslateProps = {
    action: actionButton(),
    breadcrumb: breadcrumb(),
  };

  const TopPage = (
    <Box
      style={{
        top: '72px',
        zIndex: 4,
        position: 'sticky',
        background: '#FFF',
      }}
    >
      <HeaderAndFilter {...headerTranslateProps} />
    </Box>
    // <>
    //   <Grid item md={12} sm={12}>
    //     <Grid
    //       alignItems="center"
    //       container
    //       justifyContent="space-between"
    //       spacing={2}
    //     >
    //       <Grid item>
    //         <Breadcrumb data={breadcrumb()} />
    //       </Grid>
    //       <Grid className={classes.submitContainer}>
    //         <Grid className={classes.item}>
    //           <Button onClick={() => isOpen(false)} variant="ghost">
    //             Cancel
    //           </Button>
    //         </Grid>
    //         <Grid className={classes.item}>
    //           <Button
    //             disabled={!isValid || !isDirty || file === null}
    //             type="submit"
    //           >
    //             Save
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <Grid align="right" item xs={12}>
    //     <Divider />
    //   </Grid>
    // </>
  );

  return (
    <>
      <form onSubmit={handleSubmit(confirmUpload)}>
        {TopPage}
        <Grid container spacing={2} style={{ padding: '40px 40px 32px 40px' }}>
          <Grid
            item
            md={6}
            sm={12}
            style={{ padding: '24px', background: '#fff', borderRadius: '8px' }}
          >
            <Typography children="Document Attributes" {...titleProps} />
            <Box mb={5}>
              <Box mt={3}>
                <TextField
                  control={control}
                  label="Document Name"
                  maxLength={40}
                  name="documentName"
                  required
                />
              </Box>
            </Box>

            <Box mt={3}>
              <UploadFile
                accept={allowed}
                fileName={file ? file.name : ''}
                handleDelete={() => setFile(null)}
                id="uploadfile"
                label="document"
                maxSize={10485760}
                onChange={(val) => handleUploadFile(val)}
                withDelete={true}
              />
            </Box>

            <Box mt={3}>
              <TextField
                control={control}
                label="Description"
                maxLength={160}
                minRows={5}
                multiline
                name="documentDesc"
                required
              />
            </Box>
          </Grid>
        </Grid>
      </form>
      <ConfirmationDialog {...confirmation} onClose={clearConfirmation} />
    </>
  );
};

DocumentUpload.defaultProps = {
  allowed: ['.pdf', '.png', '.jpeg'],
  classes: {},
  initialDocument: {},
};

DocumentUpload.propTypes = {
  allowed: PropTypes.array,
  classes: PropTypes.object,
  documentList: PropTypes.array.isRequired,
  initialDocument: PropTypes.object,
  isOpen: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
  setDocument: PropTypes.func.isRequired,
  setInitialDocument: PropTypes.func.isRequired,
};

export default withStyles(styles)(DocumentUpload);
