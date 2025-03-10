import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// Estilos del modal
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
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
  border: 2px solid #be3a3a;
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

const Form = styled.div`
  margin-top: 20px;
`;

const InputLabel = styled.label`
  display: block;
  font-weight: bold;
  margin: 10px 0 5px;
  text-align: left;
  color: white;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #be3a3a;
  border-radius: 5px;
  font-size: 14px;
  background-color: #000000;
  color: white;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #be3a3a;
  border-radius: 5px;
  font-size: 14px;
  background-color: #000000;
  resize: vertical;
  color: white;
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const H2 = styled.h2`
  color: white;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.danger ? "#ff4d4d" : "#4a90e2")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    opacity: 0.9;
  }
`;




const Modal = ({
  isOpen,
  onClose,
  video = {},
  action,
  categories = [],
  onDelete,
  onUpdate,
}) => {
  const [titulo, setTitulo] = useState(video.titulo || "");
  const [categoria, setCategoria] = useState(video.categoria || ""); // Asegúrate de que no sea "default"
  const [descripcion, setDescripcion] = useState(video.descripcion || "");
  const [imagen, setImagen] = useState(video.imagen || "");
  const [videoUrl, setVideoUrl] = useState(video.video || "");

  useEffect(() => {
    if (video.categoria) {
      console.log("Categoria del video:", video.categoria); // Verifica que la categoría esté llegando correctamente
      setCategoria(video.categoria);
    }
  }, [video]);


  
  
  
  console.log('Categoria seleccionada:', categoria);

  
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const validateForm = () => {
    if (!titulo || !categoria || !descripcion || !imagen || !videoUrl) {
      alert("Todos los campos son obligatorios.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    console.log("Categoria seleccionada al actualizar:", categoria);
  
    try {
      if (action === "Actualizar") {
        if (typeof onUpdate === "function") {
          onUpdate({ titulo, categoria, descripcion, imagen, videoUrl });
        } else {
          console.error("onUpdate is not a function");
        }
      } else if (action === "Eliminar") {
        if (typeof onDelete === "function") {
          onDelete(video.id);
        } else {
          console.error("onDelete is not a function");
        }
      }
    } catch (error) {
      console.error("Error al actualizar/eliminar:", error);
    }
  };
  
  const handleSave = () => {
    // Example of what you might do when updating the video
    const updatedVideo = { ...video, newTitle: "Updated Title" };  // Update the video data
    onUpdate(updatedVideo);  // Call the onUpdate function passed as a prop
  };  


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

  return (
    <ModalOverlay >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <H2>{action === "Actualizar" ? "Actualizar Video" : "Eliminar Video"}</H2>
        <Form>
          {action === "Actualizar" && (
            <>
              <InputLabel>Título</InputLabel>
              <InputField
                value={titulo}
                onChange={(e) => handleInputChange(e, setTitulo)}
                type="text"
              />
              <InputLabel>Seleccionar Categoría</InputLabel>
              <select
  value={categoria || ""}
  onChange={(e) => {
    const newCategoria = e.target.value;
    setCategoria(newCategoria);
    console.log("Categoria seleccionada:", newCategoria); // Verifica el valor seleccionado
  }}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: categoria ? "1px solid #be3a3a" : "1px solid #4a90e2",
    backgroundColor: "black",
    color: "white",
  }}
>
  <option value="">Seleccione una categoría</option>
  {categories.length > 0 ? (
    categories.map((cat, index) => (
      <option key={index} value={cat.categoria || cat}>
        {cat.categoria || cat}
      </option>
    ))
  ) : (
    <option value="">No hay categorías disponibles</option>
  )}
</select>

              <InputLabel>Descripción</InputLabel>
              <TextArea
                value={descripcion}
                onChange={(e) => handleInputChange(e, setDescripcion)}
              />
              <InputLabel>Imagen URL</InputLabel>
              <InputField
                value={imagen}
                onChange={(e) => handleInputChange(e, setImagen)}
                type="text"
              />
              {imagen && (
  <img 
    src={imagen} 
    alt="thumbnail" 
    style={{ 
      width: "100%", 
      marginTop: "10px", 
      display: "block", 
      marginLeft: "auto", 
      marginRight: "auto" 
    }} 
  />
)}
              <InputLabel>Video URL</InputLabel>
              <InputField
                value={videoUrl}
                onChange={(e) => handleInputChange(e, setVideoUrl)}
                type="text"
              />
              {videoUrl && (
  <iframe
    width="100%"
    height="315"
    src={videoUrl}
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    style={{
      display: "block",
      marginLeft: "auto",
      marginRight: "auto"
    }}
  ></iframe>
)}



            </>
          )}
          <ActionButton onClick={handleSubmit} danger={action === "Eliminar"}>
            {action === "Actualizar" ? "Actualizar Video" : "Eliminar Video"}
          </ActionButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
