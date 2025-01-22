// src/styles/globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #130809;
    color: #333;
    min-height: 100vh; /* Asegura que el body ocupe al menos el 100% de la altura de la pantalla */
    display: flex;
    flex-direction: column; /* Aplica un diseño de columna */
}

  #root {
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* Permite que el contenido crezca para llenar el espacio disponible */
  }
`;

export default GlobalStyle;
