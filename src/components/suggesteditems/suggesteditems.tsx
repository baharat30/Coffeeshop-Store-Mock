import React, { useState } from 'react';
import { Product } from '../../data/product';
import './suggesteditems.css';
import { Link } from 'react-router-dom';

type SuggestedItemsProps = {
  items: Product[];
  addToCart: (item: Product) => void;
};

const SuggestedItems: React.FC<SuggestedItemsProps> = ({ items, addToCart }) => {
  const [selectedColors, setSelectedColors] = useState<{
    [productId: number]: { name: string; image: string };
  }>({});

  const handleColorSelect = (productId: number, color: { name: string; image: string }) => {
    setSelectedColors(prev => ({ ...prev, [productId]: color }));
  };

  const handleAddToCart = (item: Product) => {
    const selectedColor = selectedColors[item.id];
    const updatedItem = {
      ...item,
      selectedImage: selectedColor?.image || item.image,
      colorKey: selectedColor?.name || 'default',
    };
    addToCart(updatedItem);
  };

  return (
    <div className="shopitems">
      <h2 className="shopitems-title">You Might Also Like</h2>
      <div
        className="shopitems-scroll"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        {items.map(item => (
          <div key={item.id} className="shop-item">
            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={selectedColors[item.id]?.image || item.image}
                alt={item.title}
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h3>{item.title}</h3>
            </Link>
            <span>{item.price.toLocaleString()} Toman</span>

            {item.colors && (
              <div className="color-options">
                {item.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => handleColorSelect(item.id, color)}
                    className="color-dot"
                    style={{
                      backgroundColor: color.code,
                      border:
                        selectedColors[item.id]?.name === color.name
                          ? '2px solid black'
                          : 'none',
                    }}
                    title={color.name}
                  ></button>
                ))}
              </div>
            )}

            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedItems;
