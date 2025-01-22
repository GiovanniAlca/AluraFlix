// src/pages/Home.jsx
import React from 'react';
import Banner from '../components/Banner';
import Category from '../components/Category';
import Footer from '../components/Footer';
import Modal from '../components/Modal/Modal';

const Home = ({ categories }) => {
  return (
    <>
      {/* Banner */}
      <Banner categories={categories} />
      
      {/* Sección de Categorías */}
      <div style={{ padding: '20px' }}> {/* Agregar separación entre el banner y las categorías */}
        {categories.map((category) => (
          <Category key={category.categoria} category={category} categories={categories} />
        ))}
      </div>

      {/* Modal */}
      <Modal categories={categories} />

    </>
  );
};

export default Home;
