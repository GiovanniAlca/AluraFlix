// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #000;
  color: white;
  text-align: center;
  padding: 20px;
  box-shadow: 5px 5px 20px rgba(255, 0, 0, 0.762); /* Sombra de color rojo */
  border-bottom: 2px solid #651415; /* Borde inferior rojo brillante */
`;

const Footer = () => {
  return <FooterContainer>&copy; 2025 Aluraflix</FooterContainer>;
};

export default Footer;
