import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../../context/ApiContext';
import { useCart } from '../../context/CartContext';
import './ProductDetail.scss';
import BackButton from '../../components/BackButton/BackButton';

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById } = useApi();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  
  // Cargar detalles del producto
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        
        // Establecer la imagen por defecto del producto
        if (data.imageUrl) {
          setCurrentImage(data.imageUrl);
        } else if (data.colorOptions && data.colorOptions.length > 0) {
          // Si no hay imagen por defecto, usamos la del primer color
          setCurrentImage(data.colorOptions[0].imageUrl);
        }
        
        // Establecer el precio base (sin extras de almacenamiento)
        setCurrentPrice(data.basePrice);
        setError(null);
        
        // No seleccionamos color ni almacenamiento por defecto
        // para que el botón AÑADIR comience deshabilitado
        setSelectedColor(null);
        setSelectedStorage(null);
        
      } catch (err) {
        setError('Error loading product details. Please try again.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [id, getProductById]);
  
  // Actualizar precio cuando cambie el almacenamiento
  useEffect(() => {
    if (product) {
      if (selectedStorage) {
        // Si hay almacenamiento seleccionado, añadir su precio adicional
        setCurrentPrice(product.basePrice + selectedStorage.price);
      } else {
        // Si no hay almacenamiento seleccionado, mostrar solo el precio base
        setCurrentPrice(product.basePrice);
      }
    }
  }, [selectedStorage, product]);
  
  // Manejar la selección de color
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    // Actualizar la imagen actual con la del color seleccionado
    if (color && color.imageUrl) {
      setCurrentImage(color.imageUrl);
    }
  };
  
  // Manejar la selección de almacenamiento
  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
  };
  
  // Añadir al carrito
  const handleAddToCart = () => {
    if (product && selectedColor && selectedStorage) {
      const cartItem = {
        id: product.id,
        brand: product.brand,
        name: product.name,
        imageUrl: selectedColor.imageUrl,
        color: selectedColor,
        storage: selectedStorage,
        price: currentPrice
      };
      
      addToCart(cartItem);
    }
  };
  
  // Verificar si el botón "Añadir" debe estar habilitado
  const isAddButtonEnabled = selectedColor && selectedStorage;
  
  if (loading) {
    return <div className="product-detail__loading">Loading product details...</div>;
  }
  
  if (error || !product) {
    return <div className="product-detail__error">{error || 'Product not found'}</div>;
  }
  
  return (
    <div className="product-detail">
      <div className="product-detail__back">
        <BackButton />
      </div>
      
      <div className="product-detail__content">
      <div className="product-detail__image">
          <img src={currentImage} alt={product.name} />
      </div>
        
        <div className="product-detail__info">
          <h1 className="product-detail__name">{product.name}</h1>
          <p className="product-detail__price">{currentPrice} EUR</p>
          
          {/* Storage selector */}
          <div className="product-detail__storage">
            <h3>STORAGE (HOW MUCH SPACE DO YOU NEED?)</h3>
            <div className="product-detail__options storage-options">
              {product.storageOptions && product.storageOptions.map((storage, index) => (
                <button
                  key={index}
                  className={`option-button ${selectedStorage?.capacity === storage.capacity ? 'selected' : ''}`}
                  onClick={() => handleStorageSelect(storage)}
                >
                  {storage.capacity}
                </button>
              ))}
            </div>
          </div>
          
          {/* Color selector */}
          <div className="product-detail__color">
            <h3>COLOR. PICK YOUR FAVOURITE.</h3>
            <div className="product-detail__options color-options">
              {product.colorOptions && product.colorOptions.map((color, index) => (
                <button
                  key={index}
                  className={`color-button ${selectedColor?.name === color.name ? 'selected' : ''}`}
                  style={{ backgroundColor: color.hexCode }}
                  onClick={() => handleColorSelect(color)}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
              {selectedColor ? (
                <div className="product-detail__selected-color">{selectedColor.name}</div>
              ) : (
                <div className="product-detail__selected-color">Selecciona un color</div>
              )}
          </div>
          
          {/* Add to cart button */}
          <button
            className="product-detail__add-button"
            disabled={!isAddButtonEnabled}
            onClick={handleAddToCart}
          >
            AÑADIR
          </button>
        </div>
      </div>
      
      {/* Specifications section */}
      <div className="product-detail__specs">
        <h2>SPECIFICATIONS</h2>
        <div className="product-detail__specs-list">
          <div className="spec-row">
            <div className="spec-label">BRAND</div>
            <div className="spec-value">{product.brand}</div>
          </div>
          
          <div className="spec-row">
            <div className="spec-label">NAME</div>
            <div className="spec-value">{product.name}</div>
          </div>
          
          <div className="spec-row">
            <div className="spec-label">DESCRIPTION</div>
            <div className="spec-value">{product.description}</div>
          </div>
          
          {product.specs && Object.entries(product.specs).map(([key, value], index) => (
            <div className="spec-row" key={index}>
              <div className="spec-label">{key.toUpperCase()}</div>
              <div className="spec-value">{value}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Similar products section */}
      <div className="product-detail__similar">
        <h2>SIMILAR ITEMS</h2>
        <div className="product-detail__similar-grid">
          {product.similarProducts && product.similarProducts.map((similarProduct) => (
            <Link to={`/product/${similarProduct.id}`} key={similarProduct.id} className="similar-product">
              <div className="similar-product__image">
                <img src={similarProduct.imageUrl} alt={similarProduct.name} />
              </div>
              <div className="similar-product__info">
                <div className="similar-product__brand">{similarProduct.brand}</div>
                <div className="similar-product__name">{similarProduct.name}</div>
                <div className="similar-product__price">{similarProduct.basePrice} EUR</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;