import { useState, useEffect, useCallback } from 'react';
// import { initialProducts } from '../data/mockData';
import { inventoryService } from '../api/inventoryApi';

export const useInventory = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]); // Estado para proveedores
  const [orders, setOrders] = useState([]); // Nuevo estado para órdenes
  const [loading, setLoading] = useState(true);
  

  /* const searchProducts = (term) => {
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

  return { products, loading, searchProducts, updateStock, setProducts }; */

  // Función para cargar productos del backend
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [prodRes, suppRes,orderRes] = await Promise.all([
        inventoryService.getProducts(),
        inventoryService.getSuppliers(),
        inventoryService.getOrders() // Asegúrate de tener este método en inventoryApi.js
      ]);
      setProducts(prodRes.data);
      setSuppliers(suppRes.data);
      setOrders(orderRes.data); // Guardamos las órdenes en el estado
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Función para actualizar stock llamando al backend
  const executeOrder = async (productId, supplierId, quantity) => {
    try {
      // Pasamos los tres parámetros al servicio // 1. Enviamos la orden al ms-operador
      await inventoryService.createOrder(productId, supplierId, quantity);
      // 2. IMPORTANTE: Recargamos todo para actualizar Stock y Tabla de Órdenes
      await fetchData(); // Recarga los datos para ver el nuevo stock (B5)
      return true;
    } catch (error) {
      console.error("Error al ejecutar orden:", error);
      alert("No se pudo completar la operación");
      return false;
    }
  };

  return { products, suppliers, orders, loading, executeOrder,refreshData: fetchData };
};