// src/pages/Home.jsx
import React from 'react';
import Banner from '../components/Banner';
import Category from '../components/Category';
import Footer from '../components/Footer';
import Modal from '../components/Modal/Modal';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const Home = ({ categories }) => {
  return (
    <>
      {/* Pasamos las categorías a Banner como prop */}
      <Banner categories={categories} />
      
      {/* Renderizamos las categorías de forma individual */}
      {categories.map((category) => (
        <Category key={category.categoria} category={category} categories={categories} />
      ))}
      <Modal categories={categories} />
    </>
  );
};

export default Home;
