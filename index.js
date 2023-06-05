const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./api/models/user')

require('dotenv').config();

const app = express();
const port = 5500; 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;


app.listen(port, () => {
    console.log(`Servidor en ejecución en http://127.0.0.7:${port}`);
  });
  
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res)=>{
    res.send('init')
})
app.post('/guardar', (req, res) => {
    const { name, lastName, email, message } = req.body;
    const newUser = new User({ name, lastName, email, message });
  
    newUser.save()
      .then(() => {
        res.send('Usuario guardado correctamente');
      })
      .catch(error => {
        res.status(500).send('Error al guardar el usuario');
      });
  });
  