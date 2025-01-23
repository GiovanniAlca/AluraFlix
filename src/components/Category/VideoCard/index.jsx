import React, { useState, useEffect } from "react";
import { CardContainer, Thumbnail, VideoInfo, ButtonContainer, Button } from "./styles";
import Modal from "../../Modal/Modal";
import bdJson from "../../../../public/data/bd.json";  // Asegúrate de importar correctamente tu JSON

const VideoCard = ({ video }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(""); // Estado para determinar la acción del modal
    const [categories, setCategories] = useState([]);

    // Cargar las categorías desde el archivo bdJson
    useEffect(() => {
        const categoriesFromJson = bdJson.map(item => item.categoria);
        setCategories(categoriesFromJson);
    }, []);  // Solo se ejecuta una vez al montar el componente

    // Buscar la categoría relacionada con el video
    const category = categories ? categories.find(cat => cat === video.categoria) : null;

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
            <CardContainer categoryColor={category ? category.color : 'default'}> {/* Aquí pasamos el color de la categoría */}
                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Thumbnail src={video.imagen} alt={video.titulo} />
                </a>
                <VideoInfo>
                    <h3>{video.titulo}</h3>
                    {category && <p>{category}</p>} {/* Mostrar el nombre de la categoría */}
                </VideoInfo>
                <ButtonContainer>
                    <Button onClick={() => openModal("Eliminar")}>Eliminar</Button>
                    <Button onClick={() => openModal("Actualizar")}>Actualizar</Button>
                </ButtonContainer>
            </CardContainer>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} video={video} action={modalAction} categories={categories} />
        </>
    );
};

export default VideoCard;
