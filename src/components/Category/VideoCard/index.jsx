import React, { useState, useEffect } from "react";
import { CardContainer, Thumbnail, VideoInfo, ButtonContainer, Button } from "./styles";
import Modal from "../../Modal/Modal";
import ModalVideo from "../../ModalVideo";  // Modal específico para el video
import bdJson from "../../../../public/data/bd.json";  // Asegúrate de importar correctamente tu JSON

const VideoCard = ({ video }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);  // Estado para el modal de video
    const [modalAction, setModalAction] = useState("");  // Estado para determinar la acción del modal
    const [categories, setCategories] = useState([]);

    // Cargar las categorías desde el archivo bdJson
    useEffect(() => {
        const categoriesFromJson = bdJson.map(item => item.categoria);
        setCategories(categoriesFromJson);
    }, []);  // Solo se ejecuta una vez al montar el componente

    // Buscar la categoría relacionada con el video
    const category = categories ? categories.find(cat => cat === video.categoria) : null;

    // Manejar la apertura del modal (Actualizar o Eliminar)
    const openModal = (action) => {
        setModalAction(action);  // Establecer la acción (Eliminar o Actualizar)
        setIsModalOpen(true);
    };

    // Manejar la apertura del modal del video
    const openVideoModal = () => {
        setIsVideoModalOpen(true);  // Abrir modal de video
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalAction("");  // Resetear la acción al cerrar el modal
    };

    const closeVideoModal = () => {
        setIsVideoModalOpen(false);  // Cerrar modal de video
    };

    return (
        <>
            <CardContainer categoryColor={category ? category.color : 'default'}>
                <Thumbnail 
                    src={video.imagen} 
                    alt={video.titulo}
                    onClick={openVideoModal}  // Hacer clic en la miniatura para abrir el modal de video
                />
                <VideoInfo>
                    <h3>{video.titulo}</h3>
                    {category && <p>{category}</p>}
                </VideoInfo>
                <ButtonContainer>
                    <Button onClick={() => openModal("Eliminar")}>Eliminar</Button>
                    <Button onClick={() => openModal("Actualizar")}>Actualizar</Button>
                </ButtonContainer>
            </CardContainer>

            {/* Modal de actualización o eliminación */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                video={video} 
                action={modalAction} 
                categories={categories} 
            />

            {/* Modal del reproductor de video */}
            <ModalVideo 
                isOpen={isVideoModalOpen} 
                onClose={closeVideoModal} 
                video={video}  // Pasamos la URL del video
            />
        </>
    );
};

export default VideoCard;
