import { Link } from 'react-router-dom';
import LogoutLink from './Logout';

function Navbar() {


  return (
    <nav className="bg-blue-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="font-bold text-xl">PGE</div>
      <div className="space-x-4">
      <Link to="/perfil" className="hover:underline">Perfil</Link>
        <Link to="/processos" className="hover:underline">Processos</Link>
        <Link to="/" onClick={LogoutLink} className="hover:underline">Sair</Link>
      </div>
    </nav>
  );

}

export default Navbar;