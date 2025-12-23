import { route } from '@configs';
import Detail from '@fragments/Detail';
import SectionInformation from '@fragments/Detail/elements/SectionInformation';
import { Text } from '@legion-ui/core';
import { Box, Grid } from '@material-ui/core';
import useActions from './hooks/useActions';
import AmList from './lib/AMList/AmList';
import { statusVariant } from './utils';

const CustomerDetail = (props) => {
  const { data, loading, id } = useActions(props);

  const breadcrumb = (id = '-') => [
    { label: 'AM Mapping', url: route.amMapping('list') },
    { label: id },
  ];

  const detailSchema = [
    {
      gridProps: { xs: 12 },
      content: [
        {
          type: 'custom',
          render: (
            <Box>
              <Grid
                alignItems="baseline"
                container
                justifyContent="flex-start"
                spacing={1}
              >
                <Grid item>
                  <Text size="20px" weight="700" color="secondary-500">
                    Customer Information
                  </Text>
                </Grid>
                <Grid item>
                  <Text color="secondary-400">
                    Last Update: {data?.lastUpdate}
                  </Text>
                </Grid>
              </Grid>
              <Box pt={3}>
                <SectionInformation
                  data={data || {}}
                  schema={[
                    { name: 'customerAccountName', label: 'Customer', grid: 3 },
                    { name: 'caNumber', label: 'CA Number', grid: 3 },
                    { name: 'nipnas', label: 'Nipnas', grid: 3 },
                    { name: 'bpNumber', label: 'BP Number', grid: 3 },
                    { name: 'region', label: 'Customer Type', grid: 12 },
                    { name: 'address', label: 'Address', grid: 12 },
                  ]}
                />
              </Box>
            </Box>
          ),
        },
        {
          type: 'custom',
          title: 'AM Mapping',
          render: <AmList id={data?.nipnas} />,
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        breadcrumb={breadcrumb(id)}
        loading={loading}
        notFound={!id || !data}
        schema={detailSchema}
        status={{
          children: data?.status,
          variant: statusVariant[data?.status],
        }}
      />
    </>
  );
};

export default CustomerDetail;
