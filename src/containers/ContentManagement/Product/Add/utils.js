import { create_uuid } from '@utils/common';
import React from 'react';

export const dummyText = {
  title: 'Ketik konten judul di sini dalam Bahasa..',
  description: 'Ketik deskripsi konten di sini dalam Bahasa..',
  subtitle: 'Ketik subtitle konten di sini dalam Bahasa..',
  image: 'link gambar disini..',
};

export const sectionValidator = (obj) => {
  const trueObject = [];
  obj.map((item) => {
    if (item.status) {
      trueObject.push(item);
    }
  });
  return trueObject;
};

export const stringCounter = (text) => {
  return text.length;
};

export const stringCutter = (type, text) => {
  if (type === 'title') {
    return text.slice(0, 70);
  }
  if (type === 'description') {
    return text.slice(0, 255);
  }
  if (type === 'tab') {
    return text.slice(0, 20);
  }
};

export const create_UUID = (short) => {
  return create_uuid(short ? 16 : 32);
  // let dt = new Date().getTime();
  // let uuid = '';
  // if (short) {
  //   uuid = 'xxxxxxxx-4xxx'.replace(/[xy]/g, function (c) {
  //     let r = (dt + Math.random() * 16) % 16 | 0;
  //     dt = Math.floor(dt / 16);
  //     return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  //   });
  // } else {
  //   uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //     let r = (dt + Math.random() * 16) % 16 | 0;
  //     dt = Math.floor(dt / 16);
  //     return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  //   });
  // }
  // return 'UIID-'+uuid;
};

export const section = (tabId, slideId, innerTabId) => {
  // overview
  return {
    bannerRight: {
      component: 'bannerRight',
      status: true,
      title: dummyText.title,
      description: dummyText.description,
      imageUrl: { mediaPath: dummyText.image },
    },
    bannerLeft: {
      component: 'bannerLeft',
      status: true,
      title: dummyText.title,
      description: dummyText.description,
      imageUrl: { mediaPath: dummyText.image },
    },
    premiumRight: {
      component: 'premiumRight',
      status: true,
      title: dummyText.title,
      description: dummyText.description,
      youtubeUrl: 'Tempel link disini..',
    },
    premiumLeft: {
      status: true,
      component: 'premiumLeft',
      title: dummyText.title,
      description: dummyText.description,
      youtubeUrl: 'Tempel link disini..',
    },

    // about
    about: {
      status: true,
      component: 'about',
      title: dummyText.title,
      tabs: [
        {
          _uid: tabId,
          title: 'Nama Tab',
          detail: [
            {
              _uid: slideId,
              title: dummyText.subtitle,
              description: dummyText.description,
              imageUrl: { mediaPath: dummyText.image },
            },
          ],
        },
      ],
    },
    location: {
      status: true,
      component: 'location',
      title: dummyText.title,
      subtitle: dummyText.subtitle,
      description: dummyText.description,
      fileUrl: '',
      tabs: [
        {
          _uid: tabId,
          title: 'Nama Tab',
          url: 'Ketik link google maps di sini dalam Bahasa..',
        },
      ],
    },
    pricing: {
      status: true,
      component: 'pricing',
      title: dummyText.title,
      subtitle: dummyText.subtitle,
      description: dummyText.description,
      fileUrl: '',
      tabs: [
        {
          _uid: tabId,
          title: 'Nama Tab',
          description: dummyText.description,
          imageUrl: { mediaPath: dummyText.image },
        },
      ],
    },
    addOn: {
      status: true,
      component: 'addOnServices',
      title: dummyText.title,
      subtitle: dummyText.subtitle,
      fileUrl: [''],
      tabs: [
        {
          _uid: tabId,
          title: 'Nama Tab',
          description: dummyText.description,
          detail: [
            {
              _uid: slideId,
              title: dummyText.title,
              imageUrl: { mediaPath: dummyText.image },
              tabs: [
                {
                  _uid: innerTabId,
                  title: 'Nama Tab',
                  description: dummyText.description,
                },
              ],
            },
          ],
        },
      ],
    },
    graphic: {
      status: true,
      component: 'graphic',
      title: dummyText.title,
      subtitle: dummyText.subtitle,
      tabs: [
        {
          _uid: tabId,
          title: 'Nama Tab',
          imageUrl: [
            {
              id: tabId + '_' + 0,
              mediaId: '',
              mediaName: '',
              mediaPath: dummyText.image,
            },
            {
              id: tabId + '_' + 1,
              mediaId: '',
              mediaName: '',
              mediaPath: dummyText.image,
            },
            {
              id: tabId + '_' + 2,
              mediaId: '',
              mediaName: '',
              mediaPath: dummyText.image,
            },
            {
              id: tabId + '_' + 3,
              mediaId: '',
              mediaName: '',
              mediaPath: dummyText.image,
            },
          ],
        },
      ],
    },
  };
};

export const sectionCreator = (type, tabId, slideId, innerTabId) => {
  switch (type) {
    case 'bannerRight':
      return section().bannerRight;
    case 'bannerLeft':
      return section().bannerLeft;
    case 'premiumRight':
      return section().premiumRight;
    case 'premiumLeft':
      return section().premiumLeft;
    case 'about':
      return section(tabId, slideId).about;
    case 'addOn':
      return section(tabId, slideId, innerTabId).addOn;
    case 'location':
      return section(tabId).location;
    case 'pricing':
      return section(tabId).pricing;
    case 'graphic':
      return section(tabId).graphic;
    default:
      return section().bannerRight;
  }
};

export const replacer = (page, index, block) => {
  let data = [...page];
  data[index] = block;
  return data;
};

export const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const filterArray = (arr, id) => {
  return arr.filter((item) => item._uid !== id);
};

export const getObjects = (obj, key, val) => {
  let objects = [];
  for (let i in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'object') {
      objects = objects.concat(getObjects(obj[i], key, val));
    } else if ((i === key && obj[i] === val) || (i === key && val === '')) {
      //
      objects.push(obj);
    } else if (obj[i] === val && key === '') {
      if (objects.lastIndexOf(obj) === -1) {
        objects.push(obj);
      }
    }
  }
  return objects;
};

export const getValues = (obj, key) => {
  let objects = [];
  for (let i in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'object') {
      objects = objects.concat(getValues(obj[i], key));
    } else if (i === key) {
      objects.push(obj[i]);
    }
  }
  return objects;
};

export const youtube_parser = (url) => {
  let regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  let match = url?.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};

export const insert_to = (arr, index, newItem) => {
  return [...arr].splice(index, 1, newItem);
};

export const ErrorMessageSections = (label, size) => {
  return (
    <p style={{ color: '#DE1B1B' }}>
      {label} length cannot be more {size} character
    </p>
  );
};

export const onlyContainedWhitespace = (value) => {
  return value.replace(/\s/g, '');
};
