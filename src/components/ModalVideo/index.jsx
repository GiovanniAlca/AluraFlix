import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
`;

const ModalContent = styled.div`
  background: #000000;
  padding: 30px;
  border: 3px solid ${({ categoryColor }) => categoryColor || "#2c3e50"};
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
  color: white;

  &:hover {
    color: #be3a3a;
  }
`;

const ModalVideo = ({ isOpen, onClose, video = {}, categoryColor }) => {
  // ✅ useState SIEMPRE debe ejecutarse, incluso si el modal está cerrado.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null; // ✅ Ahora todos los hooks se ejecutan antes de este return.

  const videoSrc = video.video || ""; // Asegurar que no sea undefined
  console.log("URL del video:", videoSrc);

  return (
    <ModalOverlay>
      <ModalContent categoryColor={categoryColor}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {loading && <p style={{ color: "white" }}>Cargando...</p>}
        {videoSrc ? (
          <iframe
            width="100%"
            height="380"
            src={videoSrc}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setLoading(false)}
          ></iframe>
        ) : (
          <p style={{ color: "red" }}>Error: No se pudo cargar el video.</p>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalVideo;
