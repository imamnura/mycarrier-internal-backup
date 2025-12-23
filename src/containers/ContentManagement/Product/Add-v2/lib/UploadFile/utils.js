export const validateRatio = (w, h, files, setAlert, ratio, onChange) => {
  if (w / h !== ratio[0] / ratio[1]) {
    setAlert(
      `image not valid, please upload image with ratio ${ratio[0]} : ${ratio[1]}`,
    );
  } else {
    onChange(files);
  }
};

export const validatePixel = (w, h, files, setAlert, ratioPixel, onChange) => {
  if (w !== ratioPixel[0] && h !== ratioPixel[1]) {
    setAlert(`image not valid,
        please upload image with size ${ratioPixel[0]} : ${ratioPixel[1]} pixel`);
  } else {
    onChange(files);
  }
};
