import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import AddressDisplay from "../../../components/address-display/address-display.component";

import { fetchCustomerAddressesStart } from "../../../redux/address/address.actions";
import { selectAddresses } from "../../../redux/address/address.selectors";

const AddressesPage = ({ fetchAddresses, addresses }) => {
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);
  return (
    <div className="addresses">
      <h1>My Addresses</h1>
      {addresses &&
        addresses.map(address => (
          <AddressDisplay address={address} key={address._id} />
        ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  addresses: selectAddresses
});

const mapDispatchToProps = dispatch => ({
  fetchAddresses: () => dispatch(fetchCustomerAddressesStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressesPage);
