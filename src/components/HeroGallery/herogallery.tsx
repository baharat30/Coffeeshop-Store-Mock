import React from 'react';
import './herogallery.css';
import coffee1 from '../HeroGallery/images/pexels-dilara-988605972-25627033.jpg';
import coffee2 from '../HeroGallery/images/top-view-female-barista-holding-cup-coffee.jpg';
import coffee3 from '../HeroGallery/images/pexels-tyler-hendy-9620-133553.jpg';

const HeroGallery = () => {
    return (
        <>
            <section className='hero-gallery'>
                <div className="image-gallery">
                    <div className='smallImg'>
                    <img src={coffee1} alt='coffee image 1'/>
                
                        <img src={coffee3} alt='coffee image 3' />  
                    </div>
                    <div className='bigImg'>
                    <img src={coffee2} alt='coffee image 2' />  
                    </div>
                </div>
            </section>

            <section className="hero-text">
                <p>
                    Each sip brings a new journey of taste...
                </p>
            </section>
            
        </>
    )
}

export default HeroGallery;
