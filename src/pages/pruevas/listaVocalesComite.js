import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaVocalesComite({ idComite }) {
  const [titulares, setTitulares] = useState([]);
  const [suplentes, setSuplentes] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET para obtener los datos de titulares y suplentes
    axios.get(`http://localhost:8000/ver-lista-comite2/${idComite}`)
      .then((response) => {
        const data = response.data;
        setTitulares(data.titulares);
        setSuplentes(data.suplentes);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de comité:', error);
      });
  }, [idComite]);

  return (
    <div>
      <h2>Lista de Titulares y Suplentes</h2>
      <div>
        <h3>Titulares:</h3>
        <ul>
          {titulares.map((titular) => (
            <li key={titular.CI}>
              <div className="vocal-item">
                <span className="vocal-name">{`${titular.NOMBRES} ${titular.APELLIDOS}`}</span>
                <span className="vocal-ci">CI: {titular.CI}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Suplentes:</h3>
        <ul>
          {suplentes.map((suplente) => (
            <li key={suplente.CI}>
              <div className="vocal-item">
                <span className="vocal-name">{`${suplente.NOMBRES} ${suplente.APELLIDOS}`}</span>
                <span className="vocal-ci">CI: {suplente.CI}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListaVocalesComite;
