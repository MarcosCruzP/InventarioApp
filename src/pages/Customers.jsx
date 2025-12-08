import React from 'react';
import Layout from '../components/Layout';
import OrderForm from '../components/OrderForm';
import { useInventory } from '../hooks/useInventory';

const Customers = () => {
  const { products, updateStock } = useInventory();

  const handleCustomerOrder = (id, qty) => {
    // Validación simple
    const product = products.find(p => p.id === parseInt(id));
    if (product.stock < qty) {
      alert("Error: Stock insuficiente para realizar el envío.");
      return;
    }
    updateStock(id, qty, 'remove');
  };

  return (
    <Layout title="Envíos a Clientes">
      <div className="page-content">
        <p>Utilice este formulario para despachar productos del inventario.</p>
        <OrderForm type="out" products={products} onSubmit={handleCustomerOrder} />
      </div>
    </Layout>
  );
};

export default Customers;