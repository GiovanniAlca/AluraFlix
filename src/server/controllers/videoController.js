import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtén la ruta del archivo actual y luego calcula la ruta del directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, '../data/bd.json');

// Validación de datos recibidos
const validateVideoData = ({ category, imageUrl, videoUrl, description }) => {
  if (!category || !imageUrl || !videoUrl || !description) {
    return 'Todos los campos son obligatorios';
  }
  return null;
};

// Resto del código...
const createVideo = (req, res) => {
  const { category, imageUrl, videoUrl, description } = req.body;

  // Validar datos
  const validationError = validateVideoData(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo' });
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).json({ error: 'Error al parsear el archivo JSON' });
    }

    const newVideo = { category, imageUrl, videoUrl, description };
    jsonData.videos.push(newVideo);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al guardar el video' });
      }

      res.status(201).json({ message: 'Video agregado exitosamente', video: newVideo });
    });
  });
};

export { createVideo };
