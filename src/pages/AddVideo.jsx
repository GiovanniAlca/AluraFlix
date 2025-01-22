import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';

// Para cargar las categorías desde el archivo JSON
import categoriesData from '/public/data/bd.json'; // Ajusta la ruta al archivo JSON

const PageContainer = styled.div`
  background-color: #121212; /* Fondo negro */
  color: white; /* Texto blanco */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 15px;
  align-self: flex-start;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 600px;
  background-color: #262626; /* Fondo gris oscuro */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.6);
`;

const Label = styled.label`
  font-size: 1.1rem;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #121212;
  border: 2px solid #aaa;
  border-radius: 5px;
  color: white;
  font-size: 1rem;

  &:focus {
    border-color: #0066cc; /* Azul brillante al hacer foco */
    outline: none;
  }

  &::placeholder {
    color: #aaa; /* Color de texto en los placeholders */
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #121212;
  border: 2px solid #aaa;
  border-radius: 5px;
  color: white;
  font-size: 1rem;

  &:focus {
    border-color: #0066cc;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #121212;
  border: 2px solid #aaa;
  border-radius: 5px;
  color: white;
  font-size: 1rem;

  &:focus {
    border-color: #0066cc;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #004d99;
  }
`;

const AddVideo = () => {
  const [videoData, setVideoData] = useState({
    category: '',
    imageUrl: '',
    videoUrl: '',
    description: '',
  });
  const [categories, setCategories] = useState([]);

  // Cargar categorías desde el archivo JSON
  useEffect(() => {
    // Extraemos solo las categorías
    const categoryList = categoriesData.map(category => category.categoria);
    setCategories(categoryList);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData({
      ...videoData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificación simple para asegurar que todos los campos estén completos
    if (!videoData.category || !videoData.imageUrl || !videoData.videoUrl || !videoData.description) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Realizar la solicitud POST para enviar los datos al backend
    fetch('http://localhost:5000/add-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(videoData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Éxito:', data);
        // Limpiar el formulario después de enviar los datos
        handleReset();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Ocurrió un error al guardar el video. Intente nuevamente.');
      });
  };

  const handleReset = () => {
    setVideoData({
      category: '',
      imageUrl: '',
      videoUrl: '',
      description: '',
    });
  };

  return (
    <PageContainer>
      <Title>NUEVO VIDEO</Title>
      <Text>Completa el formulario para agregar un nuevo video a la lista.</Text>

      <FormContainer onSubmit={handleSubmit}>
        <Subtitle>CREAR TARJETA</Subtitle>

        <Label htmlFor="category">Categoría</Label>
        <Select
          id="category"
          name="category"
          value={videoData.category}
          onChange={handleChange}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <Label htmlFor="imageUrl">Imagen (URL)</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={videoData.imageUrl}
          onChange={handleChange}
          placeholder="Ingresa la URL de la imagen"
        />

        <Label htmlFor="videoUrl">Video (URL)</Label>
        <Input
          id="videoUrl"
          name="videoUrl"
          value={videoData.videoUrl}
          onChange={handleChange}
          placeholder="Ingresa la URL del video"
        />

        <Label htmlFor="description">Descripción</Label>
        <TextArea
          id="description"
          name="description"
          value={videoData.description}
          onChange={handleChange}
          placeholder="Ingresa una breve descripción"
        />

        <div>
          <Button type="submit">Guardar</Button>
          <Button type="button" onClick={handleReset}>Limpiar</Button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default AddVideo;
