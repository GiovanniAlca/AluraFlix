import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
  background-color: #262626;
  color: #c72323;
  width: 100%;
  z-index: 2;
  
  /* Borde inferior con sombra */
  box-shadow: 5px 5px 20px rgba(255, 0, 0, 0.762); /* Sombra de color rojo */
  border-bottom: 2px solid #651415; /* Borde inferior rojo brillante */

  /* Adaptación a pantallas pequeñas */
  @media (max-width: 768px) {
    padding: 15px 30px; /* Reducir el padding en pantallas pequeñas */
    flex-direction: row; /* Cambiar la dirección de los elementos a columna */
    align-items: flex-start; /* Alinear los elementos al inicio */
    align-content: center;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    padding: 10px 20px; /* Aún más pequeño el padding en pantallas muy pequeñas */
  }
`;

const Logo = styled.div`
  font-size: 2rem;

  /* Reducir el tamaño de la fuente en pantallas pequeñas */
  @media (max-width: 768px) {
    font-size: 1.5rem; /* Reducir tamaño de logo en móviles */
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px; /* Espaciado entre los botones */

  /* Adaptación a pantallas pequeñas */
  @media (max-width: 768px) {
    flex-direction: row; /* Colocar los enlaces en columna */
    gap: 5px; /* Reducir el espaciado entre los botones */
  }
`;

const StyledLink = styled(Link)`
  background-color: transparent;
  padding: 10px 20px;
  border: #c72323 solid;
  color: white;
  text-decoration: none; /* Elimina el subrayado del enlace */
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #c72323;
  }

  /* Ajustes de tamaño de fuente y padding en pantallas pequeñas */
  @media (max-width: 768px) {
    font-size: 0.9rem; /* Reducir el tamaño de la fuente */
    padding: 8px 16px; /* Reducir padding en dispositivos pequeños */
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Aluraflix</Logo>
      <NavLinks>
        {/* Enlace a la página de inicio */}
        <StyledLink to="/">Home</StyledLink>

        {/* Enlace a la página de agregar video */}
        <StyledLink to="/addvideo">Agregar Video</StyledLink>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
