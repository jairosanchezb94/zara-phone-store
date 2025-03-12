import { createContext, useContext } from 'react';

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const API_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com';
  const API_KEY = '87909682e6cd74208f41a6ef39fe4191';
  
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  };
  
  // Obtener listado de productos con filtros opcionales
  const getProducts = async (search = '', limit = 20, offset = 0) => {
    try {
      let url = `${API_URL}/products?limit=${limit}&offset=${offset}`;
      
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      
      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  };
  
  // Obtener detalle de un producto por su ID
  const getProductById = async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, { headers });
      
      if (!response.ok) {
        throw new Error('Error fetching product details');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error getting product with ID ${id}:`, error);
      throw error;
    }
  };
  
  const value = {
    getProducts,
    getProductById
  };
  
  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};