const alumnoModel = require('../models/Alumno');

const registrarAlumno = async (req, res) => {
  try {
    const nuevoAlumno = await alumnoModel.createAlumno(req.body);
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registrarAlumno,
};