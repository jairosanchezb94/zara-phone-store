import { createContext, useState, useContext, useEffect } from 'react';

// Contexto para el tooltip de confirmación
export const TooltipContext = createContext();

export const useTooltip = () => useContext(TooltipContext);

export const TooltipProvider = ({ children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [tooltipCallback, setTooltipCallback] = useState(null);
  
  const showConfirmation = (message, callback) => {
    setTooltipMessage(message);
    setTooltipCallback(() => callback);
    setShowTooltip(true);
  };
  
  const hideTooltip = () => {
    setShowTooltip(false);
  };
  
  const handleConfirm = () => {
    if (tooltipCallback) {
      tooltipCallback(true);
    }
    hideTooltip();
  };
  
  const handleCancel = () => {
    if (tooltipCallback) {
      tooltipCallback(false);
    }
    hideTooltip();
  };
  
  const value = {
    showTooltip,
    tooltipMessage,
    showConfirmation,
    hideTooltip,
    handleConfirm,
    handleCancel
  };
  
  return (
    <TooltipContext.Provider value={value}>
      {children}
      {showTooltip && (
        <div className="tooltip-overlay">
          <div className="tooltip-container">
            <p>{tooltipMessage}</p>
            <div className="tooltip-buttons">
              <button onClick={handleCancel}>Cancelar</button>
              <button onClick={handleConfirm}>Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </TooltipContext.Provider>
  );
};

// Contexto del carrito
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { showConfirmation } = useTooltip();
  
  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);
  
  // Actualizar localStorage cuando cambie el carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Contar cuántos teléfonos de un mismo modelo hay en el carrito
  const countSamePhoneModel = (productId) => {
    return cartItems.filter(item => item.id === productId).length;
  };
  
  // Añadir producto al carrito con verificación de límite
  const addToCart = (product) => {
    const samePhoneCount = countSamePhoneModel(product.id);
    
    // Si ya hay 2 o más teléfonos del mismo modelo, mostrar mensaje de confirmación
    if (samePhoneCount >= 2) {
      showConfirmation(
        `Ya tienes ${samePhoneCount} unidades de este teléfono en tu carrito. ¿Estás seguro de que quieres añadir otro?`, 
        (confirmed) => {
          if (confirmed) {
            // Si el usuario confirma, añadir el producto
            setCartItems([...cartItems, product]);
          }
        }
      );
    } else {
      // Si hay menos de 2, añadir directamente
      setCartItems([...cartItems, product]);
    }
  };
  
  // Eliminar producto del carrito
  const removeFromCart = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };
  
  // Calcular total del carrito
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price;
    }, 0);
  };
  
  // Agrupar productos por modelo para la visualización
  const getGroupedCartItems = () => {
    const groupedItems = {};
    
    cartItems.forEach((item, index) => {
      const key = item.id;
      
      if (!groupedItems[key]) {
        groupedItems[key] = {
          id: item.id,
          name: item.name,
          brand: item.brand,
          basePrice: item.price, // Usamos el precio del primer item de este modelo
          variants: [],
          count: 0
        };
      }
      
      groupedItems[key].variants.push({
        index, // Mantener el índice original para eliminar
        imageUrl: item.imageUrl,
        color: item.color,
        storage: item.storage,
        price: item.price
      });
      
      groupedItems[key].count += 1;
    });
    
    return Object.values(groupedItems);
  };
  
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    getCartTotal,
    getGroupedCartItems
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};