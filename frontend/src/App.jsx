import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Processos from './pages/Processos';
import Perfil from './pages/Perfil';
import CadastrarProcessos from './pages/CadastrarProcessos';
import PrivateRoute from './routes/PrivateRoutes';

function App() {
  
  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/processos" element={
        <PrivateRoute>
          <Processos />
        </PrivateRoute>
      } />
      <Route path="/cadastrar-processos" element={
        <PrivateRoute tipoUsuario="procurador">
          <CadastrarProcessos />
        </PrivateRoute>
      } />
      <Route path="/perfil" element={
        <PrivateRoute>
          <Perfil />
        </PrivateRoute>
      } />
    </Routes>

  );
}

export default App;
