// src/components/Category/CategoryList.jsx
import React from 'react';
import Category from './Category';

const CategoryList = () => {
  const videosKevinKarl = [
    { title: 'Video 1 de Kevin Karl', description: 'Descripción del video 1', thumbnail: 'https://via.placeholder.com/250x200?text=KevinKarl1' },
    { title: 'Video 2 de Kevin Karl', description: 'Descripción del video 2', thumbnail: 'https://via.placeholder.com/250x200?text=KevinKarl2' },
    { title: 'Video 3 de Kevin Karl', description: 'Descripción del video 3', thumbnail: 'https://via.placeholder.com/250x200?text=KevinKarl3' },
  ];

  const videosJoji = [
    { title: 'Video 1 de Joji', description: 'Descripción del video 1', thumbnail: 'https://via.placeholder.com/250x200?text=Joji1' },
    { title: 'Video 2 de Joji', description: 'Descripción del video 2', thumbnail: 'https://via.placeholder.com/250x200?text=Joji2' },
    { title: 'Video 3 de Joji', description: 'Descripción del video 3', thumbnail: 'https://via.placeholder.com/250x200?text=Joji3' },
  ];

  const videosMonLaferte = [
    { title: 'Video 1 de Mon Laferte', description: 'Descripción del video 1', thumbnail: 'https://via.placeholder.com/250x200?text=MonLaferte1' },
    { title: 'Video 2 de Mon Laferte', description: 'Descripción del video 2', thumbnail: 'https://via.placeholder.com/250x200?text=MonLaferte2' },
    { title: 'Video 3 de Mon Laferte', description: 'Descripción del video 3', thumbnail: 'https://via.placeholder.com/250x200?text=MonLaferte3' },
  ];

  return (
    <div>
      <Category title="Kevin Karl" videos={videosKevinKarl} />
      <Category title="Joji" videos={videosJoji} />
      <Category title="Mon Laferte" videos={videosMonLaferte} />
    </div>
  );
};

export default CategoryList;
