import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Product Listing</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          {/* Add other product details as needed */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
