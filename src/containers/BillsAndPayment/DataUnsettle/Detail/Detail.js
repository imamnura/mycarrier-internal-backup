import Detail from '@fragments/Detail';
import PropTypes from 'prop-types';
import ListOfDetail from './elements/ListOfDetail';
import useActions from './hooks/useAction';
import { isHaveAccess } from '@utils/common';

const DetailDataUnsettle = (props) => {
  const { data, feature, onDownload } = useActions(props);

  const breadcrumb = [
    { label: 'Data Unsettle', back: true },
    { label: data.segment },
  ];

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'information',
          title: 'Segment Information',
          properties: {
            data,
            schema: [
              {
                label: 'SEGMENT',
                name: 'segment',
                grid: 3,
              },
              {
                label: 'INVOICE GROUP',
                name: 'invoiceGroup',
                grid: 3,
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'custom',
          title: 'List of Detail',
          render: <ListOfDetail feature={feature} />,
        },
      ],
    },
  ];

  const action = [{ children: 'Download', onClick: onDownload }];

  return (
    <Detail
      action={action}
      breadcrumb={breadcrumb}
      loading={false}
      // notFound={false}
      notFound={!isHaveAccess(feature, 'read_detail_data_unsettle')}
      schema={detailSchema}
    />
  );
};

DetailDataUnsettle.defaultProps = {
  feature: [],
};

DetailDataUnsettle.propTypes = {
  feature: PropTypes.array,
};

export default DetailDataUnsettle;
