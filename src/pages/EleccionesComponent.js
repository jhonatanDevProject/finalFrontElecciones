import React, { useState } from 'react';
import axios from 'axios';

const EleccionesComponent = () => {
  const [motivoEleccion, setMotivoEleccion] = useState('');
  const [codComite, setCodComite] = useState('');
  const [fechaIniConvocatoria, setFechaIniConvocatoria] = useState('');
  const [fechaFinConvocatoria, setFechaFinConvocatoria] = useState('');
  const [fechaEleccion, setFechaEleccion] = useState('');

  const motivoEleccionOptions = [
    'Elecciones Estudiantiles',
    'Elecciones Docentes',
    'Elecciones de Autoridades Universitarias',
    'Referendos Universitarios',
    'Elecciones de Comités y Jurados',
    'Elecciones de Representantes en Órganos de Gobierno',
    'Elecciones para Comités de Ética',
    'Elecciones de Representantes en Sindicatos o Asociaciones de Personal',
    'Elecciones para Cargos Honoríficos o Honorarios',
  ];

  const handleGuardarClick = () => {
    if (
      motivoEleccion &&
      fechaIniConvocatoria &&
      fechaFinConvocatoria &&
      fechaEleccion &&
      codComite
    ) {
      const nuevaEleccion = {
        COD_ADMIN: '', // Reemplaza con el código de administrador adecuado
        COD_FRENTE: 0, // Reemplaza con el código de frente adecuado
        COD_TEU: 0, // Reemplaza con el código de TEU adecuado
        COD_COMITE: codComite,
        MOTIVO_ELECCION: motivoEleccion,
        FECHA_ELECCION: fechaEleccion,
        ELECCION_ACTIVA: true,
        FECHA_INI_CONVOCATORIA: fechaIniConvocatoria,
        FECHA_FIN_CONVOCATORIA: fechaFinConvocatoria,
      };

      const comiteOptions = ['100', '200', '300'];

      // Realiza una solicitud POST para guardar la elección en el servidor
      axios
        .post('http://localhost:8000/elecciones_data', nuevaEleccion)
        .then((response) => {
          console.log('Elección guardada exitosamente:', response.data.message);
          // Restablecer los campos después de guardar
          setMotivoEleccion('');
          setCodComite('');
          setFechaIniConvocatoria('');
          setFechaFinConvocatoria('');
          setFechaEleccion('');
        })
        .catch((error) => {
          console.error('Error al guardar la elección:', error);
        });
    } else {
      console.log('Completa todos los campos antes de guardar.');
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'fechaInicio') {
      setFechaIniConvocatoria(value);
    } else if (name === 'fechaFin') {
      setFechaFinConvocatoria(value);
    } else if (name === 'fechaElecciones') {
      setFechaEleccion(value);
    }
  };

  return (
    <div>
      <h2>Selección de Elecciones</h2>
      <div>
        <label>Motivo de Elección:</label>
        <select
          value={motivoEleccion}
          onChange={(e) => setMotivoEleccion(e.target.value)}
        >
          <option value="">Selecciona un motivo</option>
          {motivoEleccionOptions.map((motivo) => (
            <option key={motivo} value={motivo}>
              {motivo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Código del Comité:</label>
        <input
          type="text"
          name="codComite"
          value={codComite}
          onChange={(e) => setCodComite(e.target.value)}
        />
      </div>
      {motivoEleccion && (
        <div>
          {/* Campos de fecha */}
          <div className="form-group">
            <label>Fecha inicio de convocatoria:</label>
            <input
              type="date"
              name="fechaInicio"
              value={fechaIniConvocatoria}
              min={new Date().toISOString().split('T')[0]}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Fecha fin de convocatoria:</label>
            <input
              type="date"
              name="fechaFin"
              value={fechaFinConvocatoria}
              min={fechaIniConvocatoria}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Fecha de las elecciones:</label>
            <input
              type="date"
              name="fechaElecciones"
              value={fechaEleccion}
              min={fechaFinConvocatoria}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
      <div>
        {/* Botón para guardar los datos */}
        <button onClick={handleGuardarClick}>Guardar</button>
      </div>
    </div>
  );
};

export default EleccionesComponent;
