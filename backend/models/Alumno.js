const pool = require('../config/db');

const createAlumno = async (alumno) => {
    const { matricula, password, nombre, apellidoPaterno, apellidoMaterno, unidad, licenciatura, correoInstitucional, observaciones } = alumno;
    const id = `${matricula}253`;
    let division;

    if ([132, 131, 141, 144].includes(licenciatura)) {
        division = 'CNI';
    } else if ([130, 137, 138].includes(licenciatura)) {
        division = 'CCD';
    } else {
        division = 'CSH';
    }

    const query = `
    INSERT INTO Alumno (ID, Matricula, Password, Nombre, ApellidoPaterno, ApellidoMaterno, Unidad, División, Licenciatura, Estado, Sancion, CorreoInstitucional, Observaciones)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *;
  `;

    const values = [id, matricula, password, nombre, apellidoPaterno, apellidoMaterno, unidad, division, licenciatura, 1, 0, correoInstitucional, observaciones];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createAlumno,
};