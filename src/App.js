
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/IndexPage';
import MenuVertical from './pages/MenuVertical';
import AsignacionComite from './pages/AsignacionComite'
import ListaVocalesComite from './pages/ListaVocalesComite';
import EleccionesComponent from './pages/EleccionesComponent';
import ActualizarEleccion from './pages/ActualizarElecciones';
import PdfConvocatoria from './pages/pdfConvocatoria';

import AsociacionComitElec from './pages/pruevas/AsociacionComitElec ';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/home" element={<MenuVertical/>}></Route>
        <Route path="/home/:username" element={<MenuVertical/>}></Route>
        <Route path='/comiteElectoral' element={<AsignacionComite/>}/>
        <Route path="/ListaVocalesComite/:id" element={<ListaVocalesComite/>} />
        <Route path='/EleccionesComponent' element={<EleccionesComponent/>}/>
     
        <Route path="/actualizarEleccion/:id" element={<ActualizarEleccion />} />

        <Route path='/PdfConvocatoria/:id' element={<PdfConvocatoria/>}/>

        <Route
          exact path="/admin/AsociacionComitElec"
          element={<AsociacionComitElec />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
