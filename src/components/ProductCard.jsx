import React from 'react';

const ProductCard = ({ product }) => {
  const stockClass = product.stock < 10 ? 'product-card__stock--low' : 'product-card__stock--ok';

  return (
    <div className="product-card">
      <h3 className="product-card__title">{product.name}</h3>
      <p className="product-card__info"><strong>Cat:</strong> {product.category}</p>
      <p className="product-card__info"><strong>Prov:</strong> {product.supplier}</p>
      <div className={`product-card__stock ${stockClass}`}>
        Stock: {product.stock}
      </div>
    </div>
  );
};

export default ProductCard;