export const mediaSellerFilter = (data) => {
  // selain mitracomm dan ims
  return !['0004704779', '0004704778'].includes(data.custAccntNum);
};
