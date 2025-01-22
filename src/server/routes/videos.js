const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 5000;

app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud

app.post('/add-video', (req, res) => {
  const newVideo = req.body;

  // Aquí deberías agregar la lógica para guardar el video en un archivo o base de datos
  fs.readFile('bd.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al leer el archivo' });

    let videos;
    try {
      videos = JSON.parse(data); // Verifica si el archivo JSON está bien formado
    } catch (parseError) {
      return res.status(500).json({ error: 'Error al parsear el archivo JSON' });
    }

    videos.push(newVideo);

    fs.writeFile('bd.json', JSON.stringify(videos, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Error al guardar el archivo' });

      res.status(200).json({ message: 'Video agregado con éxito' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
