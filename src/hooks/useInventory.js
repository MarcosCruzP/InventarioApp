import { useState, useEffect } from 'react';
import { initialProducts } from '../data/mockData';

export const useInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts(initialProducts);
      setLoading(false);
    }, 1000); // Simula 1 segundo de carga
  }, []);

  const searchProducts = (term) => {
    if (!term) return initialProducts;
    return initialProducts.filter(p => 
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      p.category.toLowerCase().includes(term.toLowerCase()) ||
      p.supplier.toLowerCase().includes(term.toLowerCase())
    );
  };

  const updateStock = (id, quantity, type) => {
    setProducts(prev => prev.map(p => {
      if (p.id === parseInt(id)) {
        return {
          ...p,
          stock: type === 'add' ? p.stock + quantity : p.stock - quantity
        };
      }
      return p;
    }));
  };

  return { products, loading, searchProducts, updateStock, setProducts };
};