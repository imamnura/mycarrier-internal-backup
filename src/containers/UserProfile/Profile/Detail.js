import Typography from '@components/Typography';
import { route } from '@configs';
import Detail from '@fragments/Detail';
import { useRouter } from 'next/router';
import PreviewPrivilege from './elements/PreviewPrivilege';
import useAction from './hooks/useActions';

const Profile = (props) => {
  const router = useRouter();
  const { data, loading, previewPrivilege } = useAction(props);

  const onClick = () => router.push(route.achievement());

  const breadcrumb = [{ label: 'User Profile' }];

  // const smClient = useResponsive('sm');

  const detailSchema = (data) => [
    {
      gridProps: { xs: 12, md: 5 },
      content: [
        {
          type: 'information',
          title: 'Detail Information',
          properties: {
            data: data,
            schema: [
              { name: 'fullName', label: 'Full Name', grid: 12 },
              { name: 'nik', label: 'NIK', grid: 12 },
              { name: 'email', label: 'Email' },
              {
                name: 'phoneNumber',
                label: 'No. Handphone',
                converter: (value) => `+62${value}`,
              },
              { name: 'roleType', label: 'Role Type', grid: 12 },
              {
                name: 'logoUrl',
                label: 'Achievement Level',
                grid: 12,
                hidden: !data.logoUrl?.fileUrl,
                converter: (value) => (
                  <>
                    <Typography
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <img
                        alt="icon"
                        src={value?.fileUrl}
                        style={{ width: '1.5rem', height: '1.5rem' }}
                      />
                      &nbsp;
                      {data?.tierName}
                    </Typography>
                    <Typography
                      color="primary-main"
                      onClick={onClick}
                      style={{ cursor: 'pointer' }}
                      variant="subtitle2"
                      weight="medium"
                    >
                      See my Achievement
                    </Typography>
                  </>
                ),
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 7 },
      stickRight: true,
      content: [
        {
          type: 'custom',
          title: 'My Privileges',
          render: <PreviewPrivilege {...previewPrivilege} />,
        },
      ],
    },
  ];

  return (
    <Detail
      breadcrumb={breadcrumb}
      loading={loading}
      notFound={!data}
      schema={detailSchema(data)}
    />
  );
};

export default Profile;
