import React from 'react';
import Create from '@fragments/Create';
import { route } from '@configs';
import useAction from './hooks/useAction';
import { Box, Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import { RadioGroup, Select, TextField } from '@components/FormField';
import Checkbox from '@components/Checkbox';
import { Controller } from 'react-hook-form';
import SalesTeamPicker from '../_elements/SalesTeamPicker';
import { removePhoneSpace } from '@utils/parser';
import Card from '@components/Card/Card';

const CreateLead = (props) => {
  const {
    validBy,
    control,
    isOthersProduct,
    isOtherContact,
    // isOthersSource,
    isBusinessTypeOthers,
    isDescriptionTypeOthers,
    isOtherCustomer,
    loadingProduct,
    loadingSource,
    onSubmit,
    optionProduct,
    optionSource,
    handleSubmit,
    customerAsyncProps,
    contactAsyncProps,
  } = useAction(props);

  return (
    <Create
      action={[{ children: 'add lead', onClick: handleSubmit(onSubmit) }]}
      breadcrumb={[
        { label: 'Dashboard', url: route.dashboadLeadManagementSystem('list') },
        { label: 'Add New Lead' },
      ]}
    >
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Card title="Product Name">
              <Select
                control={control}
                isLoading={loadingProduct}
                isSearchable
                label="Product Name"
                maxWidth="100%"
                name="product"
                options={optionProduct}
                placeholder="Choose Product Name"
                rawValue
                required
              />
              {isOthersProduct && (
                <TextField
                  control={control}
                  label="Others Product Name"
                  maxLength={40}
                  name="otherProduct"
                  required
                  shouldUnregister
                />
              )}
            </Card>
            <Card title="Source">
              <Select
                control={control}
                isLoading={loadingSource}
                isSearchable
                label="Source"
                maxWidth="100%"
                name="source"
                options={optionSource}
                placeholder="Choose Source"
                required
              />
            </Card>
            <Card title="Company Profile">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Select
                  asyncProps={customerAsyncProps}
                  cacheOptions
                  control={control}
                  defaultOptions
                  isDisabled={isOtherCustomer}
                  isSearchable
                  label="Company Name"
                  maxWidth="100%"
                  menuWidth={360}
                  name="companyName"
                  placeholder="Choose Company Name"
                  rawValue
                  required
                />
                <Controller
                  control={control}
                  name="isOtherCustomer"
                  render={({ field }) => (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 16 }}
                    >
                      <Checkbox {...field} />
                      <Typography color="general-mid" variant="body2">
                        Customer not on the list above?
                      </Typography>
                    </Box>
                  )}
                />
              </Box>
              {isOtherCustomer && (
                <TextField
                  control={control}
                  label="Company Name"
                  maxLength={20}
                  name="otherCompanyName"
                  required
                  shouldUnregister
                />
              )}
              <TextField
                control={control}
                label="Location"
                maxLength={300}
                minRows={4}
                multiline
                name="location"
                required
              />
              <Select
                control={control}
                label="Business Type"
                maxWidth="100%"
                name="businessType"
                options={[
                  {
                    label: 'Content Providers',
                    value: 'Content Providers',
                  },
                  {
                    label: 'Game Publishers',
                    value: 'Game Publishers',
                  },
                  {
                    label: 'OLO (Other License Operation)',
                    value: 'OLO (Other License Operation)',
                  },
                  {
                    label: 'Enterprise',
                    value: 'Enterprise',
                  },
                  {
                    label: 'System Integration',
                    value: 'System Integration',
                  },
                  {
                    label: 'ISP/NSP/Telco',
                    value: 'ISP/NSP/Telco',
                  },
                  {
                    label: 'Others',
                    value: 'Others',
                  },
                ]}
                placeholder="Choose Business Type"
                required
              />
              {isBusinessTypeOthers && (
                <TextField
                  control={control}
                  label="Others Business Type"
                  maxLength={40}
                  name="otherBusinessType"
                  required
                  shouldUnregister
                />
              )}
              <Select
                additionalWidth={0.2}
                control={control}
                label="Company Size"
                maxWidth="100%"
                name="companySize"
                options={[
                  {
                    label: 'Small enterprises: 10 to 49 employees',
                    value: 'Small enterprises: 10 to 49 employees',
                  },
                  {
                    label: 'Medium-sized enterprises: 50 to 249 employees',
                    value: 'Medium-sized enterprises: 50 to 249 employees',
                  },
                  {
                    label: 'Large enterprises: 250 employees or more',
                    value: 'Large enterprises: 250 employees or more',
                  },
                ]}
                placeholder="Choose Company Size"
                required
              />
            </Card>
            <Card title="Description">
              <Select
                control={control}
                label="Description Type"
                maxWidth="100%"
                name="descriptionType"
                options={[
                  { label: 'Product Knowledge', value: 'Product Knowledge' },
                  { label: 'Pricing', value: 'Pricing' },
                  {
                    label: 'Installation Process',
                    value: 'Installation Process',
                  },
                  { label: 'AM Contact', value: 'AM Contact' },
                  { label: 'Others', value: 'Others' },
                ]}
                placeholder="Choose Description Type"
                required
              />
              {isDescriptionTypeOthers && (
                <TextField
                  control={control}
                  label="Others Description Type"
                  maxLength={40}
                  name="otherDescriptionType"
                  required
                  shouldUnregister
                />
              )}
              <TextField
                control={control}
                label="Please describe your requirements in more detail.."
                maxLength={1000}
                minRows={4}
                multiline
                name="description"
                required
              />
            </Card>
            <Card title="Contact">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Select
                  asyncProps={contactAsyncProps}
                  cacheOptions
                  control={control}
                  defaultOptions
                  isDisabled={isOtherContact}
                  isSearchable
                  label="Full Name"
                  maxWidth="100%"
                  menuWidth={360}
                  name="name"
                  placeholder="Choose Name"
                  rawValue
                  required
                />
                <Controller
                  control={control}
                  name="isOtherContact"
                  render={({ field }) => (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 16 }}
                    >
                      <Checkbox {...field} />
                      <Typography color="general-mid" variant="body2">
                        Name not on the list above?
                      </Typography>
                    </Box>
                  )}
                />
              </Box>
              {isOtherContact && (
                <TextField
                  control={control}
                  label="Full Name"
                  maxLength={40}
                  name="otherName"
                  required
                />
              )}
              <TextField
                control={control}
                label="Occupation"
                maxLength={40}
                name="occupation"
                required
              />
              <TextField
                control={control}
                label="Phone Number"
                maxLength={20}
                name="phone"
                required
                valueMasking={removePhoneSpace}
              />
              <TextField
                control={control}
                label="Business Email"
                maxLength={50}
                name="contactEmail"
              />
            </Card>
            <Card title="Assign Lead">
              <RadioGroup
                alignItems="flex-start"
                control={control}
                direction="vertical"
                name="validBy"
                options={[
                  {
                    label: (
                      <>
                        <Box maxWidth="100%" mt={-0.25} width={190}>
                          <Typography variant="subtitle1" weight="bold">
                            Sales Team
                          </Typography>
                        </Box>
                        {validBy === 'amMapping' && (
                          <Box ml={-4} mt={2}>
                            <Controller
                              control={control}
                              name="amMapping"
                              render={({
                                field: { onChange },
                                fieldState: { error },
                              }) => (
                                <>
                                  <Box sx={{ mb: 1 }}>
                                    <Typography
                                      color="primary-main"
                                      variant="body2"
                                    >
                                      {error?.message}
                                    </Typography>
                                  </Box>
                                  <SalesTeamPicker onChange={onChange} />
                                </>
                              )}
                            />
                          </Box>
                        )}
                      </>
                    ),
                    value: 'amMapping',
                  },
                  {
                    label: (
                      <>
                        <Box maxWidth="100%" mt={-0.25} width={220}>
                          <Typography variant="subtitle1" weight="bold">
                            Other Recipient
                          </Typography>
                          <Box mt={0.25}>
                            <Typography color="general-mid" inline>
                              Via email and WhatsApp number
                            </Typography>
                          </Box>
                        </Box>
                        {validBy === 'sendEmail' && (
                          <Box ml={-4} mt={2}>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <TextField
                                  control={control}
                                  label="Full Name"
                                  maxLength={40}
                                  name="fullName"
                                  required
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  control={control}
                                  label="WhatsApp Number"
                                  maxLength={20}
                                  name="phoneNumber"
                                  required
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  control={control}
                                  label="Email"
                                  maxLength={50}
                                  name="recipientEmail"
                                  required
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </>
                    ),
                    value: 'sendEmail',
                    mb: 1,
                  },
                  {
                    label: (
                      <>
                        <Box maxWidth="100%" mt={-0.25} width={220}>
                          <Typography variant="subtitle1" weight="bold">
                            Assigning to MyTEnS
                          </Typography>
                        </Box>
                      </>
                    ),
                    value: 'dispatchMyTens',
                  },
                ]}
              />
            </Card>
          </div>
        </Grid>
      </Grid>
    </Create>
  );
};

export default CreateLead;
