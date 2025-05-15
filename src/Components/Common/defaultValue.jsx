import moment from "moment";

const getUserDetail = () => {
  const userGet = localStorage.getItem("userID");

  if (userGet) {
    const user = JSON.parse(userGet);
    return user;
  } else {
    return null;
  }
};

export default getUserDetail

export const FormatDateMoment = (value) => {
  const getDate = moment(value).format("MMMM Do YYYY");
  if (getDate) {
    return getDate;
  }
  return null;
};


