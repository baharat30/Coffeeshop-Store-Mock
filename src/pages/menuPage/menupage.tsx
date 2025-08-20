import './menupage.css';
import { Link } from 'react-router-dom';

const HotDrinks = [
  { title: 'Tea', price: '20T' },
  { title: 'Espresso', price: '40T' },
  { title: 'Coffee', price: '50T' },
  { title: 'Hot Chocolate', price: '50T' },
];

const ColdDrinks = [
  { title: 'Ice Tea', price: '25T' },
  { title: 'Lemonade', price: '35T' },
  { title: 'Mojito', price: '45T' },
  { title: 'Strawberry Smoothie', price: '50T' },
  { title: 'Mango Smoothie', price: '70T' },
  { title: 'Chocolate Smoothie', price: '40T' },
];

const Desserts = [
  { title: 'Chocolate Cake', price: '40T' },
  { title: 'Waffles', description: 'can include ice cream and nutella toppings', price: '80T' },
  { title: 'Cheesecake', price: '50T' },
  { title: 'Tiramisu', price: '60T' },
  { title: 'Carrot Cake', description: 'includes Walnuts', price: '50T' },
  { title: 'Lemon Cake', price: '45T' },
];

const Snacks = [
  { title: 'Classic French Fries', price: '90T' },
  { title: 'Caesar Salad', price: '150T' },
  { title: 'Vegetarian Panini', price: '80T' },
  { title: 'BBQ Chicken Panini', price: '120T' },
  { title: 'Steak & Cheese Panini', price: '145T' },
];

const Breakfast = [
  { title: 'Traditional Persian Breakfast', price: '160T' },
  { title: 'English breakfast', description: 'Eggs, Finger Sausages, Pancakes and Beans', price: '200T' },
  { title: 'Pancakes', price: '80T' },
  { title: 'Fruit Salad', description: 'includes Seasonal fruits', price: '85T' },
];

function MenuPage() {
  return (

    <div className="menu-page">
      <h1>Cafe Menu</h1>
      <div className="menu-section">
        <h2>Cold Drinks</h2>
        <div className="menu-list">
          {ColdDrinks.map((item, index) => (
            <div className="menu-item" key={index}>
              <div className="item-text">
                <h3>{item.title}</h3>
              </div>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="menu-section">
        <h2>Hot Drinks</h2>
        <div className="menu-list">
          {HotDrinks.map((item, index) => (
            <div className="menu-item" key={index}>
              <div className="item-text">
                <h3>{item.title}</h3>
              </div>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="menu-section">
        <h2>Desserts</h2>
        <div className="menu-list">
          {Desserts.map((item, index) => (
            <div className="menu-item" key={index}>
              <div className="item-text">
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </div>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="menu-section">
        <h2>Snacks</h2>
        <div className="menu-list">
          {Snacks.map((item, index) => (
            <div className="menu-item" key={index}>
              <div className="item-text">
                <h3>{item.title}</h3>
              </div>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="menu-section">
        <h2>Breakfast</h2>
        <div className="menu-list">
          {Breakfast.map((item, index) => (
            <div className="menu-item" key={index}>
              <div className="item-text">
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </div>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      </div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button style={{
          backgroundColor: "#f4c2c2",
          color: "#3d0808",
          border: "none",
          borderRadius: "8px",
          padding: "6px 10px",
          fontSize: "12px",
          cursor: "pointer",
          marginBottom: "20px"
        }}>
          back to Home Page
        </button>
      </Link>
    </div>
  );
}

export default MenuPage;
