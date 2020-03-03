import React, { useState } from "react";

const AddressDisplay = ({ address }) => {
  const {
    _id,
    firstName,
    lastName,
    addressFirstLine,
    townOrCity,
    county,
    postCode,
    email,
    phoneNumber,
    customerId
  } = address;
  return (
    <div>
      <div>
        {firstName} {lastName}
      </div>
      <div>{addressFirstLine}</div>
      <div>{townOrCity}</div>
      {county && <div>{county}</div>}
      <div>{postCode}</div>
      <div>{email}</div>
      <div>{phoneNumber}</div>
      <button>EDIT</button>
    </div>
  );
};

export default AddressDisplay;
