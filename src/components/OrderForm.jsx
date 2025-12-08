import React, { useState } from 'react';

// Formulario genérico para Pedidos (Proveedores) o Envíos (Clientes)
const OrderForm = ({ type, products, onSubmit }) => {
  const [selectedId, setSelectedId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedId && quantity > 0) {
      onSubmit(selectedId, parseInt(quantity));
      alert(type === 'in' ? 'Pedido realizado al proveedor' : 'Envío generado al cliente');
      setQuantity(1);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3 className="order-form__title">{type === 'in' ? 'Nueva Solicitud a Proveedor' : 'Nuevo Envío a Cliente'}</h3>
      
      <div className="order-form__group">
        <label className="order-form__label">Producto</label>
        <select className="order-form__select" value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
          <option value="">Seleccione un producto</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>
          ))}
        </select>
      </div>

      <div className="order-form__group">
        <label className="order-form__label">Cantidad</label>
        <input 
          type="number" 
          className="order-form__input" 
          min="1" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
        />
      </div>

      <button type="submit" className={`order-form__button order-form__button--${type}`}>
        {type === 'in' ? 'Solicitar Stock' : 'Despachar Pedido'}
      </button>
    </form>
  );
};

export default OrderForm;