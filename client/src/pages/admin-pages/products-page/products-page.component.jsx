import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

import ProductCollection from "../../../components/product-collection/product-collection.component";
import Pagination from "../../../components/pagination/pagination.component";

import { fetchProductsStart } from "../../../redux/product/product.actions";
import { selectProducts } from "../../../redux/product/product.selectors";
import { selectCurrentAdmin } from "../../../redux/admin/admin.selectors";

const AdminProducts = ({ fetchProducts, products, admin }) => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 8
  });

  const { currentPage, limit } = pagination;

  useEffect(() => {
    fetchProducts(currentPage, limit);
  }, [fetchProducts]);

  const handlePageChange = page => {
    setPagination({ ...pagination, currentPage: page });
    fetchProducts(page, limit);
  };

  return (
    <div className="log-in-and-register">
      {admin ? <h5>Welcome back {admin.firstName}</h5> : null}
      <Link to="/admin/add-product">
        <button>+ Add Product</button>
      </Link>
      <h1>Products</h1>
      {products ? <ProductCollection products={products.results} /> : null}
      {products ? (
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsCount={products.itemsCount}
          limit={limit}
        />
      ) : null}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchProducts: (page, limit) => dispatch(fetchProductsStart(page, limit))
});

const mapStateToProps = createStructuredSelector({
  products: selectProducts,
  admin: selectCurrentAdmin
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
