// src/components/VideoList/index.jsx
import React, { useEffect, useState } from 'react';
import Category from '../Category'; // Asegúrate de que el componente Category está bien importado
import db from '../../db.json'; // Si estás usando un archivo json, asegúrate de que la ruta sea correcta

const VideoList = () => {
  const [groupedVideos, setGroupedVideos] = useState([]);

  useEffect(() => {
    // Agrupar los videos por categoría
    const grouped = db.reduce((acc, video) => {
      if (!acc[video.categoria]) {
        acc[video.categoria] = [];
      }
      acc[video.categoria].push(video);
      return acc;
    }, {});

    // Convertir el objeto agrupado a un arreglo para pasarlo como props
    const categories = Object.keys(grouped).map((categoryName) => ({
      categoria: categoryName,
      videos: grouped[categoryName],
    }));

    setGroupedVideos(categories); // Actualizamos el estado con los datos agrupados
  }, []);

  return (
    <div>
      {groupedVideos.length > 0 ? (
        groupedVideos.map((category) => (
          <Category key={category.categoria} category={category} />
        ))
      ) : (
        <p>No hay categorías disponibles.</p>
      )}
    </div>
  );
};

export default VideoList;
