import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Modal from "../../Modal/Modal";
import ModalVideo from "../../ModalVideo";

const VideoCard = ({ video, categoryColor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [categories, setCategories] = useState([]);
  const [bdJson, setBdJson] = useState([]);
  const [videoState, setVideoState] = useState(video);

  useEffect(() => {
    fetch("data/bd.json")
      .then((response) => response.json())
      .then((data) => {
        setBdJson(data);
        const categoriesFromJson = [...new Set(data.map((item) => item.categoria?.trim().toLowerCase()))];
        setCategories(categoriesFromJson);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;
    setVideoState((prev) => {
      const newCategoria = getValidCategory(prev.categoria);
      return prev.categoria !== newCategoria ? { ...prev, categoria: newCategoria } : prev;
    });
  }, [categories]);

  const getValidCategory = (categoria) => {
    const normalizedCategoria = categoria?.trim().toLowerCase();
    return categories.includes(normalizedCategoria) ? normalizedCategoria : "default";
  };

  const categoryBackground = useMemo(() => ({
    "kevin karl": "#38461e",
    "joji": "#451011",
    "mon laferte": "#e67d57",
    "ed maverick": "#548eab",
    "default": "#2c3e50",
  }), []);

  const backgroundColor = categoryBackground[videoState.categoria] || categoryBackground["default"];

  const openModal = (action) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const handleUpdate = (updatedData) => {
    let videos = JSON.parse(localStorage.getItem("videos")) || [];
    const videoIndex = videos.findIndex((v) => v.videoUrl === updatedData.videoUrl);
    if (videoIndex >= 0) videos[videoIndex] = updatedData;
    else videos.push(updatedData);
    localStorage.setItem("videos", JSON.stringify(videos));
    setVideoState({ ...updatedData, categoria: getValidCategory(updatedData.categoria) });
  };

  console.log("Color recibido en VideoCard:", categoryColor)
  return (
    <>
      <CardContainer categoryColor={categoryColor}>
        <Thumbnail src={videoState.imagen} alt={videoState.titulo} onClick={openVideoModal} />
        <VideoInfo>
          <h3>{videoState.titulo}</h3>
          {videoState.categoria && <p>{videoState.categoria}</p>}
        </VideoInfo>
        <ButtonContainer>
          <Button onClick={() => openModal("Eliminar")}>Eliminar</Button>
          <Button onClick={() => openModal("Actualizar")}>Actualizar</Button>
        </ButtonContainer>
      </CardContainer>
      <Modal isOpen={isModalOpen} onClose={closeModal} video={videoState} action={modalAction} categories={categories} onUpdate={handleUpdate} />
      <ModalVideo isOpen={isVideoModalOpen} onClose={closeVideoModal} video={videoState} onUpdate={handleUpdate} />
    </>
  );
};

export default VideoCard;

const CardContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  min-width: 400px;
  height: 250px;
  border: 3px solid ${({ categoryColor }) => categoryColor || "#2c3e50"};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  position: relative;

  &:hover {
    transform: scale(1.05);
    z-index: 1;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    min-width: 400px;
    height: 250px;
  }
`;


const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const VideoInfo = styled.div`
  padding: 15px;
  color: white;
  z-index: 1;
  position: absolute;
  top: 160px;
  left: 10px;
  right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  h3 {
    font-size: 1.2rem;
    margin: 0;
  }
  @media (max-width: 768px) {
    left: -5px;
    top: 160px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 1;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 0;
  font-size: 1.2rem;
  border-radius: 0;
  cursor: pointer;
  flex: 1;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #333;
  }
  &:active {
    transform: scale(0.98);
  }
`;
