import React, { useState } from "react";
import uuid from "uuid/v1";

import SizeSection from "../../components/size-section/size-section.component";

const CheckoutPage = () => {
  const [userForm, setUserForm] = useState({
    name: ""
  });

  const [stateSizes, setStateSizes] = useState({
    sizes: [{ size: "", quantity: "", key: uuid() }]
  });

  const { sizes } = stateSizes;

  const { name } = userForm;

  const handleSizesSectionChange = (e, key) => {
    const { name, value } = e.target;
    const sizesArray = [...sizes];
    const newSizesArray = sizesArray.map(sizeElement => {
      if (sizeElement.key === key) {
        return { ...sizeElement, [name]: value };
      } else {
        return { ...sizeElement };
      }
    });
    setStateSizes({ sizes: newSizesArray });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const sizesArray = [...sizes];
    sizesArray.forEach(sizeElement => {
      delete sizeElement.key;
      sizeElement.quantity = Number(sizeElement.quantity);
    });
    console.log(sizesArray);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <SizeSection
        handleChange={handleSizesSectionChange}
        sizes={sizes}
        setStateSizes={setStateSizes}
      />
      <button>Submit!</button>
    </form>
  );
};

export default CheckoutPage;
