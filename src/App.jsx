import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, TooltipProvider } from './context/CartContext';
import { ApiProvider } from './context/ApiContext';
import Header from './components/Header/Header';
import ProductList from './pages/ProductList/ProductList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import './styles/tooltip.scss';

function App() {
  return (
    <ApiProvider>
      <TooltipProvider>
        <CartProvider>
          <Router>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
          </Router>
        </CartProvider>
      </TooltipProvider>
    </ApiProvider>
  );
}

export default App;