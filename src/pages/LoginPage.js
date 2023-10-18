import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/normalize.css';
import '../css/estilos.css';

const LoginPage = () => {
  const [showErrorNombre, setShowErrorName] = useState(false);
  const [showValorInput, setValorInput] = useState({ name: '', password: '' });
  const [showContraseña, setContraseña] = useState(false);
  const navigate = useNavigate();

  const LoginClick = (e) => {
    e.preventDefault();

    if (showValorInput.name.length === 0) {
      setShowErrorName(true);
      return; // No necesitas la variable errorNombre
    } else {
      setShowErrorName(false);
    }

    if (showValorInput.password.length === 0) {
      setContraseña(true);
      return; // No necesitas la variable errorContraseña
    } else {
      setContraseña(false);
    }

    // Hacer la solicitud al servidor
    axios
      .get(`http://localhost:8000/verificarAdministrador/${showValorInput.name}`)
      .then((response) => {

        
        console.log(response.data);
        if (response.data ) {

            
          const administrador = response.data;
   

          if (showValorInput.password === administrador.CONTRASENAADMINISTRADOR){
            alert('administrador correcto');
            navigate(`/home/${showValorInput.name}`);
          } else {
            alert('contraseña incorrecta');
          }
        } else {
          alert('No existe administrador');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const CapturaContenido = (e) => {
    const { name, value } = e.target;
    setValorInput({
      ...showValorInput,
      [name]: value,
    });
  };

  return (
    <div className="body2">
      <div className="contenedor-formulario contenedor2">
        <div className="imagen-formulario2"></div>

        <form className="formulario">
          <div className="texto-formulario">
            <h2>Bienvenido al Sistema de Elecciones UMSS</h2>
          </div>
          <div className="input">
            <label htmlFor="usuario">Usuario</label>
            <input
              placeholder="Ingresa tu nombre"
              type="text"
              id="usuario"
              name="name"
              onChange={CapturaContenido}
            />

            {showErrorNombre && <h4>Por favor ingrese un nombre</h4>}
          </div>
          <div className="input">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              placeholder="Ingresa tu contraseña"
              type="password"
              name="password"
              id="contraseña"
              onChange={CapturaContenido}
            />

            {showContraseña && <h4>Por favor ingrese una contraseña</h4>}
          </div>

          <br />
          <div className="input" onClick={LoginClick}>
            <input type="submit" value="Ingresar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
