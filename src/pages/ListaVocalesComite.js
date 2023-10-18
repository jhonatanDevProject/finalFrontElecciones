import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaVocalesComite = ({ idComite }) => {
  const [titulares, setTitulares] = useState([]);
  const [suplentes, setSuplentes] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET para obtener la lista de titulares y suplentes del comité
    axios.get(`http://localhost:8000/ver-lista-comite/${idComite}`)
      .then((response) => {
        setTitulares(response.data.titulares);
        setSuplentes(response.data.suplentes);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de titulares y suplentes del comité:', error);
      });
  }, [idComite]);

  return (
    <div>
      <h3>Titulares</h3>
      <ul>
        {titulares.map((titular) => (
          <li key={titular.CARNETIDENTIDAD}>
            <strong>Nombre:</strong> {titular.NOMBRE} {titular.APELLIDO},{' '}
            <strong>Condición:</strong> {titular.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'}
          </li>
        ))}
      </ul>

      <h3>Suplentes</h3>
      <ul>
        {suplentes.map((suplente) => (
          <li key={suplente.CARNETIDENTIDAD}>
            <strong>Nombre:</strong> {suplente.NOMBRE} {suplente.APELLIDO},{' '}
            <strong>Condición:</strong> {suplente.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaVocalesComite;
