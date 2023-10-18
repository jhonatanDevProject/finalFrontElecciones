
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/IndexPage';
import MenuVertical from './pages/MenuVertical';
import AsignacionComite from './pages/AsignacionComite'
import ListaVocalesComite from './pages/ListaVocalesComite';
import EleccionesComponent from './pages/EleccionesComponent';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/home" element={<MenuVertical/>}></Route>
        <Route path='/comiteElectoral' element={<AsignacionComite/>}/>
        <Route path="/ListaVocalesComite/:id" component={ListaVocalesComite} />
        <Route path='/EleccionesComponent' element={<EleccionesComponent/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
