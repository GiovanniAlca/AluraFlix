import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import VideoCard from './VideoCard';

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px 50px;
  border-radius: 8px;
  gap: 20px;

  @media (max-width: 768px) {
  padding: 0px;
}
`;

const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  background-color: ${({ category }) => categoryBackground(category)};;
  border: 1px solid ${({ category }) => categoryBackground(category)};
  padding: 10px 20px;
  margin: 0;
  text-align: center;
  justify-content: start;
  width: 450px;
  border-radius: 10px;

@media (max-width: 768px) {
  width: 100%;
}`;

const VideoList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto; /* Permite el desplazamiento horizontal */
  white-space: nowrap;
  gap: 10px;
  padding-bottom: 10px;
  width: 100%;

  

  /* 🔹 Estilo para navegadores basados en WebKit (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    height: 8px; /* Altura de la barra de desplazamiento */
  }

  &::-webkit-scrollbar-track {
    background: #1e1e1e; /* Color de fondo de la barra */
    border-radius: 10px; /* Bordes redondeados */
  }

  &::-webkit-scrollbar-thumb {
    background: #ffffff; /* Color del "thumb" (la parte que se mueve) */
    border-radius: 10px; /* Bordes redondeados */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ccc; /* Cambio de color al pasar el mouse */
  }

  /* 🔹 Estilos para Firefox */
  scrollbar-width: thin;
  scrollbar-color: #ffffff #1e1e1e; /* Color del thumb y del track */
`;


const categoryBackground = (category) => {
  const backgrounds = {
    "Kevin Karl": "#38461e",
    "Joji": "#451011",
    "Mon Laferte": "#e67d57",
    "Ed Maverick": "#548eab",
  };

  return backgrounds[category] || "#2c3e50";
};

const Category = ({ category }) => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    fetch('data/bd.json') // Ruta correcta del archivo JSON
      .then((response) => response.json())
      .then((data) => setVideoData(data)) // Guardar todos los datos
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []); // Solo se ejecuta una vez al montar el componente

  const onUpdate = (categoriaId, videoId, updatedData) => {
    fetch(`http://localhost:3001/videos/${categoriaId}/${videoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Video actualizado correctamente");
        // Aquí tu lógica de actualización en localStorage
      })
      .catch((error) => {
        alert("Error al actualizar el video");
      });
  };

  return (
    <CategoryContainer>
      <CategoryTitle category={category.categoria}>
        {category.categoria}
      </CategoryTitle>
      <VideoList>
        {category.videos?.length > 0 ? (
          category.videos.map((video) => (
            <VideoCard
  key={video.id}
  video={video}
  categoryColor={categoryBackground(category.categoria)}
  onUpdate={(updatedData) => onUpdate(category.id, video.id, updatedData)}
/>


          ))
        ) : (
          <p>No hay videos disponibles.</p>
        )}
      </VideoList>
    </CategoryContainer>
  );
};

export default Category;
