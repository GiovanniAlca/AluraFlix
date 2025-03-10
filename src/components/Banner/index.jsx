import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import bdData from '/public/data/bd.json';

const BannerContainer = styled.div`
  position: relative; /* Cambio aquí */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 100px;
  width: 100%;
  height: 500px;
  color: white;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    height: 500px;
  }
`;

const ContenedorDescripcion = styled.div`
  position: absolute; /* Cambio de fixed a absolute */
  top: 35%; /* Ajusta la posición según lo necesites */
  left: 200px; /* Puedes ajustar esto para moverlo más a la izquierda o derecha */
  width: 300px; /* Ajusta el tamaño si es necesario */
  color: white;

  @media (max-width: 768px) {
    left: 30px;
    top: 60%;
  }
`;



const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  z-index: 0;
`;

const VideoDescription = styled.div`
  z-index: 2;
  flex: 1 1 0%;

  @media (max-width: 768px) {
    width: 300px;
    height: 200px;
    text-align: center;
    justify-content: centers;
  }
`;

const ContenedorCarrusel = styled.div`
  z-index: 2;
  display: flex;
  width: max-content;
  align-items: center;
`;

const ContenedorVideo = styled.div`
  display: flex;
  border-radius: 20px;
  margin: 10px;
  width: 550px;
  height: 300px;
  overflow: hidden;
  display: block;
  object-fit: cover;
  
  img {
    width: 550px;
    height: 300px;
    object-fit: cover;
    border-radius: 25px;
    border: 5px solid ${({ category }) => categoryBackground(category)};
  box-shadow: 0 4px 15px ${({ category }) => categoryBackground(category)};
  }

  @media (max-width: 900px) {
    width: 300px;
    height: 200px;
    left: 100px;
    img {
    width: 100%;
    height: 150px;
  }
}
`;

const CategoryBadge = styled.span`
  background-color: ${({ category }) => categoryBackground(category)};
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 1.2rem;
  margin-bottom: 10px;
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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setVideos(bdData);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videos.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  const transitions = useTransition(currentIndex, {
    key: currentIndex,
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(-100%)' },
    config: {
      tension: 10000,
      friction: 50,
      duration: window.innerWidth <= 768 ? 500 : 1000, // Ajusta la duración según el tamaño de la pantalla
    },
  });
  
  

  const video = videos[currentIndex]?.videos[1];
  const videoId = video ? video.video.split('/')[4] : '';
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <BannerContainer>
        <BackgroundImage  backgroundImage={thumbnailUrl} />

      
      <VideoDescription>
        <ContenedorDescripcion>
          <animated.div >
            <CategoryBadge category={videos[currentIndex]?.categoria}>
              {videos[currentIndex]?.categoria}
            </CategoryBadge>
            <ArtistName>{video?.titulo}</ArtistName>
            <Descripcion>{video?.descripcion}</Descripcion>
          </animated.div>
        </ContenedorDescripcion>
      </VideoDescription>

      <ContenedorCarrusel>
        {transitions((style, item) => (
          <animated.div style={style}>
            <ContenedorVideo key={item} category={videos[item]?.categoria}>
              <img
                src={`https://img.youtube.com/vi/${videos[item]?.videos[1]?.video.split('/')[4]}/hqdefault.jpg`}
                alt={videos[item]?.videos[1]?.titulo}
              />
            </ContenedorVideo>
          </animated.div>
        ))}
      </ContenedorCarrusel>

      <ArrowButton left onClick={goToPrev}>←</ArrowButton>
      <ArrowButton onClick={goToNext}>→</ArrowButton>
    </BannerContainer>
  );
};

export default Banner;