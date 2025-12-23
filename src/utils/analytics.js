/* eslint-disable react/prop-types */

import { key } from '../configs';

export const tagManagerArgs = {
  gtmId: key.gtmId,
};

export function generateTitle(url) {
  if (!url) {
    return null;
  }

  let blacklist = ['']; // add any other words you want to blacklist
  const parts = url.split('/');

  // remove blacklist if url inside fault handling
  // if (parts.some((part) => part.includes('fault-handling'))) {
  // blacklist = [];
  // }

  return parts
    .filter((part) => !part.startsWith('[') || !part.endsWith(']'))
    .filter((part) => !blacklist.includes(part))
    .map((part) => {
      if (part.includes('-')) {
        // Convert "some-text" to "Some Text"
        return part
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      } else {
        // Capitalize first letter of word
        return part.charAt(0).toUpperCase() + part.slice(1);
      }
    })
    .join(' - ');
}
