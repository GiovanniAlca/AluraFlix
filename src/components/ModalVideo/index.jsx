import React, { useState } from "react";
import styled from "styled-components";

// Estilos para el modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: all;
`;

const ModalContent = styled.div`
  background: #000000;
  padding: 30px;
  border: solid white;
  border-radius: 10px;
  width: 80%;
  max-width: 800px;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #be3a3a;
  }
`;

const ModalVideo = ({ isOpen, onClose, video={} }) => {
    if (!isOpen) return null;

    // Imprimir el valor de video.video para depuración
    console.log('video.video:', video.video);

    const [loading, setLoading] = useState(true);

    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          {loading && <p style={{ color: 'white' }}>Cargando...</p>}
          <iframe
            width="100%"
            height="315"
            src={video.video}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setLoading(false)} // Ocultar loader al cargar
          ></iframe>
        </ModalContent>
      </ModalOverlay>
    );
};


export default ModalVideo;
