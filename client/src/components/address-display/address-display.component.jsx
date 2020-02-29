import React, { useState } from "react";

const AddressDisplay = () => {
  const [addresses, setAddresses] = useState([]);
  return (
    <div>
      {addresses &&
        addresses.map(address => (
          <div key={address._id}>
            <h1>{address.firstName}</h1>
          </div>
        ))}
    </div>
  );
};

export default AddressDisplay;
