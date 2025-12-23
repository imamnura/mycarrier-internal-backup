import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, IconButton } from '@material-ui/core';
import useStyles from './styles';
import { Text } from '@legion-ui/core';
import Cancel from '@assets/icon-v2/Cancel';
import useActions from './hooks/useActions';
import Button from '@components/Button';
import { Select } from '@components/FormField';
import { object } from 'yup';

const ModalProductChildConfig = (props) => {
  const { modalProductChildConfig } = props;

  const classes = useStyles();

  const { onClose, formProductChildConfig, options, loading, onSubmit } =
    useActions(props);

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      maxWidth="md"
      open={modalProductChildConfig?.open}
      key={modalProductChildConfig?.id}
    >
      <form onSubmit={formProductChildConfig?.handleSubmit(onSubmit)}>
        <div className={classes.wrapper}>
          <div className={classes.headerWrapper}>
            <Text
              children="Add Child Product"
              color="secondary500"
              size="20px"
              height="28px"
              weight={700}
            />
            <div>
              <IconButton
                size="small"
                onClick={onClose()}
                disabled={loading.submit}
              >
                <Cancel />
              </IconButton>
            </div>
          </div>
          <div className={classes.contentWrapper}>
            <div>
              <Text size="sm" weight="600" block mb="8px" color="#3B525C">
                <Text children="*" size="sm" color="#DE1B1B" />
                Package or Child Product Name
              </Text>
              <Select
                menuPosition="fixed"
                control={formProductChildConfig?.control}
                menuWidth="100%"
                minWidth="100%"
                name="child"
                isSearchable
                options={options?.productChild}
                isLoading={loading?.productChild}
                isDisabled={
                  loading.productChild ||
                  loading?.submit ||
                  !options?.productChild?.length
                }
                placeholder="Select Package or Child Product Name"
                rawValue
                noBorder={false}
                hideNullHelperText
                rules={{
                  validate: async (value) =>
                    object()
                      .required()
                      .label('Package or Child Product Name')
                      .validate(value)
                      .then(() => true)
                      .catch((err) => err?.message),
                }}
              />
            </div>
          </div>
          <div className={classes.footerWrapper}>
            <Button
              children="Cancel"
              variant="ghost"
              onClick={onClose()}
              disabled={loading.submit}
            />
            <Button
              children="ADD"
              disabled={
                !formProductChildConfig?.formState?.isValid ||
                !formProductChildConfig?.formState?.isDirty ||
                loading?.submit
              }
              loading={loading.submit}
              type="submit"
            />
          </div>
        </div>
      </form>
    </Dialog>
  );
};

ModalProductChildConfig.defaultProps = {
  control: {},
  state: {
    optionsBillingAccount: [],
    optionsProductChildConfigAccount: [],
  },
};

ModalProductChildConfig.propTypes = {
  control: PropTypes.object,
  state: PropTypes.object,
};

export default ModalProductChildConfig;
