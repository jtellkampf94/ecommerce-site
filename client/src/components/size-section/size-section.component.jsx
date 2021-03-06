import React from "react";
import uuid from "uuid/v1";

const SizeSection = ({ handleChange, sizes, setStateSizes }) => {
  const handleIncrementSection = () => {
    setStateSizes({
      sizes: [...sizes, { size: "", quantity: "", identityKey: uuid() }]
    });
  };

  const handleDecrementSection = () => {
    const newSizesArray = [...sizes];
    newSizesArray.pop();
    setStateSizes({
      sizes: newSizesArray
    });
  };

  return (
    <div className="checkout">
      {sizes && (
        <React.Fragment>
          {sizes.map(size => {
            const { identityKey, size: sz, quantity } = size;
            return (
              <div key={identityKey}>
                <label>Size</label>
                <input
                  onChange={e => handleChange(e, identityKey)}
                  type="text"
                  name="size"
                  value={sz}
                />
                <label>Quantity</label>
                <input
                  onChange={e => handleChange(e, identityKey)}
                  type="number"
                  name="quantity"
                  value={quantity}
                />
              </div>
            );
          })}
          <button type="button" onClick={handleIncrementSection}>
            +
          </button>
          {sizes.length > 1 ? (
            <button type="button" onClick={handleDecrementSection}>
              -
            </button>
          ) : null}
        </React.Fragment>
      )}
    </div>
  );
};

export default SizeSection;
