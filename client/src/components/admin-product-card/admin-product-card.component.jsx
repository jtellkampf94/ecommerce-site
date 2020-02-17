import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

import { selectCurrentAdmin } from "../../redux/admin/admin.selectors";
import { selectViewModal, selectId } from "../../redux/ui/ui.selectors";
import { adminDeleteProductStart } from "../../redux/product/product.actions";
import { showModal, closeModal } from "../../redux/ui/ui.actions";

import CustomButton from "../custom-button/custom-button.component";
import DeleteProduct from "../delete-product/delete-product.component";

const AdminProductCard = ({
  id,
  name,
  price,
  imageUrl,
  adminId,
  currentAdmin,
  deleteProduct,
  viewModal,
  showModal,
  closeModal,
  idOfModal
}) => {
  return (
    <div>
      <div className="image" />
      <div>
        <span>{name}</span>
        <span>£{price}</span>
        <img src={imageUrl} alt={`${name} image`} />
      </div>
      {currentAdmin._id === adminId ? (
        <div className="buttons">
          <Link to={`/admin/products/${id}`}>
            <CustomButton>Edit</CustomButton>
          </Link>
          <CustomButton onClick={() => showModal(id)}>Delete</CustomButton>
        </div>
      ) : null}
      {viewModal && idOfModal === id ? (
        <DeleteProduct
          id={id}
          deleteProduct={deleteProduct}
          name={name}
          closeModal={closeModal}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentAdmin: selectCurrentAdmin,
  viewModal: selectViewModal,
  idOfModal: selectId
});

const mapDispatchToProps = dispatch => ({
  deleteProduct: productId => dispatch(adminDeleteProductStart(productId)),
  closeModal: () => dispatch(closeModal()),
  showModal: id => dispatch(showModal(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductCard);
