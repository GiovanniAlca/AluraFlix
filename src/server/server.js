// Importar Express y CORS
const express = require('express');
const cors = require('cors');  // Importa el middleware de CORS
const app = express();
const port = 5000;

// Usar CORS para permitir solicitudes desde cualquier origen
app.use(cors());  // Este código permite CORS para todas las rutas y orígenes.

// Si necesitas configuraciones específicas de CORS, puedes hacerlo así:
// app.use(cors({
//   origin: 'http://localhost:3000',  // Permite solo solicitudes desde este origen
// }));

// Middleware para manejar JSON en el cuerpo de las solicitudes
app.use(express.json());

// Definir la ruta que maneja la solicitud POST
app.post('/add-video', (req, res) => {
  const { category, imageUrl, videoUrl, description } = req.body;
  
  // Verificación simple para asegurarse de que los datos estén completos
  if (!category || !imageUrl || !videoUrl || !description) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Aquí podrías procesar los datos (por ejemplo, guardarlos en la base de datos)
  res.status(200).json({ message: 'Video agregado con éxito' });
});

// Arrancar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
