import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../context/ApiContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import ClearSearchIcon from '../../utils/ClearSearchIcon';
import ColorFilter from '../../components/ColorFilter/ColorFilter';
import './ProductList.scss';

const ProductList = () => {
  const { getProducts } = useApi();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Almacenar todos los productos sin filtrar
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [resultsCount, setResultsCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  
  // Debounce para la búsqueda
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  // Efecto para debounce
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);
  
  // Cargar productos al inicio o cuando cambie el término de búsqueda
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts(debouncedSearchTerm);
        setAllProducts(data); // Guardar todos los productos sin filtrar
        
        // Aplicar filtro de color si existe
        const filteredData = applyColorFilter(data, selectedColor);
        
        setProducts(filteredData);
        setResultsCount(filteredData.length);
        setError(null);
      } catch (err) {
        setError('Error loading products. Please try again.');
        setProducts([]);
        setAllProducts([]);
        setResultsCount(0);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [debouncedSearchTerm, getProducts]);
  
  // Función separada para aplicar el filtro de color
  const applyColorFilter = (productsToFilter, color) => {
    if (!color) return productsToFilter;
    
    return productsToFilter.filter(product => {
      return product.colorOptions && product.colorOptions.some(c => {
        const colorNameMatch = c.name.toLowerCase().includes(color.name.toLowerCase());
        const hexCodeMatch = c.hexCode.toLowerCase() === color.hexCode.toLowerCase();
        return colorNameMatch || hexCodeMatch;
      });
    });
  };
  
  // Efecto separado para aplicar el filtro de color cuando cambie
  useEffect(() => {
    if (allProducts.length > 0) {
      const filteredData = applyColorFilter(allProducts, selectedColor);
      setProducts(filteredData);
      setResultsCount(filteredData.length);
    }
  }, [selectedColor, allProducts]);
  
  // Función para limpiar la búsqueda
  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedColor(null);
  };
  
  // Función para alternar la visibilidad de los filtros
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Función para aplicar filtro de color
  const handleColorFilter = (color) => {
    setSelectedColor(color);
  };
  
  // Función para cerrar filtros
  const handleCloseFilters = () => {
    setShowFilters(false);
  };
  
  return (
    <div className="product-list">
      <div className="product-list__search">
        <div className="product-list__search-container">
          <input
            type="text"
            placeholder="Search for a smartphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="product-list__search-input"
          />
          {(searchTerm || selectedColor) && (
            <ClearSearchIcon onClick={handleClearSearch} />
          )}
        </div>
        
        <div className="product-list__filters-row">
          <div className="product-list__results-count">
            {resultsCount} RESULTS {selectedColor && `(${selectedColor.name})`}
          </div>
          
          <button 
            className={`product-list__filter-button ${selectedColor ? 'active' : ''}`}
            onClick={toggleFilters}
          >
            FILTRAR
          </button>
        </div>
        
        {showFilters && (
          <ColorFilter 
            onFilter={handleColorFilter} 
            onClose={handleCloseFilters}
            selectedColor={selectedColor}
          />
        )}
      </div>
      
      {loading ? (
        <div className="product-list__loading">Loading products...</div>
      ) : error ? (
        <div className="product-list__error">{error}</div>
      ) : (
        <div className="product-list__grid">
          {products.map((product, index) => (
            <Link 
              to={`/product/${product.id}`} 
              key={`${product.id}-${index}`} 
              className="product-list__item"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;