import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import useActions from './hooks/useActions';
import Stepper from '@components/Stepper';
import Step1 from './lib/Step1';
import Step2 from './lib/Step2';
import { pickCopywriting } from './utils';

export default function Component(props) {
  const { content, productName } = props;

  const {
    control,
    formState: { isValid },
    handleUpdateStatus,
    handleSubmit,
    onClose,
    step,
    setStep,
    watch,
    optionsBakesNumber,
  } = useActions(props);
  
  const accessibleTab = useMemo(() => {
    if (isValid) return 2;
    else return -1;
  }, [isValid]);

  const { title, caption, textInfo } = pickCopywriting(productName, step);

  const buttonRender = () => {
    switch (step) {
      case 0:
        return (
          <Grid container item justifyContent="center" pt={2} spacing={2}>
            <Grid item>
              <Button onClick={onClose} variant="ghost">
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={!isValid} onClick={() => setStep(1)}>
                NEXT
              </Button>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container item justifyContent="center" pt={2} spacing={2}>
            <Grid item>
              <Button onClick={onClose} variant="ghost">
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={!isValid} type="submit">
                submit
              </Button>
            </Grid>
          </Grid>
        );
    }
  };

  const formRender = () => {
    switch (step) {
      case 0:
        return (
          <Step1
            control={control}
            optionsBakesNumber={optionsBakesNumber}
            watch={watch}
          />
        );
      case 1:
        return <Step2 control={control} watch={watch} />;
    }
  };

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={content?.open}>
      <form onSubmit={handleSubmit(handleUpdateStatus)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          {title && (
            <Grid align="center" item xs={12}>
              <Typography variant="h5" weight="medium">
                {title}
              </Typography>
            </Grid>
          )}
          {textInfo && (
            <Grid align="center" item xs={12}>
              <Typography variant="caption" weight="normal">
                {textInfo}
              </Typography>
            </Grid>
          )}
          {!content?.bakesNumber && (
            <Grid align="center" item xs={12}>
              <Stepper
                accessibleTab={accessibleTab}
                active={step}
                onStepClick={(value) => setStep(value)}
                steps={['Upload BAKES', 'Select Approval']}
                variant="number"
              />
            </Grid>
          )}
          <Grid item xs={12}>
            {formRender()}
          </Grid>
          {caption && (
            <Grid item xs={12}>
              <Typography variant="caption" weight="normal">
                {caption}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            {buttonRender()}
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.defaultProps = {
  content: null,
  productName: 'GameQoo',
};

Component.propTypes = {
  content: PropTypes.object,
  productName: PropTypes.string,
};
