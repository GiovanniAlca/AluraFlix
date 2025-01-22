import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Overlay que cubre el fondo
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: all;
`;

// Contenido principal del Modal
const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
  border: 2px solid #4a90e2;
`;

// Botón de cierre
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
    color: #ff0000;
  }
`;

// Formulario
const Form = styled.div`
  margin-top: 20px;
`;

const InputLabel = styled.label`
  display: block;
  font-weight: bold;
  margin: 10px 0 5px;
  text-align: left;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f9f9f9;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const SubmitButton = styled.button`
  background-color: #4a90e2;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  
  &:hover {
    background-color: #357ab7;
  }
`;

// Botón con colores diferentes para actualizar y eliminar
const ActionButton = styled.button`
  background-color: ${(props) => (props.danger ? "#d9534f" : "#0275d8")};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.danger ? "#c9302c" : "#025aa5")};
  }
`;

const Modal = ({ isOpen, onClose, video = {}, action, categories = [], onDelete, onUpdate }) => {
  const [titulo, setTitulo] = useState(video.titulo || "");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState(video.descripcion || "");
  const [imagen, setImagen] = useState(video.imagen || "");
  const [videoUrl, setVideoUrl] = useState(video.video || "");
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  // Cargar categorías si están disponibles
  useEffect(() => {
    if (categories.length > 0) {
      setCategoriesLoaded(true);
      if (!categoria && categories.length > 0) {
        setCategoria(categories[0].categoria);  // Asigna la primera categoría disponible
      }
    }
  }, [categories]);

  // Manejo del cambio de input
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  // Enviar formulario (para actualizar o eliminar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !categoria || !descripcion || !imagen || !videoUrl) {
      alert('Todos los campos son obligatorios.');
      return;
    }
    // Lógica de actualización o eliminación
    if (action === "Actualizar") {
      onUpdate({ titulo, categoria, descripcion, imagen, videoUrl });
    } else if (action === "Eliminar") {
      onDelete(video.id); // Si está eliminando
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>{action === "Actualizar" ? "Actualizar Video" : "Eliminar Video"}</h2>
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
                onChange={(e) => handleInputChange(e, setCategoria)}
                style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
              >
                <option value="">Seleccione una categoría</option>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.categoria}>
                      {cat.categoria}
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
              {imagen && <img src={imagen} alt="thumbnail" style={{ width: "100%", marginTop: "10px" }} />}

              <InputLabel>Video URL</InputLabel>
              <InputField
                value={videoUrl}
                onChange={(e) => handleInputChange(e, setVideoUrl)}
                type="text"
              />
              {videoUrl && (
                <video width="100%" controls>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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
