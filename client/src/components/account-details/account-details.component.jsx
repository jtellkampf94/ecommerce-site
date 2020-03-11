import React from "react";
import Moment from "react-moment";

const AccountDetails = ({ account }) => {
  const {
    firstName,
    lastName,
    email,
    gender,
    dateOfBirth,
    createdAt,
    updatedAt
  } = account;
  return (
    <div>
      <h5>Account Details</h5>
      <div>First Name: {firstName}</div>
      <div>Last Name: {lastName}</div>
      <div>Email: {email}</div>
      <div>Gender: {gender[0].toUpperCase() + gender.slice(1)}</div>
      <div>
        Date Of Birth: <Moment format="Do MMM YYYY">{dateOfBirth}</Moment>
      </div>
      <div>
        Date you joined as a member:
        <Moment format="Do MMM YYYY HH:mm:ss">{createdAt}</Moment>
      </div>
      <div>
        Last account settings update:
        <Moment format="Do MMM YYYY HH:mm:ss">{updatedAt}</Moment>
      </div>
    </div>
  );
};

export default AccountDetails;
