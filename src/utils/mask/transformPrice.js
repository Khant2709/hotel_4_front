const transformPrice = (number) => {
  let str = number.toString();
  const parts = str.match(/\d{1,3}(?=(\d{3})*$)/g);
  return parts.join(" ");
};

export default transformPrice;
