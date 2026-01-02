import axios from 'axios';

const API_BASE_URL = "http://localhost:8082/api";

const inventoryApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const inventoryService = {
    // GET: Obtener productos
    getProducts: () => inventoryApi.get('/productos'),

    // Nuevo: Obtener lista de proveedores desde el ms-operador
    getSuppliers: () => inventoryApi.get('/suppliers'),

    getOrders: () => inventoryApi.get('/ordenes'),
    
    // POST: Crear orden (Ajustado para recibir id y qty por separado) 
    // Enviamos los nombres exactos del DTO de Java
    createOrder: (productId, supplierId, quantity) => {
        return inventoryApi.post('/ordenes', {
            idProduct: parseInt(productId), // Nombre exacto que espera tu DTO en Java
            idSupplier: parseInt(supplierId),
            quantity: parseInt(quantity)
        });
    }
};

export default inventoryApi;