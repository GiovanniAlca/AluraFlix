import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring'; // Para la animación del carrusel

// Puedes cargar tu JSON desde un archivo local o API
import bdData from '/public/data/bd.json'; // Asumiendo que este es el archivo JSON con los datos

const BannerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 100px;
  width: 100%;
  height: 600px;
  color: white;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    display: flex;
    height: 500px;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-position: center;
  filter: blur(8px); /* Aplica el blur solo al fondo */
  z-index: 0; /* Pone el fondo detrás del contenido */
`;

const VideoDescription = styled.div`
  z-index: 2; /* Hace que el texto se muestre por encima del fondo */
  flex: 1;
  margin-left: 50px;
  margin-right: 50px;

  @media (max-width: 768px) {
    width: 300px;
    height: 200px;
    align-items: center;
    align-content: center;
    justify-content: center;
  }
`;

const ContenedorCarrusel = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease;
`;

const ContenedorVideo = styled.div`
  border-radius: 20px;
  margin: 10px;
  width: 600px;
  height: 340px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid ${({ category }) => categoryBackground(category)};
  box-shadow: 0 4px 15px ${({ category }) => categoryBackground(category)}; 

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 200px;
  }
`;

const CategoryBadge = styled.span`
  background-color: ${({ category }) => categoryBackground(category)};
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 1.2rem;
  margin-bottom: 10px;
  display: inline-block;
`;

const ArtistName = styled.h1`
  font-size: 2.5rem;
  color: white;
  padding: 10px 0px;
  margin: 0;
  width: 100%;
  border-radius: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ left }) => (left ? 'left: 20px;' : 'right: 20px;')}
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
  z-index: 3;
  transform: translateY(-50%);
`;

const Descripcion = styled.h3`
  margin: 20px 0px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 10px 0;
  }
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

const Banner = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    setVideos(bdData);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  const video = videos[currentIndex]?.videos[1]; // Solo el primer video del array
  const videoId = video ? video.video.split('/')[4] : '';
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <BannerContainer>
      <BackgroundImage backgroundImage={thumbnailUrl} />
      <VideoDescription>
        <CategoryBadge category={videos[currentIndex]?.categoria}>{videos[currentIndex]?.categoria}</CategoryBadge>
        <ArtistName>{video?.titulo}</ArtistName>
        <Descripcion>{video?.descripcion}</Descripcion>
      </VideoDescription>
      <ContenedorCarrusel>
        <ContenedorVideo category={videos[currentIndex]?.categoria}>
          <img src={thumbnailUrl} alt={video?.titulo} />
        </ContenedorVideo>
      </ContenedorCarrusel>

      <ArrowButton left onClick={goToPrev}>←</ArrowButton>
      <ArrowButton onClick={goToNext}>→</ArrowButton>
    </BannerContainer>
  );
};

export default Banner;
