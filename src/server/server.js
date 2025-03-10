const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(express.json()); // Permite trabajar con JSON en las solicitudes

app.post('/update-video', (req, res) => {
  const { video } = req.body;  // Video actualizado recibido en el cuerpo de la solicitud

  // Leer el archivo bd.json
  fs.readFile('./public/data/bd.json', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer el archivo');
    }

    let videos = JSON.parse(data);  // Convertir el JSON en un objeto

    // Aquí debes encontrar y actualizar el video que coincide con el ID o algún campo único
    const videoIndex = videos.findIndex((v) => v.videoUrl === video.videoUrl);
    if (videoIndex >= 0) {
      videos[videoIndex] = video;  // Actualizar el video
    }

    // Guardar el archivo con los cambios
    fs.writeFile('./public/data/bd.json', JSON.stringify(videos, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error al escribir el archivo');
      }
      res.send('Video actualizado con éxito');
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
