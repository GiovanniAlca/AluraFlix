import React, { useState } from "react";
import { CardContainer, Thumbnail, VideoInfo, ButtonContainer, Button } from "./styles";
import Modal from "../../Modal/Modal";

const VideoCard = ({ video, categories }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(""); // Estado para determinar la acción del modal
  
    const category = categories ? categories.find(cat => cat.id === video.categoriaId) : null;

    const openModal = (action) => {
      setModalAction(action);  // Establecer la acción (Eliminar o Actualizar)
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setModalAction("");  // Resetear la acción al cerrar el modal
    };
  
    return (
      <>
        <CardContainer categoryColor={video.categoryColor}> {/* Aquí pasamos categoryColor */}
          <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
            <Thumbnail src={video.imagen} alt={video.titulo} />
          </a>
          <VideoInfo>
            <h3>{video.titulo}</h3>
          </VideoInfo>
          <ButtonContainer>
            <Button onClick={() => openModal("Eliminar")}>Eliminar</Button>
            <Button onClick={() => openModal("Actualizar")}>Actualizar</Button>
          </ButtonContainer>
        </CardContainer>
  
        {/* Colocamos el Modal fuera de la jerarquía de la tarjeta */}
        <Modal isOpen={isModalOpen} onClose={closeModal} video={video} action={modalAction} />
      </>
    );
};

export default VideoCard;
