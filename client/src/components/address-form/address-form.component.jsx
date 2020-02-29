import React, { useState } from "react";
import uuid from "uuid/v1";
import axios from "axios";

const AddressForm = () => {
  const [automatedAddresses, setAutomatedAddresses] = useState({
    typed: "",
    listOfAutomatedAddresses: [],
    toggleToManualAddresses: false
  });

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    addressFirstLine: "",
    townOrCity: "",
    county: "",
    postCode: "",
    email: "",
    phoneNumber: ""
  });

  const {
    firstName,
    lastName,
    addressFirstLine,
    townOrCity,
    county,
    postCode,
    email,
    phoneNumber
  } = address;

  const {
    listOfAutomatedAddresses,
    typed,
    toggleToManualAddresses
  } = automatedAddresses;

  const handleChange = e => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleAutomatedAddressChange = async e => {
    const { name, value } = e.target;
    const apiKey = "KN55-WG91-TF96-JM18";
    const { data: addresses } = await axios.get(
      `https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws?Text=${value}&key=${apiKey}&Countries=GB&Limit=5&Language=en`
    );
    setAutomatedAddresses({
      ...automatedAddresses,
      [name]: value,
      listOfAutomatedAddresses: addresses.Items
    });
  };

  const handleSelectedAddress = automatedAddress => {
    console.log("hi");
    const {
      Text: addressFirstLine,
      Description: description
    } = automatedAddress;
    const [townOrCity, postCode] = description.split(", ");
    setAddress({ ...address, addressFirstLine, townOrCity, postCode });
    setAutomatedAddresses({
      ...automatedAddresses,
      toggleToManualAddresses: true
    });
  };

  const handleToggleAddressManually = () => {
    setAutomatedAddresses({
      ...automatedAddresses,
      toggleToManualAddresses: !toggleToManualAddresses
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(address);
  };

  return (
    <div className="address-details">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name*</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={firstName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name*</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={lastName}
          />
        </div>
        {toggleToManualAddresses ? (
          <React.Fragment>
            <div className="form-group">
              <label htmlFor="addressFirstLine">Address First Line*</label>
              <input
                type="text"
                name="addressFirstLine"
                id="addressFirstLine"
                onChange={handleChange}
                value={addressFirstLine}
              />
            </div>
            <div className="form-group">
              <label htmlFor="townOrCity">Town/City*</label>
              <input
                type="text"
                name="townOrCity"
                id="townOrCity"
                onChange={handleChange}
                value={townOrCity}
              />
            </div>
            <div className="form-group">
              <label htmlFor="county">County</label>
              <input
                type="text"
                name="county"
                id="county"
                onChange={handleChange}
                value={county}
              />
            </div>
            <div className="form-group">
              <label htmlFor="postCode">Post Code*</label>
              <input
                type="text"
                name="postCode"
                id="postCode"
                onChange={handleChange}
                value={postCode}
              />
            </div>
            <p onClick={handleToggleAddressManually}>Search your Address</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="form-group">
              <label htmlFor="typed">Address</label>
              <input
                type="text"
                name="typed"
                autoComplete={typed.length === 0 ? "" : "no-autocomplete"}
                placeholder="Start typing first line of your address"
                id="typed"
                onChange={handleAutomatedAddressChange}
                value={typed}
              />
            </div>

            {listOfAutomatedAddresses.map(address => (
              <div key={uuid()} onClick={() => handleSelectedAddress(address)}>
                <p>{address.Text}</p> <small>{address.Description}</small>
              </div>
            ))}
            <p onClick={handleToggleAddressManually}>Enter address manually</p>
          </React.Fragment>
        )}
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number*</label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            onChange={handleChange}
            value={phoneNumber}
          />
        </div>
        <button type="submit">SAVE AND CONTINUE</button>
      </form>
    </div>
  );
};

export default AddressForm;
