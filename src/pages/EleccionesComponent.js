import React, { useState } from 'react';
import axios from 'axios';

const EleccionesComponent = () => {
  const [motivoEleccion, setMotivoEleccion] = useState('');
  const [tipoEleccion, setTipoEleccion] = useState('');
  const [comite, setComite] = useState('');
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

  // Opciones disponibles para el segundo select (tipo de elección)
  const tipoEleccionOptions = {
    'Elecciones Estudiantiles': [
      'Elección de representantes estudiantiles',
      'Elección de delegados estudiantiles para consejos o comités',
      'Elección de líderes estudiantiles, como presidentes de centros de estudiantes',
    ],
    'Elecciones Docentes': [
      'Elección de representantes de profesores para órganos de gobierno universitario',
      'Elección de jefes de departamento o decanos de facultades',
    ],
    'Elecciones de Autoridades Universitarias': [
      'Elección de rector o vicerrectores',
      'Elección de decanos de facultades',
      'Elección de directores de institutos o escuelas superiores',
    ],
    'Referendos Universitarios': [
      'Consultas a la comunidad universitaria sobre temas importantes, como cambios en la estructura o políticas de la universidad',
    ],
    'Elecciones de Comités y Jurados': [
      'Elecciones para comités y jurados que supervisan procesos académicos y administrativos',
    ],
    'Elecciones de Representantes en Órganos de Gobierno': [
      'Elección de representantes en consejos universitarios, asambleas o juntas directivas',
    ],
    'Elecciones para Comités de Ética': [
      'Elección de miembros de comités de ética que supervisan la investigación y los aspectos éticos de la universidad',
    ],
    'Elecciones de Representantes en Sindicatos o Asociaciones de Personal': [
      'Elección de representantes para sindicatos o asociaciones de empleados no docentes',
    ],
    'Elecciones para Cargos Honoríficos o Honorarios': [
      'Elección de personas que desempeñan cargos honoríficos en la universidad, como oradores en eventos académicos',
    ],
  };


  const handleGuardarClick = () => {
    if (
      motivoEleccion &&
      tipoEleccion &&
      comite &&
      fechaIniConvocatoria &&
      fechaFinConvocatoria &&
      fechaEleccion
    ) {
      const nuevoProceso = {
        COD_ADMIN: '', // Completa con el valor correspondiente
        COD_FRENTE: '', // Completa con el valor correspondiente
        COD_TEU: '', // Completa con el valor correspondiente
        MOTIVO_ELECCION: tipoEleccion,
        COD_COMITE: comite,
        FECHA_ELECCION: fechaEleccion,
        ELECCION_ACTIVA: true, // Establece como activa
        FECHA_INI_CONVOCATORIA: fechaIniConvocatoria, // Nuevo campo
        FECHA_FIN_CONVOCATORIA: fechaFinConvocatoria, // Nuevo campo
      };

      // Realiza una solicitud POST para guardar el proceso electoral en el servidor
      axios
        .post('http://localhost:8000/elecciones_data', nuevoProceso)
        .then((response) => {
          console.log('Proceso electoral guardado exitosamente:', response.data.message);
          setMotivoEleccion('');
          setTipoEleccion('');
          setComite('');
          setFechaIniConvocatoria('');
          setFechaFinConvocatoria('');
          setFechaEleccion('');
        })
        .catch((error) => {
          console.error('Error al guardar el proceso electoral:', error);
        });
    } else {
      console.log('Completa todos los campos antes de guardar.');
    }
  };
  // Manejar cambios en los campos de fecha
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


  const comiteOptions = ['100', '200', '300'];

  // Manejar cambios en el primer select (motivo de elección)
  const handleMotivoEleccionChange = (event) => {
    const selectedMotivo = event.target.value;
    setMotivoEleccion(selectedMotivo);

    // Restablecer las selecciones de los selects siguientes
    setTipoEleccion('');
    setComite('');
  };

  return (
    <div>
      <h2>Selección de Elecciones</h2>
      <div>
      <h2>Selección de Elecciones</h2>
      <div>
        <label>Motivo de Elección:</label>
        <select value={motivoEleccion} onChange={handleMotivoEleccionChange}>
          <option value="">Selecciona un motivo</option>
          {motivoEleccionOptions.map((motivo) => (
            <option key={motivo} value={motivo}>
              {motivo}
            </option>
          ))}
        </select>
      </div>
      {motivoEleccion && (
        <div>
          <label>Tipo de Elección:</label>
          <select value={tipoEleccion} onChange={(e) => setTipoEleccion(e.target.value)}>
            <option value="">Selecciona un tipo</option>
            {tipoEleccionOptions[motivoEleccion].map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
      )}
      {tipoEleccion && (
        <div>
          <label>Comité:</label>
          <select value={comite} onChange={(e) => setComite(e.target.value)}>
            <option value="">Selecciona un comité</option>
            {comiteOptions.map((comiteValue) => (
              <option key={comiteValue} value={comiteValue}>
                {comiteValue}
              </option>
            ))}
          </select>
        </div>
      )}
      </div>
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
      <div>
        {/* Botón para guardar los datos */}
        <button onClick={handleGuardarClick}>Guardar</button>
      </div>
    </div>
  );
};

export default EleccionesComponent;



