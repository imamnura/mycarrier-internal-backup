export const mockFetch = (response = null) => {
  return new Promise((resolve) => {
    resolve(response);
  });
};

export const mockFetchFailed = (response = null) => {
  return new Promise((resolve, reject) => reject(response));
};
