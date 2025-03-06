const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (tipoRequerido) => (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.tipo !== tipoRequerido) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
    }

    req.user = decoded; //agrega la información del usuario al request
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;