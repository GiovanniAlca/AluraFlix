import { useState, useEffect } from 'react';
import GlobalStyle from './components/GlobalStyle';
import Header from './components/Header';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Category from './components/Category';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddVideo from './pages/AddVideo';
import data from '/public/data/bd.json';  // Importa el archivo JSON directamente
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Asegúrate de que la ruta al archivo 'bd.json' sea correcta
    fetch('./public/data/bd.json') // La ruta al archivo JSON
      .then(response => response.json()) // Convertir la respuesta en un objeto JSON
      .then(data => {
        //console.log("Datos de bd.json:", data);
        setCategories(data); // Actualiza el estado con los datos
      })
      .catch(error => {
        console.error("Error al cargar el archivo JSON:", error);
      });
  }, []);
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home categories={categories} setCategories={setCategories}/>} />
        <Route path="/addvideo" element={<AddVideo />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
