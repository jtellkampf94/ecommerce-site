import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Pagination from "../../components/pagination/pagination.component";
import ProductContent from "../../components/product-content/product-content";

import { selectProducts } from "../../redux/product/product.selectors";
import { fetchProductsByCategoryStart } from "../../redux/product/product.actions";

const CategoryPage = ({ products, fetchProductsByCategory, match }) => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 8
  });

  const { currentPage, limit } = pagination;

  useEffect(() => {
    fetchProductsByCategory(match.params.category, 1, 8);
  }, [match.params.category]);

  const handlePageChange = page => {
    setPagination({ ...pagination, currentPage: page });
    fetchProductsByCategory(match.params.category, page, limit);
  };

  return (
    <div>
      {products && (
        <React.Fragment>
          <ProductContent products={products.results} />
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            itemsCount={products.itemsCount}
            limit={limit}
          />
        </React.Fragment>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchProductsByCategory: (category, page, limit) =>
    dispatch(fetchProductsByCategoryStart(category, page, limit))
});

const mapStateToProps = createStructuredSelector({
  products: selectProducts
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
