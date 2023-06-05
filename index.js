import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <ProductList products={productsData} />
  </React.StrictMode>,
  document.getElementById('root')
);
