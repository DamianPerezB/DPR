const bcrypt = require('bcryptjs'); //Encriptacion de contraseña
const jwt = require('jsonwebtoken');  //Genera y verifica tokens
const User = require('../models/Usuario');
require('dotenv').config(); //encargado de las variables de entorno del .env

const Autenticacion = {
  async login(req, res) {
    const { id, password } = req.body;

    try {
      //Buscar al usuario por su ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }

      //Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      //Generar un token JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};

module.exports = Autenticacion;