// src/pages/Home.jsx
import React from 'react';
import Banner from '../components/Banner';
import Category from '../components/Category';
import Footer from '../components/Footer';
import Modal from '../components/Modal/Modal';

const Home = ({ categories }) => {
  console.log('Categorías recibidas:', categories); // Verifica qué contiene categories
  
  return (
    <>
      {/* Banner */}
      <Banner categories={categories} />
      
      {/* Sección de Categorías */}
      <div >
        {categories.length > 0 ? (
          categories.map((category) => (
            <Category key={category.categoria} category={category} categories={categories} />
          ))
        ) : (
          <p>No hay categorías disponibles.</p>
        )}
      </div>

      {/* Modal */}
      <Modal categories={categories} />
    </>
  );
};

export default Home;
