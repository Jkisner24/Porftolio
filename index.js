const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/user')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;


app.listen(port, () => {
    console.log(`Servidor en ejecución http://localhost:${port}`);
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


const corsOptions = {
  origin: "https://porftolio-eight.vercel.app",
};
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/', (req, res) => {
  console.log("asdasd")
    const { user, lastName, email, message } = req.body;
    const newUser = new User({ user, lastName, email, message });
  
    newUser.save()
      .then(() => {
        res.send('Usuario guardado correctamente');
      })
      .catch(error => {
        res.status(500).send('Error al guardar el usuario');
      });
  });
  