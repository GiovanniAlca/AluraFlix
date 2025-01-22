// src/components/Category/index.jsx
import React from 'react';
import styled from 'styled-components';
import VideoCard from './VideoCard'; // Asegúrate de que VideoCard esté bien importado

// Estilo para el contenedor de la categoría
const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px 100px;
  border-radius: 8px;  // Bordes redondeados
  align-items: center;
  gap: 20px;
`;

// Estilo para el título de la categoría
const CategoryTitle = styled.h2`
  font-size: 2rem;
  color: #fff;  // Texto blanco
  border: 1px solid ${({ category }) => categoryBackground(category)};  // Fondo de color para el título
  padding: 10px 20px;  // Un poco de relleno alrededor del título
  margin: 0;  // Eliminar el margen por defecto
  text-align: center;  // Centrar el título
  width:300px;
  border-radius: 10px;
`;

// Estilo para la lista de videos
const VideoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-around;  // Distribuye los videos uniformemente
`;

// Define los colores de fondo para los títulos de cada categoría
const categoryBackground = (category) => {
  const backgrounds = {
    "Kevin Karl": "#38461e", // Un color de fondo por categoría
    "Joji": "#451011",
    "Mon Laferte": "#e67d57",
    "Ed Maverick": "#548eab",
    // Agrega más categorías aquí
  };
  
  return backgrounds[category] || "#2c3e50"; // Valor por defecto si no hay coincidencia
};

const Category = ({ category }) => {
  return (
    <CategoryContainer>
      <CategoryTitle category={category.categoria}>
        {category.categoria}
      </CategoryTitle> {/* Título con fondo de color y texto blanco */}
      <VideoList>
        {category.videos && category.videos.length > 0 ? (
          category.videos.map((video) => (
            <VideoCard key={video.id} video={video} /> // Usamos el id del video como key
          ))
        ) : (
          <p>No hay videos disponibles.</p>
        )}
      </VideoList>
    </CategoryContainer>
  );
};

export default Category;
