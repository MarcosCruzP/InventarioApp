import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { useInventory } from '../hooks/useInventory';

const Inventory = () => {
  const { products, loading, searchProducts } = useInventory();
  
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(products);
  }, [products]);

  const handleSearch = (term) => {
    const results = searchProducts(term);
    setFiltered(results);
  };

  return (
    <Layout title="Inventario y Búsqueda">
      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <p className="loading-text">Cargando inventario...</p>
      ) : (
        <div className="inventory-grid">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
          {filtered.length === 0 && <p>No se encontraron productos.</p>}
        </div>
      )}
    </Layout>
  );
};

export default Inventory;