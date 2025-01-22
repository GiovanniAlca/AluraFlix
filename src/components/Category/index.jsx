import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import VideoCard from './VideoCard'; // Asegúrate de que VideoCard esté bien importado

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px 100px;
  border-radius: 8px;
  align-items: center;
  gap: 20px;
  background-color: yellow;  /* Solo para ver si se está renderizando */
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  color: #fff;
  border: 1px solid ${({ category }) => categoryBackground(category)};
  padding: 10px 20px;
  margin: 0;
  text-align: center;
  width: 300px;
  border-radius: 10px;
  background-color: blue;  /* Solo para ver si se está renderizando */
`;


const VideoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-around;
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
    fetch('/data/bd.json') // Asegúrate de que la ruta es correcta
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos cargados:', data); // Verifica los datos cargados
        setVideoData(data);
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
      });
  }, []);
  
  

  return (
    <CategoryContainer>
      <CategoryTitle category={category.categoria}>
        {category.categoria}
      </CategoryTitle>
      <VideoList>
        {/* Verificar si category tiene videos y mapearlos */}
        {category.videos && category.videos.length > 0 ? (
  category.videos.map((video) => (
    <VideoCard key={video.id} video={video} />
  ))
) : (
  <p>No hay videos disponibles.</p>
)}

      </VideoList>
    </CategoryContainer>
  );
};

export default Category;
