import PropTypes from 'prop-types';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const { brand, name, imageUrl, basePrice } = product;
  
  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="product-card__info">
        <div className="product-card__brand">{brand}</div>
        <div className="product-card__name">{name}</div>
        <div className="product-card__price">{basePrice} EUR</div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    basePrice: PropTypes.number.isRequired
  }).isRequired
};

export default ProductCard;