import React, { useState, useEffect } from 'react';
import "./Recommendation.css"
import ProductGraph from '../ProductGraph/ProductGraph';

import { formatString } from '../../utilities/utilFunctions'

const Carousel = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? products.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    // console.log(products)
  }, [])

  return (
    <div className="carousel">
      <button className='btn btn-primary slider-buttons' onClick={prevSlide}>Previous</button>
      <div className="carousel-container">
        <div
          className="carousel-slider"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {products.map((product, index) => (
            <div key={index} className="carousel-slide">
              <img src={product.image} alt={product.name} />
              <h3>{formatString(product.name)}</h3>
              <h4>{product.type}</h4>
              <div>
                <ProductGraph 
                  strain={[product, index]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className='btn btn-primary slider-buttons' onClick={nextSlide}>Next</button>
    </div>
  );
};

export default Carousel;