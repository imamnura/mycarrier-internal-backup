import Attachment from '@components/Attachment';

const attachmentOverview = {
  component: Attachment,
  variant: [
    {
      name: 'PDF',
      grid: 4,
      props: {
        fileUrl:
          'https://storage-assurance-dev.mytens.id/mycarrier-quotation/bakes/BA-1637672430549/BA-1637672430549-customersigned.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=q1dx5HaUIo76Ych3nXqy%2F20211216%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211216T061452Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=4bf7c17f5f40684411fe1225928f8f7af9cbda6d12da79f69a103c9eb445622a',
      },
    },
    {
      name: 'PNG',
      grid: 4,
      props: {
        fileUrl:
          'https://mycarrier-internal-dev.telkomdigitalsolution.co/img/banner.png',
        fileName: 'Override Original Name.png',
      },
    },
    {
      name: 'XLS/XLSX',
      grid: 4,
      props: {
        fileUrl: 'https://filesamples.com/samples/document/xlsx/sample3.xlsx',
      },
    },
    {
      name: 'JPG',
      grid: 4,
      props: {
        fileUrl:
          'https://www.techsmith.com/blog/wp-content/uploads/2020/11/TechSmith-Blog-JPGvsPNG.png',
      },
    },
    {
      name: 'OTHER',
      grid: 4,
      props: {
        fileUrl:
          'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip',
      },
    },
  ],
};

export default attachmentOverview;
