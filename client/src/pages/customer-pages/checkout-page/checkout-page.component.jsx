import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import OrderSummary from "../../../components/order-summary/order-summary.component";
import AddressForm from "../../../components/address-form/address-form.component";
import AddressDisplay from "../../../components/address-display/address-display.component";
import DeliverySpeed from "../../../components/delivery-speed/delivery-speed.component";

import { selectCartSubtotalPrice } from "../../../redux/cart/cart.selectors";
import {
  selectAddresses,
  selectAddressErrors,
  selectCurrentAddress
} from "../../../redux/address/address.selectors";
import { fetchCustomerAddressesStart } from "../../../redux/address/address.actions";
import { checkCustomerLoggedIn } from "../../../redux/customer/customer.actions";

import "./checkout-page.css";

const CheckoutPage = ({
  checkCustomerLoggedIn,
  cartSubtotal,
  fetchAddresses,
  addresses,
  currentAddress
}) => {
  const [showAddressForm, toggleAddressForm] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState({
    addressId: null
  });

  const [deliverySpeed, setDeliverySpeed] = useState({
    speed: "",
    price: ""
  });

  useEffect(() => {
    if (currentAddress) {
      handleSubmitToggleBack(currentAddress._id);
    }
  }, [currentAddress]);

  useEffect(() => {
    checkCustomerLoggedIn();
    fetchAddresses();
  }, [fetchAddresses, checkCustomerLoggedIn]);

  useEffect(() => {
    if (addresses.length === 1) {
      setSelectedAddress({ addressId: addresses[0]._id });
    }
  }, [addresses]);

  const handleClick = () => {
    toggleAddressForm(!showAddressForm);
  };

  const handleSubmitToggleBack = addressId => {
    toggleAddressForm(false);
    setSelectedAddress({ addressId });
  };

  const handleSelectedAddressForDelivery = addressId => {
    setSelectedAddress({ addressId });
  };

  const handleSelectDeliveryPrice = (e, price) => {
    const { value, name } = e.target;
    setDeliverySpeed({ [name]: value, price });
  };

  const { addressId } = selectedAddress;

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <OrderSummary
        subtotal={cartSubtotal}
        checkout
        deliveryPrice={deliverySpeed.price}
      />
      <div>
        <h5>Shipping</h5>
        {!showAddressForm && addresses.length > 0 ? (
          <React.Fragment>
            {!addressId && <p>Please select an address for delivery</p>}
            {addresses.map(address => (
              <div
                key={address._id}
                onClick={() => handleSelectedAddressForDelivery(address._id)}
                className={`address-display ${
                  addressId === address._id ? "selected" : null
                }`}
              >
                <AddressDisplay address={address} />
              </div>
            ))}
            <button onClick={handleClick}>ADD NEW ADDRESS</button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <AddressForm
              toggleAddressForm={toggleAddressForm}
              handleSubmitToggleBack={handleSubmitToggleBack}
            />
            {addresses.length > 0 && (
              <button onClick={handleClick}>CANCEL</button>
            )}
          </React.Fragment>
        )}
        {addressId && (
          <DeliverySpeed
            speedSelected={deliverySpeed.speed}
            handleChange={handleSelectDeliveryPrice}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartSubtotal: selectCartSubtotalPrice,
  addresses: selectAddresses,
  currentAddress: selectCurrentAddress
});

const mapDispatchToProps = dispatch => ({
  fetchAddresses: () => dispatch(fetchCustomerAddressesStart()),
  checkCustomerLoggedIn: () => dispatch(checkCustomerLoggedIn())
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
