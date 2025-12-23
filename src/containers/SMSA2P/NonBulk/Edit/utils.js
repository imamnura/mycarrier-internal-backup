export const optionsParse = (data, key = 'dropdownName') => {
  return data.map((d) => ({ label: d.dropdownName, value: d[key] }));
};

export const isChannelMMS = (channel) => {
  return channel.includes('MMS');
};
