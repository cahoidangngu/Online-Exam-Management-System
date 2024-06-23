const formatedDate = (date) => {
  return date.toISOString().split("T")[0];
};
export default formatedDate;
