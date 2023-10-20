import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ListaVocalesComite from './listaVocalesComite';

const AsociacionComitElec = () => {
  const [elecciones, setElecciones] = useState([]);
  const [codComite, setCodComite] = useState(null);

  useEffect(() => {
    // Realiza una solicitud GET al servidor para obtener la lista de elecciones
    axios.get('http://localhost:8000/elecciones2')
      .then((response) => {
        setElecciones(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de elecciones:', error);
      });
  }, []);

  const handleAsociarClick = (COD_ELECCION, COD_COMITE) => {
    // Realizar una solicitud PUT para asociar el comité a la elección
    axios.put(`http://localhost:8000/asignar-comite2/${COD_ELECCION}`)
      .then((responseComite) => {
        console.log('Asignación de comité exitosa:', responseComite.data);

        // Luego, realizar una solicitud POST para asignar vocales al comité
        axios.post(`http://localhost:8000/asignar-vocales2/${COD_COMITE}`)
          .then((responseVocales) => {
            console.log('Asignación de vocales exitosa:', responseVocales.data);
          })
          .catch((errorVocales) => {
            console.error('Error en la asignación de vocales:', errorVocales);
          });
      })
      .catch((errorComite) => {
        console.error('Error en la asignación de comité:', errorComite);
      });
  };

  const handleVerListaClick = (eleccionId) => {
    // Aquí puedes realizar una acción para ver la lista de titulares y suplentes
    // Puedes abrir un modal o redirigir a una página para ver la lista
    setCodComite(eleccionId);
  };

  return (
    <div>
      <h2>Lista de Elecciones</h2>
      <ul>
        {elecciones.map((eleccion) => (
          <li key={eleccion.COD_ELECCION}>
            {eleccion.MOTIVO_ELECCION}
            <button onClick={() => handleAsociarClick(eleccion.COD_ELECCION, eleccion.COD_COMITE)}>Asociar Comité y Vocales</button>
            <button onClick={() => handleVerListaClick(eleccion.COD_COMITE)}>Ver Lista</button>
          </li>
        ))}
      </ul>
      {codComite !== null && <ListaVocalesComite idComite={codComite} />}
    </div>
  );
};

export default AsociacionComitElec;
