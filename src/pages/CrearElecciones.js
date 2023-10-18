import React, { useState } from "react";
import "../css/MenuVertical.css";
import Modal from "./Modal";
import axios from "axios";

const CrearElecciones = () => {
  const initialState = {
    nuevoTipoEleccion: "",
    motivo: "",
    motivoPersonalizado: "",
    fechaInicio: "",
    fechaFin: "",
    fechaElecciones: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const url = "http://127.0.0.1:8000/";

  const [motivoEleccion, setMotivoEleccion] = useState(''); // Estado para la selección de motivo de elección
  const [tipoEleccion, setTipoEleccion] = useState('');  

  const handleNuevoTipoEleccionChange = (e) => {
    const nuevoTipoEleccion = e.target.value;
    let motivo = "";
    let motivoPersonalizado = "";

    if (nuevoTipoEleccion === "No") {
      // Si elige "No", limpiamos los valores de motivo y motivoPersonalizado
      motivo = "";
      motivoPersonalizado = "";
    }

    setFormData({
      ...formData,
      nuevoTipoEleccion,
      motivo,
      motivoPersonalizado,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardarClick = () => {
    if (
      !formData.motivo ||
      !formData.fechaInicio ||
      !formData.fechaFin ||
      !formData.fechaElecciones
    ) {
      setModalMessage("Tiene que llenar todos los campos.");
      setShowModal(true);
      return;
    }

    const startDate = new Date(formData.fechaInicio);
    const endDate = new Date(formData.fechaFin);
    const electionsDate = new Date(formData.fechaElecciones);

    if (endDate <= startDate || electionsDate <= endDate) {
      setModalMessage("Ingrese un valor correcto para las fechas.");
      setShowModal(true);
      return;
    }
    var codigo = generarCodigo();
    const proceso = {
      CODPROCESOELECTORAL: codigo,

      CARGO: motivoEleccion,
      FECHAINICIOCONVOCATORIA: formData.fechaInicio,
      FECHAFINCONVOCATORIA: formData.fechaFin,
      FECHAELECCIONES: formData.fechaElecciones,
      TIPOELECCIONES: tipoEleccion,
      CONVOCATORIA: "",
    };

    function generarCodigo() {
      var codigo;
      var fechaActual = new Date();

      // Obtener los componentes de la fecha
      var dia = fechaActual.getDate();
      var mes = fechaActual.getMonth() + 1; // ¡Recuerda que los meses comienzan desde 0!
      var año = fechaActual.getFullYear();

      codigo = año + mes + dia + formData.motivo.substring(0, 3);
      return codigo;
    }
    axios.post(url + "crearProcesoElectoral", proceso).then((response) => {
      setModalMessage(
        `El proceso electoral se inició de forma correcta para elegir a: ${formData.motivo}`
      );
      setShowModal(true);
      setFormData(initialState);
    });

    // Reiniciar el formulario
  };




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

  // Manejar cambios en el primer select (motivo de elección)
  const handleMotivoEleccionChange = (event) => {
    const selectedMotivo = event.target.value;
    setMotivoEleccion(selectedMotivo);

    // Restablecer la selección del segundo select
    setTipoEleccion('');
  };

  return (
    <div className="crear-elecciones">
      <h3>Nuevo proceso electoral</h3>
      <div className="form-group">
        <label>¿Quiere iniciar un nuevo tipo de elección?</label>
        <select
          name="nuevoTipoEleccion"
          value={formData.nuevoTipoEleccion}
          onChange={handleNuevoTipoEleccionChange}
        >
          <option value="">Seleccione una opción</option>
          <option value="Si">Sí</option>
          <option value="No">No</option>
        </select>
      </div>
      {formData.nuevoTipoEleccion === "Si" && (
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
      </div>
      )}
      {formData.nuevoTipoEleccion === "No" && (
        <div className="form-group">
          <label>Motivo:</label>
          <select
            name="motivo"
            value={formData.motivo}
            onChange={handleInputChange}
            className="motivo-input"
          >
            <option value="">Seleccione una opción</option>
            <option value="Rector">Rector, Vicerrector</option>
            <option value="Decano">Decano, Director Académico</option>
            <option value="Director de carrera">Director de carrera</option>
            <option value="Consejo de Facultad">Consejeros de Facultad</option>
            <option value="Consejo de carrera">Consejeros de carrera</option>
            <option value="Congreso nacional">
              Congreso nacional de universidades (Delegados docentes y
              estudiantes)
            </option>
            <option value="Conferencias d facultad">
              Conferencias de facultad (Delegados docentes y estudiantes)
            </option>
            <option value="Consejo universitario">
              Honorable consejo universitario (Delegados docentes y estudiantes)
            </option>
            <option value="Congreso universitario">
              Congreso universitario (Delegados docentes y estudiantes)
            </option>
          </select>
        </div>
      )}
      <div className="form-group">
        <label>Fecha inicio de convocatoria:</label>
        <input
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          min={new Date().toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Fecha fin de convocatoria:</label>
        <input
          type="date"
          name="fechaFin"
          value={formData.fechaFin}
          min={formData.fechaInicio}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Fecha de las elecciones:</label>
        <input
          type="date"
          name="fechaElecciones"
          value={formData.fechaElecciones}
          min={formData.fechaFin}
          onChange={handleInputChange}
        />
      </div>
      <button className="volver-button">Volver</button>
      <button className="guardar-button" onClick={handleGuardarClick}>
        Guardar
      </button>
      {showModal && (
        <Modal mensaje={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CrearElecciones;
