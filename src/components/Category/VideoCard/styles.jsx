import styled from 'styled-components';

// Contenedor de la tarjeta con bordes redondeados, sombra y borde dinámico según la categoría
export const CardContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  width: 350px;
  height: 200px;  // Se ajustó la altura del card para mejor distribución
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  border: 1px solid ${({ categoryColor }) => categoryColor || "#ffffff"};
  transition: transform 0.3s ease-in-out;
  position: relative; // Para posicionar los elementos dentro
  &:hover {
    transform: scale(1.05); // Efecto de zoom al pasar el ratón
    z-index: 1;  // Asegura que el contenedor se muestre por encima al hacer hover
  }
  @media (max-width: 768px) {
    width: 300px;
    height: 190px;
  }
`;

// Miniatura del video (thumbnail), ocupando todo el card
export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;  // La imagen ahora ocupará todo el tamaño del card
  object-fit: cover; // Para ajustar la imagen sin distorsionarla
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; // Coloca la imagen detrás del contenido
`;

// Información del video (título)
export const VideoInfo = styled.div`
  padding: 15px;
  color: white;
  z-index: 1; // Asegura que el contenido esté por encima de la imagen
  position: absolute;
  top: 110px; // Ajuste para mejor posicionamiento
  left: 10px;
  right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;  // Para que ocupe todo el alto disponible en el contenedor
  h3 {
    font-size: 1.2rem;
    margin: 0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 1; // Los botones estarán por encima de la imagen
  position: absolute; // Coloca los botones en una posición absoluta
  bottom: 0;  // Coloca los botones en la parte inferior del card
  width: 100%; // Asegura que ocupe todo el ancho del card
`;

// Botones con un estilo atractivo
export const Button = styled.button`
  background-color: black; // Color negro para los botones
  color: white;
  border: none;
  padding: 10px 0; // Ajuste en el padding para que ocupe todo el alto disponible
  font-size: 1.2rem;
  // Solo un borde en la parte inferior
  border-radius: 0;  // Redondea solo las esquinas inferiores
  cursor: pointer;
  flex: 1; // Hace que ambos botones ocupen el mismo espacio y dividan el ancho disponible
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;  // Añado transición para el borde también
  
  &:hover {
    background-color: #333; // Se puede poner un color más visible en el hover
  // Cambia el color del borde inferior en hover
  }
  
  &:active {
    transform: scale(0.98); // Efecto de presionar el botón
  }
  
  &:first-child {
    margin-right: 0;  // Eliminar margen si se quiere que ocupen todo el espacio
  }
`;
