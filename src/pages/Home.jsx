import React, { useState } from 'react';
import Banner from '../components/Banner';
import Category from '../components/Category';
import Footer from '../components/Footer';
import Modal from '../components/Modal/Modal';
import ModalVideo from '../components/ModalVideo';

const Home = ({ categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [video, setVideo] = useState({});

  const openModal = (videoData) => {
    setVideo(videoData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = (updatedData) => {
    // Recuperar los videos del localStorage
    let videos = JSON.parse(localStorage.getItem('videos')) || [];
  
    // Buscar y actualizar el video
    const videoIndex = videos.findIndex((v) => v.videoUrl === updatedData.videoUrl);
    if (videoIndex >= 0) {
      videos[videoIndex] = updatedData;  // Actualizar video
    }
  
    // Guardar los videos actualizados de nuevo en el localStorage
    localStorage.setItem('videos', JSON.stringify(videos));
  
    console.log('Video actualizado en localStorage:', updatedData);
  
    // Actualizar el estado para reflejar los cambios
    setVideo(updatedData);  // Asegúrate de que `setVideo` sea el setter adecuado para actualizar el estado
  };
  

  const handleDelete = (videoId) => {
    console.log("Deleted video with ID:", videoId);
    // Implement your delete logic here
  };

  return (
    <>
      {/* Banner */}
      <Banner categories={categories} />

      {/* Sección de Categorías */}
      <div>
        {categories.length > 0 ? (
          categories.map((category) => (
            <Category key={category.categoria} category={category} categories={categories} />
          ))
        ) : (
          <p>No hay categorías disponibles.</p>
        )}
      </div>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        video={video} 
        action="Actualizar" 
        categories={categories} 
        onDelete={handleDelete} 
        onUpdate={handleUpdate}  // Ensure onUpdate is passed here
      />

      <ModalVideo categories={categories} />
    </>
  );
};

export default Home;
