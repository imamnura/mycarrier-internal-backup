import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { FileUpload, RadioGroup } from '@components/FormField';
import useActions from './hooks/useActions';
import { bgRevenueCard } from '@configs/image';
// import { rupiahFormat } from '@utils/parser';

export default function Component(props) {
  const { content } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleUpdateStatus,
    handleSubmit,
    onClose,
  } = useActions(props);

  return (
    <Dialog maxWidth="sm" onClose={onClose} open={content?.open}>
      <form onSubmit={handleSubmit(handleUpdateStatus)}>
        <Grid container spacing={1} style={{ padding: '0px 16px' }}>
          <Grid align="center" item xs={12}>
            {content?.title && (
              <Typography
                variant="h5"
                weight="medium"
                inline
                style={{ marginBottom: '4px' }}
              >
                {content?.title}
              </Typography>
            )}
            {content?.textInfo && (
              <Typography variant="caption" weight="normal">
                {content?.textInfo}
              </Typography>
            )}
          </Grid>
          {props?.content?.orderType !== 'Change Ownership' && (
            <Grid
              item
              xs={12}
              style={{
                marginTop: '12px',
                height: '86px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '16px',
                border: '1px solid #D2D8DA',
                borderRadius: '8px',
                backgroundImage: `url(${bgRevenueCard})`,
                backgroundSize: '70% 100%',
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Typography variant="caption" weight="medium" color="general-mid">
                Total Order
              </Typography>
              <Typography variant="h5" weight="bold">
                {/* {rupiahFormat(content?.grandTotal || '') || '-'} */}
                {content?.grandTotal || '-'}
              </Typography>
            </Grid>
          )}
          {props?.content?.orderType !== 'Change Ownership' && (
            <Grid item xs={12} style={{ marginTop: '12px' }}>
              <RadioGroup
                control={control}
                direction="horizontal"
                hideHelper
                name="basoType"
                options={[
                  { label: 'Full Signed Document', value: 'full' },
                  {
                    label: 'Partially Signed Document by Telkom',
                    value: 'partial',
                  },
                ]}
                required
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FileUpload
              accept={['.pdf']}
              control={control}
              helperText="Upload .pdf document here, max 5 MB "
              label="BASO"
              maxSize={5242880}
              name="media"
              placeholder="Example: baso.pdf"
              required
            />
          </Grid>
          {content?.caption && (
            <Grid item xs={12}>
              <Typography variant="caption" weight="normal">
                {content?.caption}
              </Typography>
            </Grid>
          )}
          <Grid
            container
            item
            justifyContent="center"
            spacing={2}
            style={{ marginTop: '8px' }}
          >
            <Grid item>
              <Button onClick={onClose} variant="ghost">
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={!isValid || !isDirty} type="submit">
                {content?.submitText || 'SUBMIT'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.defaultProps = {
  content: null,
};

Component.propTypes = {
  content: PropTypes.object,
};
