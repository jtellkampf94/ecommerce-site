import React from "react";

const DeliverySpeed = ({ handleChange, speedSelected }) => {
  const standardPrice = 3.49;
  const twoDayPrice = 7.99;
  const nextdayPrice = 11.99;
  return (
    <div className="delivery-speed">
      <input
        type="checkbox"
        id="standard"
        name="speed"
        value="standard"
        onChange={e => handleChange(e, standardPrice)}
        checked={speedSelected === "standard" ? true : false}
      />
      <label htmlFor="standard">
        <span>Standard (Within 5 business days)</span>
        <small>Free for orders over £50</small>
        <span>£{standardPrice}</span>
      </label>
      <input
        type="checkbox"
        id="twoDay"
        name="speed"
        value="twoDay"
        onChange={e => handleChange(e, twoDayPrice)}
        checked={speedSelected === "twoDay" ? true : false}
      />
      <label htmlFor="twoDay">
        <span>Two day</span> <span>£{twoDayPrice}</span>
      </label>
      <input
        type="checkbox"
        id="nextDay"
        name="speed"
        value="nextDay"
        onChange={e => handleChange(e, nextdayPrice)}
        checked={speedSelected === "nextDay" ? true : false}
      />
      <label htmlFor="nextDay">
        <span>Next day</span> <span>£{nextdayPrice}</span>
      </label>
    </div>
  );
};

export default DeliverySpeed;
