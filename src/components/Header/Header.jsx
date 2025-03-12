import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.scss';
import MbstLogo from '../../utils/MbstLogo';
import CartIcon from '../../utils/CartIcon';

const Header = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  
  // Verificar si estamos en la página del carrito
  const isCartPage = location.pathname === '/cart';
  
  return (
    <header className={`header ${isCartPage ? 'header--cart-page' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <MbstLogo />
        </Link>
        <Link to="/cart" className="header__cart">
          <CartIcon count={cartItems.length} />
        </Link>
      </div>
    </header>
  );
};

export default Header;