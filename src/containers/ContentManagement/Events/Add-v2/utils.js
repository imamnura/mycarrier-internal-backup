export const isEmptyItemsRundown = (arr) => {
  let item = [];
  for (let i in arr) {
    let d = arr[i]['items'];
    if (d.length <= 0) {
      return true;
    } else {
      let dt = d.find((x) => x.title === '');
      dt?.title === '' && item.push(dt);
    }
  }
  return item.length > 0 ? true : false;
};
