const roundToDecimalPlaces = (value, n) => {
  const multiplier = 10 ** n;
  return Math.round(value * multiplier) / multiplier;
};

const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
};

export { roundToDecimalPlaces, dataURItoBlob };
