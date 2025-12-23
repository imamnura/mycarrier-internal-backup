import { normalizeDetail } from '../normalizeDetail';

describe('src/containers/ContentManagement/Events/Add-v2/hooks/normalizeDetail', () => {
  test('normalizeDetail', () => {
    const data = {
      eventRegistration: 'test',
      pastLink: 'test',
      relatedProduct: { items: [] },
      startDate: 'test',
      endDate: 'test',
      localizations: [
        {
          title: 'test 1',
          slug: '/test',
          description: 'test 1',
          rundown: { items: 'test' },
        },
        {
          title: 'test 2',
          slug: '/test',
          description: 'test 2',
          rundown: { items: 'test' },
        },
      ],
      location: 'test',
      typeLocation: 'test',
      imageBanner: 'test',
      speakers: { items: 'test' },
      attendees: { items: 'test' },
      sponsors: { items: 'test' },
    };

    expect(normalizeDetail(data)).toBeTruthy();
  });
});
