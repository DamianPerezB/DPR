const express = require('express');
const alumnoController = require('../controllers/AlumnoControlador');

const router = express.Router();

router.post('/registrar', alumnoController.registrarAlumno);

module.exports = router;