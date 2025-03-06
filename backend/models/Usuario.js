const pool = require('../config/db');

const Usuario = {
  async findById(ID) {
    try {
      // Buscar en la tabla ALUMNO
      const alumnoQuery = 'SELECT * FROM ALUMNO WHERE "Matricula" = $1';
      const alumnoValues = [ID];
      const alumnoResult = await pool.query(alumnoQuery, alumnoValues);

      if (alumnoResult.rows.length > 0) {
        return { ...alumnoResult.rows[0], tipo: 'alumno' };
      }

      // Buscar en la tabla EMPLEADO
      const empleadoQuery = 'SELECT * FROM EMPLEADO WHERE "NoEconomico" = $1';
      const empleadoValues = [ID];
      const empleadoResult = await pool.query(empleadoQuery, empleadoValues);

      if (empleadoResult.rows.length > 0) {
        return { ...empleadoResult.rows[0], tipo: 'empleado' };
      }
      //En caso de que el usuario no exista
      return null;
    } catch (error) {
      console.error('Error al encontrar el usuario:', error);
      throw error;
    }
  },
};

module.exports = Usuario;