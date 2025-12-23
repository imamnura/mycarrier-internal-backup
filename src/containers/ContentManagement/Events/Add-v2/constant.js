import { route } from '@configs';

export const breadcrumb = (id = null, dataEvent) => {
  if (id) {
    return [
      { label: 'Events Management', url: route.events('list') },
      { label: dataEvent?.eventId, url: route.events('detail', id) },
      { label: 'Edit Event' },
    ];
  }

  return [
    { label: 'Events Management', url: '/events-management' },
    { label: 'Add Event' },
  ];
};

export const languages = [
  {
    label: 'Bahasa Indonesia',
    value: 'id',
  },
  {
    label: 'English',
    value: 'en',
  },
];

export const dummyText = {
  title: 'Ketik nama event..',
  description: 'Ketik deskripsi konten di sini dalam Bahasa..',
  image: 'Link gambar disini..',
  slug: 'Event Slug (autofilled & editable)',
  titleRundown: 'Ketik nama acara..',
};

export const dummyTextEng = {
  title: 'Type event name..',
  description: 'Type content description here in English..',
  image: 'Image link here..',
  slug: 'Event Slug (autofilled & editable)',
  titleRundown: 'Type the name of the event..',
};

export const optionsEventType = [
  { label: 'Online', value: 'online' },
  { label: 'Hybrid', value: 'hybrid' },
];
