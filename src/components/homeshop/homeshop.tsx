import { useState } from 'react';
import React from 'react';
import { useEffect } from 'react';
import beans from './images/pexels-photo-4820813.webp';
import powder from './images/pexels-photo-4507860.jpeg';
import gear from './images/gear.jpg';
import machines from './images/pexels-charlotte-may-5825346.jpg';
import './homeshop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons';


const images = [beans, gear, machines];

export default function HomeShop() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrent(prev => (prev + 1) % images.length);
        }, 3000); 
        return () => clearInterval(interval); 
      }, []);
      
    const nextSlide = () => {
        setCurrent((current + 1) % images.length)
    };

    const prevSlide = () => {
        setCurrent((current - 1 + images.length) % images.length)
    };

    return (
        <>
        <div className='slideshow-container'>
            <img
                src={images[current]}
                alt={`Slide ${current}`}
                style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
            <div className="text">
        <h2 className='titrSlide'>Shop with Ease, Style, and Savings!</h2>
     <p className='matnSlide'>
     Why wait? Uncover amazing products at unbeatable prices. Click the link and start shopping now!</p>
        <a className='linkSlide' href="/shop">Shop Now</a>
            </div>
            {/* <div style={{ marginTop: '10px' }}>
                <button onClick={nextSlide} className='next'><FontAwesomeIcon icon={faCircleRight} /></button>
                <button onClick={prevSlide} className='prev'><FontAwesomeIcon icon={faCircleLeft} /></button>
            </div> */}
        </div>

      </>
    )
}
