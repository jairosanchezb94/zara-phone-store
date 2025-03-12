import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.scss';
import { useEffect, useState } from 'react';

const Cart = () => {
  const { cartItems, removeFromCart, getCartTotal, getGroupedCartItems } = useCart();
  const groupedItems = getGroupedCartItems();
  const total = getCartTotal();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detector de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="cart">
      <h1 className="cart__title">CART ({cartItems.length})</h1>

      {cartItems.length === 0 ? (
        <div className="cart__empty">
          <p>Your cart is empty.</p>
          <Link to="/" className="cart__continue-button">
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <div className="cart__content">
          <div className="cart__items">
            {groupedItems.map((group) => (
              <div className="cart-item" key={group.id}>
                <div className="cart-item__image">
                  {/* Usamos la imagen de la primera variante */}
                  <img src={group.variants[0].imageUrl} alt={group.name} />
                </div>

                <div className="cart-item__info">
                  <div className="cart-item__header">
                    <div className="cart-item__name">{group.name}</div>
                    {group.count > 1 && (
                      <div className="cart-item__count">({group.count})</div>
                    )}
                  </div>

                  {/* Si hay una sola variante, mostramos sus detalles */}
                  {group.count === 1 ? (
                    <div className="cart-item__specs">
                      {group.variants[0].storage.capacity} | {group.variants[0].color.name}
                    </div>
                  ) : (
                    /* Si hay múltiples variantes, mostramos cada una */
                    <div className="cart-item__variants">
                      {group.variants.map((variant, idx) => (
                        <div className="cart-item__variant" key={idx}>
                          {variant.storage.capacity} | {variant.color.name}
                          <button
                            className="cart-item__remove"
                            onClick={() => removeFromCart(variant.index)}
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="cart-item__price">{group.basePrice} EUR</div>

                  {/* Si solo hay una variante, mostramos el botón eliminar debajo del precio */}
                  {group.count === 1 && (
                    <button
                      className="cart-item__remove"
                      onClick={() => removeFromCart(group.variants[0].index)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="cart__footer">
            <div className="cart__footer-inner">
              <div className="cart__summary">
                <div className="cart__total">
                  <span>TOTAL</span>
                  <span>{total} EUR</span>
                </div>
              </div>

              {/* Contenedor para ambos botones */}
              <div className="cart__buttons">
                <Link to="/" className="cart__continue-button">
                  CONTINUE SHOPPING
                </Link>

                <button className="cart__checkout-button">
                  PAY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;