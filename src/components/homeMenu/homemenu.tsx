import React from 'react';
import './homemenu.css';
import { Link } from 'react-router-dom';
import colddrinks from './images/iced-coffee-sugar-cubes-top-view.jpg';
import hotdrinks from './images/close-up-woman-serving-cop-coffee.jpg';
import breakfast from './images/oatmeal-plates-with-fruits-jam-sandwich-coffee_176474-6851.jpg';
import dessert from './images/piece-chocolate-cake-with-mint-chocolate-topping-lights-with-blurry-background_181624-16989.jpg';
import snacks from './images/club-sandwich-with-cheese-cucumber-tomato-smoked-meat-salami-served-with-french-fries_2829-19823.jpg';


const menuData = [
  {
    title: "Cold Drinks",
    description: "Refreshing cold beverages",
    image: colddrinks,
    imageFirst: true
  },
  {
    title: "Hot Beverages",
    description: "Warm and cozy drinks",
    image: hotdrinks,
    imageFirst: false
  },
  {
    title: "Breakfast",
    description: "Start your day right",
    image: breakfast,
    imageFirst: true
  },
  {
    title: "Dessert",
    description: "Sweet treats to enjoy",
    image: dessert,
    imageFirst: false
  },
  {
    title: "Snacks",
    description: "Tasty bites and more",
    image: snacks,
    imageFirst: true
  }
];

const HomeMenu = () => {
  return (
    <div className="meno">
      {menuData.map((item) => (
        <section className="menu-row" key={item.title}>
          {item.imageFirst && (
            <Link to="/menu" className="menu-box image-box">
              <img src={item.image} alt={item.title} />
            </Link>
          )}

          <div className="menu-box title-box">
            <h2>{item.title}</h2>
          </div>

          <div className="menu-boxx items-box">
            <p className="description">{item.description}</p>
          </div>

          {!item.imageFirst && (
            <Link to="/menu" className="menu-box image-box">
              <img src={item.image} alt={item.title} />
            </Link>
          )}
        </section>
      ))}
    </div>
  );
};

export default HomeMenu;
