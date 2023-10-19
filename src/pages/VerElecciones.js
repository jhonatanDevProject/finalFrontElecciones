import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const IndexElecciones = () => {
  const navigate = useNavigate();
  const [elecciones, setElecciones] = useState([]);

  useEffect(() => {
    fetchElecciones();
  }, []);

  const fetchElecciones = async () => {
    try {
      const response = await axios.get('http://localhost:8000/elecciones_index'); // Reemplaza con la URL correcta
      const data = response.data;

      if (Array.isArray(data.data)) { // Asegúrate de usar la clave correcta para los datos
        setElecciones(data.data);
      } else {
        console.error('La respuesta no contiene un arreglo de elecciones válido');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDetallesClick = (id) => {
    // Redireccionar o realizar alguna acción al hacer clic en "Detalles de la elección"
    // Puedes usar react-router-dom o alguna otra biblioteca de enrutamiento si es necesario
    navigate(`/actualizarEleccion/${id}`);
  };

  const handleConvocatoriaClick = (id) => {
    // Redireccionar o realizar alguna acción al hacer clic en "Convocatoria"
    // Puedes usar react-router-dom o alguna otra biblioteca de enrutamiento si es necesario
    navigate(`/PdfConvocatoria/${id}`);
  };

  return (
    <div>
      <h2>Lista de Elecciones</h2>
      <table>
        <thead>
          <tr>
            <th>Motivo de Elección</th>
            <th>Fecha de Elección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {elecciones.map((eleccion) => (
            <tr key={eleccion.COD_ELECCION}>
              <td>{eleccion.MOTIVO_ELECCION}</td>
              <td>{eleccion.FECHA_ELECCION}</td>
              <td>
                <button onClick={() => handleDetallesClick(eleccion.COD_ELECCION)}>
                  Detalles de la Elección
                </button>
                <button onClick={() => handleConvocatoriaClick(eleccion.COD_ELECCION)}>
                  Convocatoria
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexElecciones;
