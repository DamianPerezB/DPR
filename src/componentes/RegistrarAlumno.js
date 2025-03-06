import { Header, Titulo, ContenedorHeader, Subtitulo } from '../elementos/Header';
import Boton from '../elementos/Boton';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TitutuloSecciones, FormularioRegistroSecciones, Select, Input2, ContenedorBoton, FormularioRegistro } from '../elementos/ElementosDeFormulario';
import imagen1 from '../imagenes/motasPantera4.png';
import BotonAtras from '../elementos/BotonAtras';

const ImagenMotas = styled.img`
  position: absolute; /* Coloca el contenedor en la posición absoluta */
  top: 12%; /* Alínea la imagen al borde superior */
  left: 76%; /* Alínea la imagen al borde izquierdo */
  width: 75% 5%; /* Ocupa todo el ancho de la pantalla */
  height: 120%; /* Ocupa todo el alto de la pantalla */
  z-index: -1; /* Envía la imagen detrás del formulario */
  @media (max-width: 768px) {
    margin-left: 0; /* Elimina el margen izquierdo en pantallas pequeñas */
    width: 24%; /* Ocupa todo el ancho del contenedor en pantallas pequeñas */
    height: 80%;
    left: 76%; /* Alínea la imagen al borde izquierdo */
  }
`;

const RegistrarAlumno = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Recoge los valores del formulario
    const alumnoData = {
      matricula: e.target.matricula.value,
      password: e.target.password.value,
      nombre: e.target.nombre.value,
      apellidoPaterno: e.target.apellidoPaterno.value,
      apellidoMaterno: e.target.apellidoMaterno.value,
      unidad: e.target.unidad.value,
      licenciatura: e.target.licenciatura.value,
      correoInstitucional: e.target.correoInstitucional.value,
      observaciones: e.target.observaciones.value,
    };

    try {
      const response = await fetch('http://localhost:5000/api/alumnos/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alumnoData),
      });

      if (response.ok) {
        navigate('/inicio-empleado');
      } else {
        console.error('Error al registrar el alumno');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Registrar Alumno</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Registro de Alumno</Titulo>
        </ContenedorHeader>
      </Header>

      <BotonAtras ruta="/registro-usuarios" />

      <ImagenMotas src={imagen1} alt="MotasUam" />

      <FormularioRegistro onSubmit={handleSubmit}>
        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos de Contacto</TitutuloSecciones>
          Nombre(s)
          <Input2 type="text" name="nombre" placeholder="Nombre(s): Ej: Jose" required />
          Apellido Paterno
          <Input2 type="text" name="apellidoPaterno" placeholder="Apellido Paterno: Ej: Ruiz" required />
          Apellido Materno
          <Input2 type="text" name="apellidoMaterno" placeholder="Apellido Materno: Ej: Ruiz" required />
        </FormularioRegistroSecciones>

        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos de la Cuenta</TitutuloSecciones>
          Contraseña
          <Input2 type="password" name="password" placeholder="Contraseña" required />
          Repite contraseña
          <Input2 type="password" name="repeatPassword" placeholder="Repetir Contraseña" required />
        </FormularioRegistroSecciones>

        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos del Alumno</TitutuloSecciones>
          Matricula Alumno
          <Input2 type="text" name="matricula" placeholder="Matrícula: Ej: 2209999999" required />
          Unidad
          <Select name="unidad" required>
            <option value="">Seleccione Unidad</option>
            <option value="1">Azcapotzalco</option>
            <option value="2">Iztapalapa</option>
            <option value="3">Xochimilco</option>
            <option value="4">Cuajimalpa</option>
            <option value="5">Lerma</option>
          </Select>
          Licenciatura
          <Select name="licenciatura" required>
            <option value="">Seleccione Licenciatura</option>
            <option value="131">Ingeniería en Computación</option>
            <option value="141">Ingeniería Biológica</option>
            <option value="144">Biológia Molecular</option>
            <option value="132">Matematicas Aplicadas</option>
            <option value="130">Diseño</option>
            <option value="137">Tecnologías y Sistemas de Información</option>
            <option value="138">Ciencias de la Comunicación</option>
            <option value="128">Administración</option>
            <option value="129">Derecho</option>
            <option value="135">Estudios Socioterritoriales</option>
            <option value="136">Humanidades</option>
          </Select>
          Estado
          <Select name="estado_alumno" required>
            <option value="">Seleccione Estado</option>
            <option value="1">Inscrito</option>
            <option value="2">No inscrito</option>
          </Select>
          Observaciones
          <Input2 type="text" name="observaciones" placeholder="Es oyente" />
          Correo Institucional
          <Input2 type="email" name="correoInstitucional" placeholder="Correo Electrónico Institucional: Ej: jose.ruiz@cua.uam.mx" required />
        </FormularioRegistroSecciones>

        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Registrar Alumno
          </Boton>
        </ContenedorBoton>
      </FormularioRegistro>
    </>
  );
};

export default RegistrarAlumno;