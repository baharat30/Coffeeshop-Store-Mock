import { Link } from 'react-router-dom';
import './shoppage.css';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Espresso, Grinder, Coffee, Accessories } from '../../data/shopitems';
import { Product } from '../../data/product';

function ShopPage() {
    const [selectedColors, setSelectedColors] = useState<{
        [productId: number]: { name: string; image: string }
    }>({});

    const { addToCart } = useCart();

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

    const renderProduct = (item: Product) => (
        <div key={item.id} className="myshop-product">
            <Link to={`/product/${item.id}?color=${selectedColors[item.id]?.name || ''}`}>
                <img src={selectedColors[item.id]?.image || item.image} alt={item.title} />
            </Link>
            <h3 className="product-title">{item.title}</h3>
            <p className="product-description">{item.description}</p>
            <span>{Number(item.price).toLocaleString()} Toman</span>

            {item.colors && (
                <div className="my-color-list">
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
    );

    return (
        <div className="myshop-container">
            <h1>Welcome to Your Coffee Corner</h1>

            <section>
                <h2>Espresso Machines</h2>
                <div className="products-wrapper">
                    {Espresso.map(renderProduct)}
                </div>
            </section>

            <section>
                <h2>Coffee Grinders</h2>
                <div className="products-wrapper">
                    {Grinder.map(renderProduct)}
                </div>
            </section>

            <section>
                <h2>Coffee Beans</h2>
                <div className="products-wrapper">
                    {Coffee.map(renderProduct)}
                </div>
            </section>

            <section>
                <h2>Accessories</h2>
                <div className="products-wrapper">
                    {Accessories.map(renderProduct)}
                </div>
            </section>


            <Link to="/cart">
                <button className="cartBb">Shopping Cart</button>
            </Link>
        </div>
    );
}

export default ShopPage;
