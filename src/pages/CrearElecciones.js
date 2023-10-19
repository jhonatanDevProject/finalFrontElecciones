import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";

const CrearElecciones = () => {
  const initialState = {
    motivoEleccion: "",
    fechaInicio: "",
    fechaFin: "",
    fechaElecciones: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const url = "http://localhost:8000/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardarClick = () => {
    if (!formData.motivoEleccion || !formData.fechaInicio || !formData.fechaFin || !formData.fechaElecciones) {
      setModalMessage("Por favor, complete todos los campos.");
      setShowModal(true);
      return;
    }

    if (new Date(formData.fechaFin) <= new Date(formData.fechaInicio) || new Date(formData.fechaElecciones) <= new Date(formData.fechaFin)) {
      setModalMessage("Las fechas no son válidas. Asegúrese de que la fecha de inicio sea anterior a la fecha de fin y la fecha de elecciones sea posterior a la fecha de fin.");
      setShowModal(true);
      return;
    }

    const nuevoProceso = {
      COD_ADMIN: "", // Reemplaza con el código de administrador adecuado
      COD_FRENTE: 0, // Reemplaza con el código de frente adecuado
      COD_TEU: 0, // Reemplaza con el código de TEU adecuado
      COD_COMITE: 0, // Reemplaza con el código de comité adecuado
      MOTIVO_ELECCION: formData.motivoEleccion,
      FECHA_ELECCION: formData.fechaElecciones,
      ELECCION_ACTIVA: true,
      FECHA_INI_CONVOCATORIA: formData.fechaInicio,
      FECHA_FIN_CONVOCATORIA: formData.fechaFin,
    };

    axios.post(url + "elecciones_data", nuevoProceso)
      .then((response) => {
        setModalMessage(`El proceso electoral se ha creado con éxito para el motivo: ${formData.motivoEleccion}`);
        setShowModal(true);
        setFormData(initialState);
      })
      .catch((error) => {
        console.error("Error al crear el proceso electoral:", error);
      });
  };

  return (
    <div className="crear-elecciones">
      <h3>Nuevo proceso electoral</h3>
      <div className="form-group">
        <label>Motivo de Elección:</label>
        <input
          type="text"
          name="motivoEleccion"
          value={formData.motivoEleccion}
          onChange={handleInputChange}
        />
      </div>
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
      <button className="volver-button" >Volver</button>
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
