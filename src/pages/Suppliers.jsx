import React from 'react';
import Layout from '../components/Layout';
import OrderForm from '../components/OrderForm';
import { useInventory } from '../hooks/useInventory';

const Suppliers = () => {
  const { products, updateStock } = useInventory();

  const handleSupplierOrder = (id, qty) => {
    updateStock(id, qty, 'add');
    // Aquí podrías agregar lógica para guardar en un historial de pedidos
  };

  return (
    <Layout title="Pedidos a Proveedores">
      <div className="page-content">
        <p>Utilice este formulario para solicitar reabastecimiento de stock externo.</p>
        <OrderForm type="in" products={products} onSubmit={handleSupplierOrder} />
      </div>
    </Layout>
  );
};

export default Suppliers;